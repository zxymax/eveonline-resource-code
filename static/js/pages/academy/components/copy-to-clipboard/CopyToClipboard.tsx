import React, { useState, SyntheticEvent } from 'react'
import copy from 'copy-to-clipboard'
import { Translate } from 'react-localize-redux'
import { Button } from 'layouts'

import style from './CopyToClipboard.module.scss'

interface Props {
    copyText: string
}
export default function CopyToClipboard({ copyText }: Props): JSX.Element {
    const [linkCopied, setLinkCopied] = useState(false)

    const copyToClipBoard = (event: SyntheticEvent): void => {
        event.preventDefault()
        copy(copyText, {
            format: 'text/plain',
        })
        setLinkCopied(true)

        setTimeout(() => {
            setLinkCopied(false)
        }, 2000)
    }

    return (
        <Translate>
            {({ translate }) => (
                <div
                    onClick={(event) => copyToClipBoard(event)}
                    role="presentation"
                    className={style.copy}
                >
                    <Button theme="academy">
                        {linkCopied
                            ? translate('academy.linkCopied')
                            : translate('academy.copyLink')}
                    </Button>
                </div>
            )}
        </Translate>
    )
}
