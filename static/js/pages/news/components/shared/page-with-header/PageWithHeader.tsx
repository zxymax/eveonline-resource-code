import React, { ReactNode } from 'react'
import { useSelector } from 'react-redux'
import { GlobalState } from 'types/redux'
import SectionType from 'models/types/ts/sectionType'
import SectionById from 'queries/SectionByIdQuery'
import BackgroundImage from 'features/background-image'
import Promo from '../../promo'
import style from './PageWithHeader.module.scss'

interface Props {
    children: ReactNode
}

const PageWithHeader = ({ children }: Props): JSX.Element => {
    const language = useSelector((state: GlobalState) => state.language)

    return (
        <BackgroundImage url="https://images.ctfassets.net/7lhcm73ukv5p/1mv6Tg8PUsMWyGauWckSOo/5be5f00d5fb6d445f420b7a1c669fd26/star-bg.jpg">
            <BackgroundImage
                url="https://images.ctfassets.net/7lhcm73ukv5p/3kBbL40e9KAKPMlM27jqRw/670eb7dd8cd76eab700ec8445373dd2c/news_detail_background.jpg?w=1800&q=75"
                repeat="no-repeat"
                size="cover"
                position="center center"
                className={style.header}
            />
            <div className={style.container}>{children}</div>
            <SectionById identifier="news-page-footer" locale={language}>
                {(section: SectionType) => {
                    if (section) {
                        return <Promo section={section} />
                    }
                }}
            </SectionById>
        </BackgroundImage>
    )
}

export default PageWithHeader

