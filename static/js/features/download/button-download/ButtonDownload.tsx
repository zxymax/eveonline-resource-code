// TODO remove Success component later, it is not used in new signup form, instead we redirect to a new page /signup-verify when registration is successful.

import React from 'react'
import ReactMarkdown from 'react-markdown'
import DownloadButton from 'features/DownloadButton'
import { Icon } from 'layouts'

import style from '../Download.module.scss'

interface Props {
    title: string
    TitleComponent: any // eslint-disable-line
    text: string
    text2: string
    platform: string
    urlPrefix: string
}

const ButtonDownload = ({
    title,
    TitleComponent,
    text,
    text2,
    platform,
    urlPrefix,
}: Props): JSX.Element => {
    return (
        <div className={style.download}>
            <TitleComponent>
                <Icon regular name="check-circle" className={style.success} />
                {title}
            </TitleComponent>
            <ReactMarkdown source={text} />
            <ReactMarkdown source={text2} />
            <div className={style.buttons}>
                <DownloadButton
                    small
                    platform={platform}
                    urlPrefix={urlPrefix}
                />
            </div>
        </div>
    )
}

export default ButtonDownload
