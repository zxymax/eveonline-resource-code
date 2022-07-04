import React from 'react'
import Countdown, { zeroPad, CountdownTimeDelta } from 'react-countdown'
import { isClient } from 'config/web'
import s from './CountDown.module.scss'

interface Props {
    date: Date
}

/* eslint-disable jsx-a11y/anchor-is-valid */

const CountDown = ({ date }: Props): JSX.Element => {
    const onComplete = (): JSX.Element => {
        if (isClient) window.location.reload()

        return <></>
    }

    const renderer = ({
        days,
        hours,
        minutes,
        seconds,
        completed,
    }: CountdownTimeDelta): JSX.Element => {
        return completed ? (
            onComplete()
        ) : (
            <div className={s.timer}>
                {zeroPad(days)}:{zeroPad(hours)}:{zeroPad(minutes)}:
                {zeroPad(seconds)}
            </div>
        )
    }

    return (
        <div className={s.countdown}>
            <Countdown date={date} renderer={renderer} />
        </div>
    )
}

export default CountDown

