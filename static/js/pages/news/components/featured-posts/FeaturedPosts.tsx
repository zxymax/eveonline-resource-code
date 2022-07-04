import React from 'react'
import NewsType from 'models/types/ts/newsType'
import SectionType from 'models/types/ts/sectionType'
import { Heading, Frame } from 'layouts'
import ImageLazyLoad from 'features/image-lazyload'
import Link from '../shared/link'
import style from './FeaturedPosts.module.scss'

interface Props {
    featured: SectionType
}

const FeaturedPosts = ({ featured }: Props): JSX.Element => {
    const renderPosts = (content: NewsType): JSX.Element => (
        <article key={content.title} className={style.featured__content}>
            <Link slug={content.slug}>
                <div className={style.featured__imgwrapper}>
                    <ImageLazyLoad
                        image={content.metaImageUrl}
                        className={style.featured__img}
                        param="?w=130"
                        lazyloadProps={{
                            height: 73,
                            offset: 200,
                            once: true,
                        }}
                    />
                </div>
            </Link>
            <Link slug={content.slug}>{content.title}</Link>
        </article>
    )

    if (featured) {
        const { headline, contentCollection } = featured
        const { items, total } = contentCollection
        return (
            <Frame className={style.featured} cutoutTop={false}>
                <Heading size="small" isThemed>
                    {headline}
                </Heading>
                {total > 0 &&
                    items.map((item: unknown) => renderPosts(item as NewsType))}
            </Frame>
        )
    }
    return <></>
}

export default FeaturedPosts
