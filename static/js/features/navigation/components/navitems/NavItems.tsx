import React from 'react'
import { useSelector } from 'react-redux'
import { getLanguage } from 'selectors'
import NavigationItemType from '../../models/navigation-item-type'
import NavItem from './components/navitem'

interface Props {
    className: string
    page: string
    subpage: string
    items: Array<NavigationItemType>
}

const Navigation = ({
    className,
    page,
    subpage,
    items,
}: Props): JSX.Element => {
    const language = useSelector((state) => getLanguage(state))

    return (
        <nav className={className}>
            {items.map((item) => {
                if (item.disabled) {
                    return null
                }

                const props: NavigationItemType = {
                    key: item.dataId,
                    translationId: item.translationId,
                    dataId: item.dataId,
                }

                if (item.href) {
                    props.href = item.href
                    props.external = true
                    // Can overwrite external links with LOC link if they are set.
                    // Then the string {language} in the loc link will be replaces with the selected language on page
                    if (language !== 'en' && item.locHref) {
                        // extra check just for japan for now. can be removed when updates is sunsetted.
                        if (
                            !(
                                language === 'ja' &&
                                item.locHref.includes('updates.eveonline.com')
                            )
                        ) {
                            props.href = item.locHref.replace(
                                '{language}',
                                language
                            )
                        }
                    }
                } else {
                    props.page = item.page
                    props.subpage = subpage

                    if (item.sub) {
                        props.sub = item.sub
                    }

                    if (item.selectedValues && item.selectedValues.length > 0) {
                        props.selected = item.selectedValues.includes(page)

                        if (subpage && item.sub) {
                            props.selected = item.selectedValues.includes(
                                subpage
                            )
                        }
                    }
                }

                if (item.children) {
                    props.children = item.children
                }

                return <NavItem {...props} />
            })}
        </nav>
    )
}

export default Navigation
