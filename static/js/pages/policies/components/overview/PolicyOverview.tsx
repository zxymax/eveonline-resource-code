import React from 'react'
import _map from 'lodash/map'
import SectionType from 'models/types/ts/sectionType'

interface Props {
    policies: Array<SectionType>
}

const renderPolicyOverview = (policies: Array<SectionType>): JSX.Element => {
    const tabs = _map(policies, (item) => {
        console.log('ITEM: ', item)
        return (
            item && (
                <div key={item.name}>
                    <a
                        key={item.identifier}
                        href={`/policies/${item.identifier}`}
                    >
                        {item.headline}
                    </a>
                </div>
            )
        )
    })

    return <>{tabs}</>
}

export default function PolicyOverview({ policies }: Props): JSX.Element {
    console.log('policies page sections: ', policies)

    // Main policy overview page
    return (
        <div>
            <h1>All Policies</h1>
            {/* <h2>{metaTitle}</h2> */}
            {renderPolicyOverview(policies)}
        </div>
    )
}

