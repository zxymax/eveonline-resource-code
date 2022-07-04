import React, { useState, useEffect, Fragment } from 'react'
import { useSelector } from 'react-redux'
import { GlobalState } from 'types/redux'
import Platform from 'platform'
import _map from 'lodash/map'
import _filter from 'lodash/filter'
import classNames from 'classnames'
import SectionType from 'models/types/ts/sectionType'
import ReactMarkdown from 'react-markdown'
import localize from 'shared/localize'
import { Column, Row } from '../../../../layouts/common'
import { Icon } from '../../../../layouts'
import style from './Download.module.scss'

interface Props {
    sections: Array<SectionType>
    // language: string
}

export default function SysReq({ sections }: Props): JSX.Element {
    const [showWin, setShowWin] = useState<boolean>(true)
    const [tabIndex, setTabIndex] = useState<number>(0)

    const language = useSelector((state: GlobalState) => state.language)

    useEffect(() => {
        setShowWin(Platform.os.family.includes('Windows'))
        setTabIndex(Platform.os.family.includes('Windows') ? 0 : 1)
    }, [])

    const renderIcon = (tabName: string): string => {
        return tabName === 'Windows' ? 'windows' : 'apple'
    }

    function platformSelect(platform: string, index: number): void {
        setShowWin(platform === 'Windows')
        setTabIndex(index)
    }

    const renderTabs = (contentBlock: Array<SectionType>): JSX.Element[] => {
        const tabs = _map(contentBlock, (item, index) => {
            const currClass = tabIndex === index ? style.current : ''
            return (
                <Fragment key={index}>
                    {item && (
                        <li key={index} role="presentation">
                            <div
                                className={currClass}
                                role="presentation"
                                onClick={() => platformSelect(item.name, index)}
                            >
                                <Icon brand name={renderIcon(item.name)} />
                                {item.name}
                            </div>
                        </li>
                    )}
                </Fragment>
            )
        })

        return tabs
    }

    function renderTable(contentBlock: Array<SectionType>): JSX.Element {
        const selectedTable = _filter(contentBlock, {
            name: showWin ? 'Windows' : 'Mac',
        })
        const iconClass = classNames(style.table_bg, {
            [style.apple]: !showWin,
        })
        return (
            <div className={style.tableShow} key={selectedTable[0].name}>
                <ReactMarkdown source={selectedTable[0].body} />
                <Icon
                    brand
                    className={iconClass}
                    name={renderIcon(selectedTable[0].name)}
                />
            </div>
        )
    }

    return (
        <div className={style.sysReq}>
            <Row>
                <Column xs={12} md={12}>
                    <h4>{localize[language].systemRequirements}</h4>
                    <ul className={style.tabs}>{renderTabs(sections)}</ul>
                    {renderTable(sections)}
                </Column>
            </Row>
        </div>
    )
}
