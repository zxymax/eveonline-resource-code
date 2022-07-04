import React from 'react'
import ReactMarkdown from 'react-markdown'
import _map from 'lodash/map'
import SectionType from 'models/types/ts/sectionType'
import style from './CardList.module.scss'
import Card from './components/card'

interface Props {
    section: SectionType
}

const CardList = ({ section }: Props): JSX.Element => {
    const { items, total } = section.contentCollection

    return (
        <div className={style(style.cardList, { [style.three]: total === 3 })}>
            {section.body && (
                <ReactMarkdown source={section.body} className={style.intro} />
            )}
            {total > 0 &&
                _map(items, (item, i) => <Card card={item} key={i} />)}
        </div>
    )
}

export default CardList
