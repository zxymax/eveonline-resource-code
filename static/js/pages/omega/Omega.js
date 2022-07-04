import React from 'react'
import Omega from './components/omega/Omega'

const OmegaContainer = ({
    Hero,
    CTA,
    Video,
    Advantage,
    Comparison,
    MediaQuotes,
    Quotes,
    hasContent,
}) => {
    return (
        <Omega
            Hero={Hero}
            CTA={CTA}
            Video={Video}
            Advantage={Advantage}
            Comparison={Comparison}
            MediaQuotes={MediaQuotes}
            Quotes={Quotes}
            hasContent={hasContent}
        />
    )
}

export default OmegaContainer

