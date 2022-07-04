import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'

import styles from './countDown.scss'

const CountDown = ({ title, endDate }) => {
    const calculateTimeLeft = () => {
        const difference = +new Date(endDate) - +new Date()
        let timeLeft = {}

        if (difference > 0) {
            timeLeft = {
                days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                minutes: Math.floor((difference / 1000 / 60) % 60),
                seconds: Math.floor((difference / 1000) % 60),
            }
        }

        return timeLeft
    }

    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft())

    useEffect(() => {
        setTimeout(() => {
            setTimeLeft(calculateTimeLeft())
        }, 1000)
    })

    const timerComponents = []

    Object.keys(timeLeft).forEach((interval) => {
        //   if (!timeLeft[interval]) {
        //     return
        //   }

        timerComponents.push(
            <div className={styles.num} key={interval}>
                <span>{timeLeft[interval]}</span>{' '}
                <div className={styles.unit}>{interval}</div>{' '}
            </div>
        )
    })

    return (
        <>
            {/* {timerComponents.length && ( */}
            <div className={styles.countdown}>
                <div className={styles.column}>
                    <p>{timerComponents.length ? title : ''}</p>
                    <div className={styles.timer}>
                        {timerComponents.length ? timerComponents : ''}
                    </div>
                </div>
            </div>
            {/* )} */}
        </>
    )
}

CountDown.propTypes = {
    title: PropTypes.string,
    endDate: PropTypes.instanceOf(Date),
}

export default CountDown
