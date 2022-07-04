import React from 'react'

interface Props {
    requiredString: string
    optionalString?: string
}

const TestDefaultProps: React.FunctionComponent<Props> = ({
    requiredString,
    optionalString = 'default optional string value',
}) => (
    <>
        <h1>Testing Props</h1>
        <p>required string: {requiredString}</p>
        <p>optional string: {optionalString}</p>
    </>
)

export default TestDefaultProps
