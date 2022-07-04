import React, { useEffect, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import SectionType from 'models/types/ts/sectionType'
import { isClient } from 'config/web'
import { Icon } from 'layouts'
import style from './AlertBanner.module.scss'

interface Props {
    section: SectionType
}

const AlertBar = ({ section }: Props): JSX.Element => {
    const SESSIONBAR = 'hideAlertBar'
    const [showBar, setShowBar] = useState(false)

    useEffect(() => {
        if (isClient) {
            if (sessionStorage.getItem(SESSIONBAR) !== 'true') {
                setShowBar(true)
                document.body.style.marginTop = '50px'
            } else {
                setShowBar(false)
            }
        }

        return () => {
            document.body.style.marginTop = '0'
        }
    }, [showBar])

    const close = (): void => {
        sessionStorage.setItem(SESSIONBAR, 'true')
        setShowBar(false)
    }

    return (
        <>
            {showBar && (
                <div className={style.bar}>
                    {section?.body && (
                        <>
                            <Icon
                                name="exclamation-triangle"
                                light
                                className={style.icon}
                            />
                            <a
                                href={section?.buttonUrl && section.buttonUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <ReactMarkdown source={section.body} />
                            </a>
                            <span
                                role="button"
                                tabIndex={0}
                                onClick={close}
                                onKeyDown={close}
                                className={style.close}
                            >
                                <Icon light name="times" />
                            </span>
                        </>
                    )}
                </div>
            )}
        </>
    )
}

export default AlertBar
