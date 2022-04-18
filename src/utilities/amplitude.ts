import amplitude from 'amplitude-js';

declare global {
    interface Window {
        dataLayer:any;
    }
}

const isAmplitude = (process.env.REACT_APP_TRACK_METRICS === 'true');

export const initAmplitude = () => {
    // @ts-ignore
    amplitude.getInstance().init(process.env.REACT_APP_AMPLITUDE);
};

export const setAmplitudeUserDevice = installationToken => {
    amplitude.getInstance().setDeviceId(installationToken);
};

export const setAmplitudeUserId = userId => {
    amplitude.getInstance().setUserId(userId);
};

export const setAmplitudeUserProperties = properties => {
    amplitude.getInstance().setUserProperties(properties);
};

export const sendAmplitudeData = (eventType, eventProperties?) => {
    const eventExtendedProperties = {
        "page_url": window.location.pathname || '/',
        "origin": "WEB",
        ...eventProperties
    }

    const eventData = {
        "event": eventType,
        // "authenticated": false,
        ...eventExtendedProperties
    };

    if (process.env.REACT_APP_TYPE === 'dev') console.log('Is Amplitude + GTM on?', isAmplitude, 'eventExtendedProperties', eventExtendedProperties, 'eventData', eventData);

    if (isAmplitude) amplitude?.getInstance()?.logEvent(eventType, eventExtendedProperties);

    if (process.env.REACT_APP_TYPE === 'prod')  {
        if (window && window?.dataLayer && isAmplitude) window?.dataLayer?.push(eventData);
    }
};