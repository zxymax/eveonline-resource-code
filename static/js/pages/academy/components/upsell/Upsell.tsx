import React from 'react'
import LazyLoad from 'react-lazyload'
import SectionType from 'models/types/ts/sectionType'
import ReactMarkdown from 'react-markdown'
import classNames from 'classnames'
import { HeadingUnderline2 } from 'layouts/headings'
import { Container, Button } from 'layouts'
import { ParagraphLarge, HeadingXSmall } from 'layouts/typography'
import style from './Upsell.module.scss'

interface Props {
    section: SectionType
    // align: 'left' | 'right'
}

export default function Upsell({ section }: Props): JSX.Element {
    // Return early if nothing to do
    if (!section) return <></>

    // Todo
    // Left / right variant, enumerator maybe?
    // Image tweaks
    // Markdown content with button, maybe button not part of content?

    const bgImage = {
        backgroundImage: `url(${section?.imageFile?.url}?w=1290&fm=webp)`,
    }

    const cx = classNames.bind(style)
    const upsellClass = cx(style.upsell, {
        [style.left]: section.teaser === 'left',
    })

    // const upsellClass2 = cx(style.upsell, style.left)

    return (
        <LazyLoad height={750} offset={200} once>
            <div className={upsellClass} style={bgImage}>
                <Container>
                    <div className={style.inner}>
                        <div className={style.card}>
                            <HeadingUnderline2 title={section?.headline} />
                            <ReactMarkdown
                                source={section?.body}
                                renderers={{
                                    paragraph: ({ children }) => (
                                        <ParagraphLarge>
                                            {children}
                                        </ParagraphLarge>
                                    ),
                                    strong: ({ children }) => (
                                        <HeadingXSmall>
                                            {children}
                                        </HeadingXSmall>
                                    ),
                                }}
                            />
                            {section?.buttonUrl && section?.buttonText && (
                                <Button
                                    className={style.btn}
                                    path={section?.buttonUrl}
                                    theme="academy"
                                    size="small"
                                >
                                    {section?.buttonText}
                                </Button>
                            )}
                        </div>
                    </div>
                </Container>
            </div>
        </LazyLoad>
    )
}
