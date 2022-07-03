import React from 'react'
import { Icon } from 'layouts'
import style from './Social.module.scss'

interface Props {
    link: string
    icon: string
}

const SocialIcon = ({ link, icon }: Props): JSX.Element => (
    <a
        href={link}
        className={style.social_icon}
        rel="noopener noreferrer"
        target="_blank"
    >
        <Icon brand name={icon} className={style.icon} />
    </a>
)

export default SocialIcon
