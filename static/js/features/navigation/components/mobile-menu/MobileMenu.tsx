import React from 'react'
import { SelectLanguage } from 'features'
import Search from 'pages/news/components/search'
import NavItems from '../navitems'
import style from './MobileMenu.module.scss'

type ParentNodePlusClassName = ParentNode & {
    className?: string
}

interface Props {
    open: boolean
    closeMenu: () => void
    currentPage: string
}
function MobileMenu({ open, closeMenu, currentPage }: Props): JSX.Element {
    const getClassName = (): string => style('menu', { open, closed: !open })

    const handleClick = (
        e: React.MouseEvent<HTMLElement, MouseEvent>
    ): void => {
        // TODO, this code seems to be doing nothing special.
        // It tries to prevent the menu from closing in some cases, but likely been broken for a while
        // The menu now always closes when clicked anywhere in it which should be fine
        const parent: ParentNodePlusClassName = (e.target as HTMLElement).parentNode
        const { className } = parent
        // const { className } = (e.target as HTMLElement).parentNode
        const element = (e.target as HTMLElement).tagName
        if (
            className === style.social ||
            className === getClassName() ||
            element === 'FORM' ||
            element === 'INPUT'
        ) {
            return
        }

        closeMenu()
    }

    const renderFooter = (): JSX.Element => (
        <div className={style.footer}>
            <SelectLanguage className={style.language} />
        </div>
    )

    const className = getClassName()
    // The role and onClick are to make sure we close the menu
    // when the user clicks on a link.
    return (
        <div
            role="presentation"
            className={className}
            onClick={(e) => handleClick(e)}
        >
            {currentPage === 'news' && (
                <div className={style.search}>
                    <Search onSearch={() => closeMenu()} />
                </div>
            )}
            <NavItems className={style.navigation} />
            {renderFooter()}
        </div>
    )
}

export default MobileMenu
