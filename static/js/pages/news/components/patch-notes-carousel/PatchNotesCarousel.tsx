import React from 'react'
import ReactMarkdown from 'react-markdown'
import { useSelector } from 'react-redux'
import { getLanguage } from 'selectors'
import getConfig from 'config/web'
import SectionType from 'models/types/ts/sectionType'
import ContentType from 'models/types/ts/contentType'
import { Container, Heading } from 'layouts'
import CarouselProgress from 'layouts/carousel/CarouselProgress'
import { ParagraphRegular, HeadingXSmall, LabelSmall } from 'layouts/typography'
import { ImageLazyLoad } from 'features'
import LinkArrow from 'layouts/link-arrow'
import Icons from 'pages/academy/components/icons'
import IconTypeEnum from 'pages/academy/models/icon-type-enum'
import s from './PatchNotes.module.scss'

interface Props {
    section: SectionType
}

interface MdProps {
    children: string | undefined
}

const { webBaseUrl } = getConfig()

const PatchNotes = ({ section }: Props): JSX.Element => {
    const language = useSelector((state) => getLanguage(state))

    const getIcon = (iconString: string): JSX.Element => {
        let icon

        switch (iconString.toLowerCase()) {
            case 'modules':
                icon = IconTypeEnum.ActivitiesIcon
                break
            case 'technical':
                icon = IconTypeEnum.ActivitiesIcon
                break
            case 'user-interface':
                icon = IconTypeEnum.HomeIcon
                break
            case 'science-and-industry':
                icon = IconTypeEnum.CareersIndustrialistIcon
                break
            case 'events':
                icon = IconTypeEnum.Careers
                break
            case 'ships':
                icon = IconTypeEnum.Ships
                break
            case 'text':
                icon = IconTypeEnum.TextIcon
                break
            default:
                break
        }

        return <Icons icon={icon} />
    }

    const getLink = (slug: string): string => {
        let langPrefix = ''
        if (language !== 'en') langPrefix = `/${language}`

        return `${webBaseUrl}${langPrefix}/${slug}`
    }

    return (
        <Container>
            <div className={s.patchNotes}>
                {section.headline && (
                    <Heading size="small">{section.headline}</Heading>
                )}
                <CarouselProgress>
                    {section.contentCollection.items.map(
                        (item: ContentType) => {
                            const jsonContent = item?.data as {
                                icon: string
                            }

                            return (
                                <div key={item.name} className={s.carousel}>
                                    <div className={s.inner}>
                                        <div className={s.img}>
                                            <ImageLazyLoad
                                                image={item?.imageFile}
                                                param="?w=950&h=539&fm=jpg&fl=progressive&q=90&fit=fill"
                                                lazyloadProps={{
                                                    height: 230,
                                                    offset: 200,
                                                    once: true,
                                                }}
                                            />
                                            {jsonContent?.icon && (
                                                <div className={s.icon}>
                                                    {getIcon(jsonContent.icon)}
                                                </div>
                                            )}
                                        </div>

                                        <div
                                            className={s.text}
                                            key={item.headline}
                                        >
                                            {item.headline && (
                                                <LabelSmall className={s.tag}>
                                                    {item.headline}
                                                </LabelSmall>
                                            )}
                                            {item.body && (
                                                <ReactMarkdown
                                                    source={item.body}
                                                    renderers={{
                                                        heading: ({
                                                            children,
                                                        }: MdProps) => (
                                                            <HeadingXSmall
                                                                className={
                                                                    s.heading
                                                                }
                                                                fontWeight={400}
                                                                textTransform="unset"
                                                            >
                                                                {children}
                                                            </HeadingXSmall>
                                                        ),
                                                        paragraph: ({
                                                            children,
                                                        }) => (
                                                            <ParagraphRegular>
                                                                {children}
                                                            </ParagraphRegular>
                                                        ),
                                                    }}
                                                />
                                            )}
                                            {item.buttonUrl && (
                                                <a
                                                    className={s.link}
                                                    lang={language}
                                                    href={getLink(
                                                        item.buttonUrl
                                                    )}
                                                >
                                                    <LabelSmall>
                                                        {item.buttonText}
                                                    </LabelSmall>
                                                    <LinkArrow />
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            )
                        }
                    )}
                </CarouselProgress>
            </div>
        </Container>
    )
}

export default PatchNotes

