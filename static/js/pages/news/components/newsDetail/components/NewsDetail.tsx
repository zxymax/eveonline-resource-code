import React, { useContext } from 'react'
import NewsType from 'models/types/ts/newsType'
import ReactMarkdown from 'react-markdown/with-html'
import { AdGlareContext } from 'utils/context/AdGlareContext'
import _map from 'lodash/map'
import AdGlareNew from 'features/adGlare'
import { Container } from 'layouts'
import { HeadingRegular } from 'layouts/typography'
import Link from 'features/link'
import { DateAndAuthor, SEO, ImageLazyLoad, FeatureVideo } from 'features'
import SectionType from 'models/types/ts/sectionType'
import ImageType from 'models/types/ts/imageType'
import Search from '../../search'
import FeaturedPosts from '../../featured-posts'
import SocialShare from './socialShare'
import NewsStructuredData from './structured-data'
import style from './NewsDetail.module.scss'

interface Props {
    newsItem: NewsType
    featured: SectionType
}

const NewsDetail = ({ newsItem, featured }: Props): JSX.Element => {
    const adGlare = useContext(AdGlareContext)

    const AuthorAndShare = (): JSX.Element => (
        <div className={style.authAndShare}>
            <DateAndAuthor
                className={style.author_date}
                date={newsItem.publishingDate}
                author={newsItem.author}
            />
            <SocialShare newsItem={newsItem} />
        </div>
    )

    const Tags = (): JSX.Element => (
        <>
            {newsItem.tags && (
                <div className={style.tags}>
                    <ul>
                        {_map(newsItem.tags, (item, i) => (
                            <li key={i}>
                                <Link
                                    path={{
                                        page: 'news',
                                        subpage: 't',
                                        id: item,
                                    }}
                                >
                                    #{item}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </>
    )

    function getImageOrDefault(item: NewsType): ImageType {
        if (item && newsItem.metaImageUrl && newsItem.metaImageUrl.url) {
            return {
                url: item.metaImageUrl.url,
                description: item.metaImageUrl.description,
            }
        }
        return {
            url:
                'https://images.ctfassets.net/7lhcm73ukv5p/6tcqDcocg2kARQbxjbGOP2/d328aad97866814c40ac4bff10b714f0/clouds-bg.jpg',
            description: item.metaImageUrl.description,
        }
    }

    function replacerImages(str: string): string {
        let replaceText = str
        if (str.match(/\.(jpg)/i)) {
            replaceText = str.replace(
                new RegExp('.jpg', 'g'),
                '.jpg?w=900&fm=jpg&fl=progressive'
            )
            // console.log('replace TEXT', replaceText)
            return replaceText
        }
        if (str.match(/\.(png)$/i)) {
            // console.log('is png')
            replaceText = str.replace(
                new RegExp('.png', 'g'),
                '.png?w=900&fm=jpg&fl=progressive'
            )
            return replaceText
        }
        return replaceText // return the image string back if nothing is found, to get image to show, e.g. .gif
    }

    const Details = (item: NewsType): JSX.Element => {
        let contentWithMinimizedImages = ''
        if (item != null) {
            // regex to find image tag in markdown
            const reg = new RegExp(/(?:!\[(.*?)\]\((.*?)\))/, 'g')
            contentWithMinimizedImages = item.content.replace(
                reg,
                replacerImages
            )
        }

        return (
            <div className={style.detail}>
                <SEO
                    title={item.title}
                    description={item.metaDescription}
                    published={item.publishingDate}
                    updated={item.sys ? item.sys.publishedAt : null}
                    image={`${
                        getImageOrDefault(item).url
                    }?fm=jpg&w=1200&h=630&fit=fill`}
                />
                <HeadingRegular className={style.title} textTransform="unset">
                    {item.title}
                </HeadingRegular>
                <AuthorAndShare />
                {newsItem.video ? (
                    <div className={style.video}>
                        <FeatureVideo
                            videoId={newsItem.video}
                            image={getImageOrDefault(newsItem).url}
                        />
                    </div>
                ) : (
                    <ImageLazyLoad
                        className={style.img}
                        image={getImageOrDefault(item)}
                        param="?w=850&fm=jpg&fl=progressive&q=75"
                        lazyloadProps={{
                            height: 475,
                            offset: 300,
                            once: true,
                        }}
                    />
                )}
                {item.content != null && (
                    <ReactMarkdown
                        source={contentWithMinimizedImages}
                        escapeHtml={false}
                        className={style.content}
                        renderers={{
                            image: ({ src }) => (
                                <img src={src} loading="lazy" alt="" />
                            ),
                            table: ({ children }) => (
                                <div className={style.table}>
                                    <table>{children}</table>
                                </div>
                            ),
                        }}
                    />
                )}
                <Tags />
            </div>
        )
    }

    return (
        <div className={style.newsDetail}>
            <NewsStructuredData newsItem={newsItem} />
            <Container>
                <div className={style.grid}>
                    {Details(newsItem)}
                    <div className={style.sidebar}>
                        <Search />
                        <AdGlareNew adGlareResponse={adGlare} />
                        <FeaturedPosts featured={featured} />
                    </div>
                </div>
            </Container>
        </div>
    )
}

export default NewsDetail

