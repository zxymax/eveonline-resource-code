import React, { Fragment } from 'react'
import classNames from 'classnames'
import { Translate } from 'react-localize-redux'
import ContentType from 'models/types/ts/contentType'

import shipClasses from '../../ship-classes'

import SmallIcons from '../../../icons/small-icons'
import IconWithBackground from '../../../icons/icon-with-background/IconWithBackground'
import style from './ShipClassList.module.scss'

interface Props {
    ships: Array<ContentType>
    selectedIndex: number
    setActive(key: number): void
    language: string
}

export default function ShipClassList({
    ships,
    selectedIndex,
    setActive,
}: Props): JSX.Element {
    const cx = classNames.bind(style)

    const renderItem = (
        ship: ContentType,
        currentIndex: number
    ): JSX.Element => {
        return (
            <div
                className={cx(style.item, {
                    [style.current]: currentIndex === selectedIndex,
                })}
                key={ship.name}
                role="presentation"
                onClick={() => setActive(currentIndex)}
            >
                <IconWithBackground>
                    <SmallIcons icon={shipClasses[currentIndex]?.icon} />
                </IconWithBackground>
                <div className={style.text}>
                    <p>{ship.headline}</p>
                </div>
            </div>
        )
    }

    const splitIndex1 = 5
    const splitIndex2 = 9

    return (
        <div className={style.shipClassList}>
            <div className={style.head}>
                <p className={style.heading}>
                    <Translate id="academy.combatShips" />
                </p>
                <p className={style.heading}>
                    <Translate id="academy.nonCombatShips" />
                </p>
            </div>
            <div className={style.content}>
                <div className={style.column}>
                    {ships.map((ship, index) => {
                        // To keep indexes for selected item, using slice will mess that up
                        if (index < splitIndex1) return renderItem(ship, index)
                        return <Fragment key={ship.headline} />
                    })}
                </div>

                <div className={style.column}>
                    {ships.map((ship, index) => {
                        // To keep indexes for selected item, using slice will mess that up
                        if (index >= splitIndex1 && index < splitIndex2)
                            return renderItem(ship, index)
                        return <Fragment key={ship.headline} />
                    })}
                </div>

                <div className={style.column}>
                    {ships.map((ship, index) => {
                        // To keep indexes for selected item, using slice will mess that up
                        if (index >= splitIndex2 && index < ships.length)
                            return renderItem(ship, index)
                        return <Fragment key={ship.headline} />
                    })}
                </div>
            </div>
        </div>
    )
}
