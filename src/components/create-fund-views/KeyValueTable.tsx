import {Table} from "@nextui-org/react";
import React from "react";

const KeyValueTable = (props) => {
    return (
        <>
        <Table
            shadow={false}
            aria-label={props.arialabel}
        >
            <Table.Header>
                <Table.Column>{props.keyString}</Table.Column>
                <Table.Column>{props.valueString}</Table.Column>
            </Table.Header>
            <Table.Body>
                {
                    props.data.map((row, i) => {
                        return (
                            <Table.Row key={i}>
                                <Table.Cell>{row.name}</Table.Cell>
                                <Table.Cell>{row.value}</Table.Cell>
                            </Table.Row>
                        )
                    })
                }
            </Table.Body>
        </Table>
        </>
    )
};

export default KeyValueTable;