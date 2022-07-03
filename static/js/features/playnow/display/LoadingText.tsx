import React, { useState, useEffect } from 'react'
import style from './PlayNowDisplay.module.scss'

const LoadingText = (): JSX.Element => {
    const [currentIndex, setCurrentIndex] = useState(0)
    const [fading, setFading] = useState<boolean>(true)

    const textArray = [
        'Patience! This is difficult, you know...',
        'Swapping time and space...',
        'Bending the spoon...',
        'We need a new fuse...',
        'Go ahead -- hold your breath!',
        "...at least you're not on hold...",
        'Follow the white rabbit',
        'Are we there yet?',
        'Just count to 10',
        "Let's take a mindfulness minute...",
        'How did you get here?',
        'Computing the secret to life, the universe, and everything.',
        "Let's hope it's worth the wait",
        "It's still faster than you could draw it",
        'I feel like im supposed to be loading something...',
    ]

    useEffect(() => {
        let interval = null
        interval = setInterval(() => {
            setCurrentIndex(Math.floor(Math.random() * textArray.length))
        }, 6000)

        return () => clearInterval(interval)
    }, [currentIndex])

    useEffect(() => {
        let fadeInterval = null
        fadeInterval = setTimeout(() => {
            setFading(false)
            // console.log('Use effect fading interval', fading)
        }, 5000)
        setFading(true)
        return () => {
            clearInterval(fadeInterval)
        }
    }, [currentIndex])

    return (
        <div className={style.loadingText}>
            <div className={`${fading ? [style.in] : [style.out]}`}>
                {textArray[currentIndex]}
            </div>
        </div>
    )
}

export default LoadingText
