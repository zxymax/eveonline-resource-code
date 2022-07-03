import React from 'react'
import { useSelector } from 'react-redux'

import { isLoggedIn } from 'packages/authentication/lib/selectors'

import { Button } from 'layouts'

export default function PlayNowButton(): JSX.Element {
    const loggedIn = useSelector((state) => isLoggedIn(state))

    function renderNotLoggedIn(): JSX.Element {
        return (
            <Button
                size="large"
                theme="quadrant"
                path="/signup"
                data-id="homepage-playfree-button"
                showPlatform
            >
                Play Free
            </Button>
        )
    }

    function renderPlayNow(): JSX.Element {
        return (
            <Button
                size="large"
                theme="quadrant"
                path={{ page: 'play' }}
                data-id="homepage-playfree-button"
                showPlatform={false}
                internal
            >
                Launch EVE Online
            </Button>
        )
    }

    return (
        <div id="play-button-container">
            {loggedIn ? (
                <div id="logged_in">{renderPlayNow()}</div>
            ) : (
                <div id="not_logged_in">{renderNotLoggedIn()}</div>
            )}
        </div>
    )
}
