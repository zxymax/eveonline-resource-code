import React, { memo } from 'react'
import SocialIcon from './components'

interface Props {
    id: 'facebook' | 'twitter' | 'youtube' | 'twitch' | 'instagram' | 'vk'
    isLink?: boolean
}


const icons = {
    facebook: {
        faName: 'facebook-f',
        href: '//www.facebook.com/eveonline/',
        title: 'Facebook',
    },
    twitter: {
        faName: 'twitter',
        href: '//twitter.com/eveonline/',
        title: 'Twitter',
    },
    youtube: {
        faName: 'youtube',
        href: '//www.youtube.com/channel/UCwF3VyalTHzL0L-GDlwtbRw/',
        title: 'YouTube',
    },
    twitch: { faName: 'twitch', href: '//www.twitch.tv/ccp', title: 'Twitch' },
    instagram: {
        faName: 'instagram',
        href: '//www.instagram.com/eveonline/',
        title: 'Instagram',
    },
    vk: { faName: 'vk', href: '//vk.com/eveonline', title: 'VK' },
}

const Icon = ({ id, isLink }: Props): JSX.Element => {
    if (id == null || icons[id] == null) return null
    return (
        <SocialIcon
            id={id}
            title={icons[id].title}
            name={icons[id].faName}
            href={icons[id].href}
            isLink={isLink}
        />
    )
}

Icon.defaultProps = {
    isLink: true,
}

export default memo(Icon)

