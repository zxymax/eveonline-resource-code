import React from 'react'
import SlidingPaneComponent from 'react-sliding-pane'
import { Container } from 'layouts'
import LinkArrow from 'layouts/link-arrow'
import { LabelSmall } from 'layouts/typography'
import 'react-sliding-pane/dist/react-sliding-pane.css'
import s from './SlidingPane.module.scss'

interface Props {
    isOpen: boolean
    onClose: () => void
    children: React.ReactNode
}

const SlidingPane = ({ isOpen, onClose, children }: Props): JSX.Element => {
    return (
        <SlidingPaneComponent
            className={s.pane}
            overlayClassName={s.overlay}
            hideHeader
            isOpen={isOpen}
            onRequestClose={onClose}
            width="100%"
            from="bottom"
        >
            <Container>
                <button type="button" onClick={onClose} className={s.back}>
                    <LinkArrow className={s.arrow} color="#F67C0F" />{' '}
                    <LabelSmall>Back to Fanfest</LabelSmall>
                </button>
                {children}
            </Container>
        </SlidingPaneComponent>
    )
}

export default SlidingPane
