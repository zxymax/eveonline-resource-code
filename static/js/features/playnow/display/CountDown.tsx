import React, { useState, useEffect } from 'react'
import style from './PlayNowDisplay.module.scss'

const Timer = (): JSX.Element => {
    const [seconds, setSeconds] = useState(3)
    const [isActive, setIsActive] = useState(true)

    useEffect(() => {
        let interval = null
        if (seconds === 0) {
            setIsActive(false)
        }
        if (isActive) {
            interval = setInterval(() => {
                setSeconds(seconds - 1)
            }, 1000)
        } else if (!isActive && seconds !== 0) {
            clearInterval(interval)
        }
        return () => clearInterval(interval)
    }, [isActive, seconds])

    return (
        <div className={style.countDown}>
            <span>{seconds}</span> seconds
        </div>
    )
}

export default Timer
