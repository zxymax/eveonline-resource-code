import React from 'react'
import NewsType from 'models/types/ts/newsType'
import { HeadingRegular, ParagraphLarge } from 'layouts/typography'
import { DateAndAuthor, ImageLazyLoad } from 'features'
import Tags from '../tags'
import Link from '../../shared/link'
import style from './CardFeatured.module.scss'

interface Props {
    newsItem: NewsType
}

const CardFeatured = ({ newsItem }: Props): JSX.Element => (
    <article className={style.card}>
        <Tags tagList={newsItem.tags} />
        <Link slug={newsItem.slug}>
            {newsItem.metaImageUrl && newsItem.metaImageUrl.url && (
                <ImageLazyLoad
                    className={style.img}
                    image={newsItem?.metaImageUrl}
                    param="?w=900&fm=jpg&fl=progressive&q=75"
                    lazyloadProps={{
                        height: 475,
                        offset: 300,
                        once: true,
                    }}
                />
            )}
            <div className={style.card__content}>
                <DateAndAuthor
                    date={newsItem.publishingDate}
                    author={newsItem.author}
                />
                <HeadingRegular
                    textTransform="unset"
                    fontSize={[28, 42]}
                    fontWeight={600}
                    className={style.card__title}
                >
                    {newsItem.title}
                </HeadingRegular>
                <ParagraphLarge className={style.card__desc}>
                    {newsItem.metaDescription}
                </ParagraphLarge>
            </div>
        </Link>
    </article>
)

export default CardFeatured
