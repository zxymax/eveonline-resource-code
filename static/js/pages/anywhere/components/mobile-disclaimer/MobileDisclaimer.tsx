import React from 'react'
import { Translate } from 'react-localize-redux'
import AlertMessage from 'layouts/alert-message'
import s from './MobileDisclaimer.module.scss'

const MobileInfo = (): JSX.Element => (
    <AlertMessage info className={s.mobileInfo}>
        <Translate id="anywhere.mobileDisclaimer" />
    </AlertMessage>
)

export default MobileInfo
