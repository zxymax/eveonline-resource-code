import React, { useState } from 'react'
import { setItem, getItem } from 'utils/storage'
import { Button, Frame, Icon } from 'layouts'
import { HeadingSmall, ParagraphLarge } from 'layouts/typography'
import style from './Personalization.module.scss'

const PERSONALIZATION_COOKIE = 'personal-dismissed'

// TODO MOVE TO UTILS, or not
export const setCustomCookie = (key: string, value: string): void => {
    const expires = new Date()
    expires.setDate(expires.getDate() + 180)
    setItem(key, value, { expires })
}

export const getCustomCookie = (key: string): string => getItem(key)

const getId = (): string => {
    return getCustomCookie(PERSONALIZATION_COOKIE) === 'true'
        ? 'personal-hidden'
        : 'personal'
}

// interface Props {
//     content: string
// }

const Personalization = (): JSX.Element => {
    // const Personalization = ({ content }: Props) => {
    // Get id from cookie if it exists
    const id = getId()

    // Using state to trigger rerender on dismiss and setting initial value to true/false based on if cookie has been set or not
    const [show, setShow] = useState(id === 'personal')

    const hideOverlay = (): void => {
        setCustomCookie(PERSONALIZATION_COOKIE, 'true')
        setShow(false)
    }

    return (
        <div>
            {show && (
                <div id={id} className={style[id]}>
                    <Frame className={style.container}>
                        <button
                            id="personal_close"
                            onClick={hideOverlay}
                            className={style.close}
                            type="submit"
                        >
                            <Icon solid name="times-hexagon" />
                        </button>
                        <HeadingSmall />
                        <ParagraphLarge />
                        <div className={style.links}>
                            <Button
                                id="personal_link"
                                data-id="personal-external-button"
                                size="small"
                                path="https://www.eveonline.com"
                                rel="noopener noreferrer"
                                target="_blank"
                            />
                            <button
                                id="personal_button"
                                onClick={hideOverlay}
                                className={style.link}
                                type="submit"
                            >
                                <span data-id="personal-dismiss-button" />
                            </button>
                        </div>

                        {/* <br />
                    <span>should show: {getId()}</span>
                    <br />
                    <span>show value: {show}</span>
                    {content} */}
                    </Frame>
                </div>
            )}
        </div>
    )
}

export default Personalization
