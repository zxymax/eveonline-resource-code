import React, { memo } from 'react'
import Icon from 'layouts/font-awesome'
import styles from './styles.module.scss'

interface Props {
    id: string
    dataId?: string
    title?: string
    name: string
    href: string
    showBrandColor?: boolean
    isLink?: boolean
    className?: string
}

const SocialIcon =
    ({
        id,
        name,
        title,
        href,
        dataId = '',
        showBrandColor = false,
        isLink = true,
    }: Props): JSX.Element => {
        let className = `${styles.socialIcon} ${styles[id]}`
        if (showBrandColor) {
            className = `${styles.socialIcon} ${styles.incolor} ${styles[id]}`
        }

        if (!isLink) {
            return <Icon brand name={name} className={styles.icon} />
        }

        return (
            <div className={className}>
                <a
                    className={`idm-share-${id}`}
                    href={href}
                    title={title}
                    data-id={dataId}
                    target="_blank"
                    aria-label={title}
                    rel="noopener noreferrer"
                >
                    <Icon brand name={name} className={styles.icon} />
                </a>
            </div>
        )
    }


SocialIcon.defaultProps = {
    dataId: '',
    showBrandColor: false,
    isLink: true,
    className: null,
    title: ''
}

export default memo(SocialIcon)

