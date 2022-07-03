import React from 'react'
import { Link } from 'features'
import { SvgIcon, Frame, Container, Section } from 'layouts'
import AssetByIdQuery from 'queries/AssetByIdQuery'
import BackgroundImage from 'features/background-image'
import style from './PlayNowContainer.module.scss'

interface Props {
    children: JSX.Element
}

export default function PlayNowContainer({ children }: Props): JSX.Element {
    const EveLogo = (): JSX.Element => (
        <Link className={style.logo}>
            <SvgIcon width={130} name="eve-logo-with-text" fill="#fff" />
        </Link>
    )

    return (
        <AssetByIdQuery id="1TGSAWwH9OYVQ2k9a1ItSs">
            {(url: string) => {
                return (
                    <BackgroundImage
                        url={url}
                        repeat="no-repeat"
                        size="cover"
                        position="center top"
                        className={style.hero}
                        lazy={false}
                    >
                        <div className={style.verify}>
                            <EveLogo />
                            <Container>
                                <Section hasContent className={style.content}>
                                    <Frame className={style.container}>
                                        <div className={style.text}>
                                            {children}
                                        </div>
                                    </Frame>
                                </Section>
                            </Container>
                        </div>
                    </BackgroundImage>
                )
            }}
        </AssetByIdQuery>
    )
}
