import React, { useState } from 'react'
import cx from 'classnames'
import SectionType from 'models/types/ts/sectionType'
import { pushClickEventToDataLayer } from 'utils/analytics/datalayer/dataLayerFunctions'
import useOutsideClick from 'hooks/useOutsideClick'
import { Button } from 'layouts'
import s from './Links.module.scss'

interface Props {
    links: SectionType
    children: React.ReactNode
}

const Links = ({
    links: {
        contentCollection: { total, items },
        body,
    },
    children,
}: Props): JSX.Element => {
    const [active, setActive] = useState<boolean>(false)
    const ref = useOutsideClick(() => setActive(false))

    const handleClick = (): void => {
        setActive(true)
    }

    return (
        total > 0 && (
            <div className={s.linksWrapper} ref={ref}>
                <div className={cx(s.links, { [s.active]: active })}>
                    {items.map(
                        (item) =>
                            item.buttonUrl && (
                                <a
                                    key={item.name}
                                    href={item.buttonUrl}
                                    className={s.link}
                                    data-id={item.name}
                                    onClick={() =>
                                        pushClickEventToDataLayer(
                                            'Button click',
                                            item.name
                                        )
                                    }
                                >
                                    <span className={s.hidden}>
                                        {item.name}
                                    </span>
                                    <img
                                        src={item.imageFile?.url}
                                        alt={item.imageFile?.description}
                                    />
                                </a>
                            )
                    )}
                </div>
                <Button
                    as="button"
                    className={s.btn}
                    size="small"
                    border={1}
                    theme="secondary"
                    onClick={handleClick}
                >
                    {children}
                </Button>
                {body && <span className={s.label}>{body}</span>}
            </div>
        )
    )
}
export default Links
