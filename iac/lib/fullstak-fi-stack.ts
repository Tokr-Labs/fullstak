import * as cdk from "@aws-cdk/core";
import * as s3 from "@aws-cdk/aws-s3";
import * as route53 from "@aws-cdk/aws-route53";
import * as acm from "@aws-cdk/aws-certificatemanager";
import * as cloudfront from "@aws-cdk/aws-cloudfront";
import * as targets from "@aws-cdk/aws-route53-targets";
import * as deploy from "@aws-cdk/aws-s3-deployment";

export class FullstakFiStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Get the hosted zone.
    const hostedZone = route53.HostedZone.fromHostedZoneAttributes(
      this,
      "FullstakFiZone",
      {
        hostedZoneId: cdk.Fn.importValue("FullstakFiHostedZoneId"),
        zoneName: cdk.Fn.importValue("FullstakFiHostedZoneName"),
      }
    );

    // Create the bucket. Note the error document is the same as index.html, per this answer: https://stackoverflow.com/a/68056938/5116404
    const siteBucket = new s3.Bucket(this, "FullstakFiBucket", {
      bucketName: "fullstak-fi-bucket-" + this.account + "-" + this.region,
      websiteIndexDocument: "index.html",
      websiteErrorDocument: "index.html",
      blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
    });

    // Allow cloudfront to access the bucket
    const originAccessIdentity = new cloudfront.OriginAccessIdentity(
      this,
      "OAI",
      {
        comment: "created_for_fullstak_fi_bucket",
      }
    );
    siteBucket.grantRead(originAccessIdentity);

    // Create the ssl cert to be used with cloudfront and the hosted zone. Note this MUST be created in us-east-1
    const siteCertificate = new acm.DnsValidatedCertificate(
      this,
      "FullstakFiSiteCertificate",
      {
        hostedZone,
        domainName: hostedZone.zoneName,
        region: "us-east-1",
        validation: acm.CertificateValidation.fromDns(hostedZone),
      }
    );

    // Create the cloudfront distribution to serve contents of the bucket.
    //  In test, we have a lambda that enforces basic auth here: https://console.aws.amazon.com/lambda/home?region=us-east-1#/functions/basic-auth/versions/1?tab=configure
    // This was easy to create in the console and suprisignly difficult to create the iac for.
    const siteDistribution = new cloudfront.CloudFrontWebDistribution(
      this,
      "FullstakFiDist",
      {
        originConfigs: [
          {
            s3OriginSource: {
              s3BucketSource: siteBucket,
              originAccessIdentity: originAccessIdentity,
            },
            behaviors: [
              {
                isDefaultBehavior: true,
                forwardedValues: {
                  queryString: false,
                  headers: [
                    "X-Prerender-Token",
                    "X-Prerender-Host",
                    "X-Prerender-Cachebuster",
                  ],
                },
              },
            ],
          },
        ],
        errorConfigurations: [
          {
            errorCode: 400,
            responsePagePath: "/index.html",
            responseCode: 200,
          },
          {
            errorCode: 403,
            responsePagePath: "/index.html",
            responseCode: 200,
          },
          {
            errorCode: 404,
            responsePagePath: "/index.html",
            responseCode: 200,
          },
        ],
        aliasConfiguration: {
          acmCertRef: siteCertificate.certificateArn,
          names: [hostedZone.zoneName],
        },
      }
    );

    // Create record routing the hosted zone to the cloud front distribution
    new route53.ARecord(this, "FullstakFiStackAliasRecord", {
      zone: hostedZone,
      recordName: hostedZone.zoneName,
      target: route53.RecordTarget.fromAlias(
        new targets.CloudFrontTarget(siteDistribution)
      ),
    });

    new deploy.BucketDeployment(this, "BucketDeployment", {
      sources: [deploy.Source.asset("../build")],
      destinationBucket: siteBucket,
      distribution: siteDistribution,
      distributionPaths: ["/*"],
      memoryLimit: 2048,
    });
  }
}
