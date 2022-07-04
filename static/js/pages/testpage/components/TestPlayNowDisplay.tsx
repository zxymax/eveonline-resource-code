import React, { useContext } from 'react'
import allowedToPlay from 'features/playnow/helpers/allowed'

import { isMobile, BrowserView, MobileView } from 'react-device-detect'
import { UserContext } from 'utils/context/UserContext'

export default function TestPlayNowDisplay(): JSX.Element {
    // const [country, setCountry] = useState<string>(null)
    const { country } = useContext(UserContext)

    function renderAllowed(countryString: string): JSX.Element {
        const allowed = allowedToPlay(countryString)
        console.log('ALLOWED: ', allowed)

        return allowed ? <h2>ALLOWED</h2> : <h1>NOT ALLOWED</h1>
    }

    return (
        <>
            <h1>Device Testing</h1>
            <p> Device is : {isMobile ? 'Mobile' : 'Desktop'}</p>
            <MobileView>
                <p>This layout is rendered for mobile</p>
            </MobileView>
            <BrowserView>
                <p>This layout is rendered for desktop</p>
            </BrowserView>
            <br />
            <br />

            <h1>Country Testing</h1>
            <h2>{country}</h2>
            <br />
            <br />

            <h1>Allowed Testing</h1>
            {renderAllowed(country)}
        </>
    )
}
