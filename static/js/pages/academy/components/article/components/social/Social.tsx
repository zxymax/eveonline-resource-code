import React, { useState, SyntheticEvent } from 'react'
import copy from 'copy-to-clipboard'
import { Translate } from 'react-localize-redux'
import getConfig from 'config/web'
import { Icon } from 'layouts'
import SocialIcon from './SocialIcon'
import style from './Social.module.scss'

interface Props {
    language: string
    slug: string
}

const { webBaseUrl, shareFacebook, shareReddit, shareTwitter, shareVk } = getConfig()

const Social = ({ language, slug }: Props): JSX.Element => {
    const [linkCopied, setLinkCopied] = useState(false)

    const getShareLink = (): string => {
        let langPrefix = ''
        if (language !== 'en') {
            langPrefix = `/${language}`
        }
        return `${webBaseUrl}${langPrefix}/${slug}`
    }

    const getLink = (path: string): string => path + getShareLink()

    const copyToClipBoard = (event: SyntheticEvent): void => {
        event.preventDefault()
        copy(getShareLink(), {
            format: 'text/plain',
        })
        setLinkCopied(true)

        setTimeout(() => {
            setLinkCopied(false)
        }, 2000)
    }

    return (
        <div className={style.social}>
            <SocialIcon link={getLink(shareFacebook)} icon="facebook-f" />
            <SocialIcon link={getLink(shareTwitter)} icon="twitter" />
            <SocialIcon link={getLink(shareVk)} icon="vk" />
            <SocialIcon link={getLink(shareReddit)} icon="reddit" />
            <div
                className={style(style.copyLink, style.social_icon)}
                onClick={(event) => copyToClipBoard(event)}
                role="presentation"
            >
                <Icon regular name="link" className={style.icon} />
                <div
                    className={style(style.copied, {
                        [style.active]: linkCopied,
                    })}
                >
                    <Translate id="recruit.linkCopied" />
                </div>
            </div>
        </div>
    )
}

export default Social
