import React from 'react'
import classNames from 'classnames'
import { Translate } from 'react-localize-redux'
import { Link } from 'features'
import Icons, { ArrowRightIcon, ArrowDownIcon } from '../../../icons'
import AcademyPageType from '../../../../models/academy-page-type'
import IconColorEnum from '../../../../models/icon-color-enum'
import TemplateEnum from '../../../../models/academy-page-template-enum'

import style from './NavigationItem.module.scss'

interface NavItemProps {
    sitemapPage: AcademyPageType
    url: string
    isCurrent?: boolean
}

const NavItem = ({
    sitemapPage,
    url,
    isCurrent = false,
}: NavItemProps): JSX.Element => {
    const cx = classNames.bind(style)

    return (
        <Translate>
            {({ translate }) => (
                <li
                    className={cx(style.navitem, {
                        [style.current]: isCurrent,
                        [style.article]:
                            sitemapPage.template === TemplateEnum.Article,
                    })}
                >
                    <div className={style.wrap}>
                        <div className={style.clipped}>
                            <Link url={url}>
                                {sitemapPage.icon && (
                                    <span className={style.icon}>
                                        <Icons
                                            icon={sitemapPage.icon}
                                            color={
                                                isCurrent
                                                    ? IconColorEnum.WhiteColor
                                                    : IconColorEnum.GrayColor
                                            }
                                        />
                                    </span>
                                )}
                                <span className={style.text}>
                                    <span className={style.textInner}>
                                        {translate(
                                            `academyPages.${sitemapPage.pageSlug}`
                                        )}
                                    </span>
                                </span>
                                {isCurrent && (
                                    <span className={style.arrow}>
                                        <ArrowDownIcon />
                                    </span>
                                )}
                                {!isCurrent && (
                                    <span className={style.arrow}>
                                        <ArrowRightIcon />
                                    </span>
                                )}
                            </Link>
                        </div>
                    </div>
                </li>
            )}
        </Translate>
    )
}

NavItem.defaultProps = {
    isCurrent: false,
}
export default NavItem
