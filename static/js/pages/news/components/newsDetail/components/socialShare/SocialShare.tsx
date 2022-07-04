import React, { useState, SyntheticEvent } from 'react'
import { useSelector } from 'react-redux'
import { getLanguage } from 'selectors'
import { pushSocialShareEventToDataLayer } from 'utils/analytics/datalayer/dataLayerFunctions'
import NewsType from 'models/types/ts/newsType'
import classNames from 'classnames'
import { Translate } from 'react-localize-redux'
import copy from 'copy-to-clipboard'
import getConfig from 'config/web'
import { Icon } from 'layouts'
import style from './SocialShare.module.scss'


const { webBaseUrl, shareFacebook, shareVk, shareTwitter, shareReddit } = getConfig()

interface Props {
    newsItem: NewsType
}

const SocialShare = ({ newsItem }: Props): JSX.Element => {
    const [linkCopied, setLinkCopied] = useState(false)
    const language = useSelector((state) => getLanguage(state))

    const getShareLink = (): string => {
        let langPrefix = ''
        if (language !== 'en') {
            langPrefix = `/${language}`
        }
        return `${webBaseUrl}${langPrefix}/news/view/${newsItem.slug}`
    }

    const copyToClipBoard = (event: SyntheticEvent): void => {
        event.preventDefault()
        copy(getShareLink(), {
            format: 'text/plain',
        })
        setLinkCopied(true)
        pushSocialShareEventToDataLayer('Copy Link')

        setTimeout(() => {
            // if (linkCopied) {
            setLinkCopied(false)
            // }
        }, 2000)
    }

    return (
        <div className={style.socialShare}>
            <div className={style.inner}>
                <a
                    href={shareFacebook + getShareLink()}
                    rel="noopener noreferrer"
                    target="_blank"
                    className={style.facebook}
                    onClick={() => pushSocialShareEventToDataLayer('Facebook')}
                >
                    <Icon brand name="facebook-f" className={style.social} />
                </a>
                <a
                    href={shareTwitter + getShareLink()}
                    rel="noopener noreferrer"
                    target="_blank"
                    className={style.twitter}
                    onClick={() => pushSocialShareEventToDataLayer('Twitter')}
                >
                    <Icon brand name="twitter" className={style.social} />
                </a>
                <a
                    href={shareVk + getShareLink()}
                    rel="noopener noreferrer"
                    target="_blank"
                    className={style.twitter}
                    onClick={() => pushSocialShareEventToDataLayer('VK')}
                >
                    <Icon brand name="vk" className={style.social} />
                </a>
                <a
                    href={shareReddit + getShareLink()}
                    rel="noopener noreferrer"
                    target="_blank"
                    className={style.twitter}
                    onClick={() => pushSocialShareEventToDataLayer('Reddit')}
                >
                    <Icon brand name="reddit" className={style.social} />
                </a>
            </div>
            <div
                className={style.copyLink}
                onClick={(event) => copyToClipBoard(event)}
                role="presentation"
            >
                {/* <a href="#"> */}
                <Icon regular name="link" className={style.social} />
                {/* </a>                */}
                <div
                    className={classNames(style.copied, {
                        [style.active]: linkCopied,
                    })}
                >
                    <Translate id="recruit.linkCopied" />
                </div>
            </div>
        </div>
    )
}

export default SocialShare
