import React, { lazy, Suspense } from 'react'
import { Loading } from 'layouts'
import { isClient } from 'config/web'
import s from './play.module.scss'
// import PlaytimeDisplay from '../playtimeDisplay'

let LoadableComponent

if (isClient) {
    LoadableComponent = lazy(
        () =>
            import(
                /* webpackChunkName: "anywhere-stream" */ 'features/playnow/stream'
            )
    )
}
// const Loading = (): JSX.Element => <div>Loading...</div>

interface PlayProps {
    hasRecentlyPurchased: boolean
}

const PlayStream = ({ hasRecentlyPurchased }: PlayProps): JSX.Element => {
    return (
        <div className={s.streamContainer}>
            {isClient && (
                <Suspense fallback={<Loading />}>
                    <LoadableComponent
                        hasRecentlyPurchased={hasRecentlyPurchased}
                    />
                </Suspense>
            )}
        </div>
    )
}

export default PlayStream
