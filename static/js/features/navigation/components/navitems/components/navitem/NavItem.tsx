import React from 'react'
import { TranslateFunction } from 'react-localize-redux'
import flags from 'config/flags'
import Link from 'features/link'
import { pushNavigationClickEventToDataLayer } from 'utils/analytics/datalayer/dataLayerFunctions'
import Icon from 'layouts/font-awesome'
import NavigationItemType from '../../../../models/navigation-item-type'
import style from './NavItem.module.scss'

const getIcon = (external: boolean): JSX.Element => {
    const props = {
        name: external ? 'external-link-square' : 'chevron-right',
        className: style('icon', { external, mobileView: !external }),
    }
    return <Icon {...props} />
}

const getChildren = (
    external: boolean,
    translate: TranslateFunction,
    translationId: string,
    dropdownEnabled: boolean
): JSX.Element[] => {
    const bar = <div key="bar" className={style.bar} />
    const text = (
        <div key="text" className={style.text}>
            <div className={style.title}>{translate(translationId)}</div>
            {dropdownEnabled && (
                <Icon className={style.arrow} solid name="caret-down" />
            )}

            {!dropdownEnabled && (
                <div className={style.logo}>{getIcon(external)}</div>
            )}
        </div>
    )
    return [bar, text]
}

// TODO, almost the same as getChildren above, maybe can be the same
const renderNavItem = (
    external: boolean,
    translate: TranslateFunction,
    translationId: string,
    dropdownEnabled: boolean
): JSX.Element[] => {
    const text = (
        <div key="text" className={style.text}>
            <div className={style.title}>{translate(translationId)}</div>
            {dropdownEnabled && (
                <Icon className={style.arrow} solid name="caret-down" />
            )}
            <div className={style.logo}>{getIcon(external)}</div>
        </div>
    )
    return [text]
}

interface Props {
    className?: string
    selected?: boolean
    external?: boolean
    page?: string
    subpage?: string
    sub?: string
    href?: string
    dataId?: string
    translate?: TranslateFunction
    translationId?: string
    children?: Array<NavigationItemType>
}

const NavItem = ({
    selected,
    external,
    page,
    subpage,
    sub,
    href,
    dataId,
    className: externalClass,
    translate,
    translationId,
    children,
}: Props): JSX.Element => {
    let className = style(style.item, {
        [style.selected]: selected,
        [style.colorTheme]: flags.features.colorThemeEnabled,
        [style.withChildren]: children !== undefined, // Add extra class if this item has sub nav items
    })

    if (externalClass !== undefined) {
        className = `${externalClass} ${className}`
    }

    let dropdownEnabled = false
    if (children) dropdownEnabled = true

    // TODO this code can be made more type safe and try to not use props-spread for readability
    let Tag: typeof Link | string = Link

    const props: React.HTMLProps<HTMLAnchorElement> & {
        'data-id': string
        path?: { page: string; subpage: string }
    } = {
        'data-id': dataId,
    }

    if (page) {
        props.path = { page, subpage: sub }
    } else {
        Tag = 'a'
        props.href = href

        if (external) {
            props.target = '_blank'
            props.rel = 'noopener noreferrer'
        }
    }

    return (
        <div className={className}>
            <Tag
                onClick={() => pushNavigationClickEventToDataLayer(dataId)}
                {...props}
            >
                {getChildren(
                    external,
                    translate,
                    translationId,
                    dropdownEnabled
                )}
            </Tag>
            {children && (
                <div className={style.dropdown}>
                    {children.map((item) => {
                        if (item.href) {
                            return (
                                <a
                                    key={item.dataId}
                                    href={item.href}
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    {renderNavItem(
                                        item.external,
                                        translate,
                                        item.translationId,
                                        false
                                    )}
                                </a>
                            )
                        }
                        return (
                            <Link
                                key={item.dataId}
                                path={{
                                    page: item.page,
                                    subpage: item.subpage,
                                }}
                                className={style({
                                    [style.selected]:
                                        subpage && subpage === item.page,
                                })}
                            >
                                {translate(item.translationId)}
                            </Link>
                        )
                    })}
                </div>
            )}
        </div>
    )
}

NavItem.defaultProps = {
    className: '',
    selected: false,
    external: false,
    page: undefined,
    subpage: undefined,
    sub: undefined,
    href: undefined,
    dataId: undefined,
    translate: undefined,
    translationId: undefined,
    children: undefined,
}

export default NavItem
