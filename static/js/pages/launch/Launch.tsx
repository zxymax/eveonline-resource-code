import React, { useEffect } from 'react'
import { isClient } from 'config/web'
import AssetByIdQuery from 'queries/AssetByIdQuery'
import SectionType from 'models/types/ts/sectionType'
import BackgroundImage from 'features/background-image'
import DownloadButton from 'features/DownloadButton'
import { HeadingXSmall } from 'layouts/typography'
import { Frame, Container, Button } from 'layouts'
import style from './Launch.module.scss'

interface Props {
    content: SectionType
}

const Launch = ({ content }: Props): JSX.Element => {
    const { headline, body, buttonText, buttonUrl } = content

    const openLauncher = (): void => {
        if (isClient) {
            window.location.href = buttonUrl || 'eveonline://start'
        }
    }

    useEffect(() => {
        openLauncher()
    }, [])

    return (
        <AssetByIdQuery id="1TGSAWwH9OYVQ2k9a1ItSs">
            {(url: string) => {
                return (
                    <BackgroundImage
                        url={url}
                        className={style.launch}
                        lazy={false}
                        size="cover"
                        repeat="no-repeat"
                    >
                        <Container>
                            <Frame className={style.content}>
                                {headline && (
                                    <HeadingXSmall className={style.heading}>
                                        {headline}
                                    </HeadingXSmall>
                                )}
                                {body && <p>{body}</p>}
                                <div className={style.buttons}>
                                    {buttonText && (
                                        <Button
                                            onClick={() => openLauncher()}
                                            theme="quadrant"
                                            size="large"
                                        >
                                            {buttonText}
                                        </Button>
                                    )}
                                    <DownloadButton transparent small />
                                </div>
                            </Frame>
                        </Container>
                    </BackgroundImage>
                )
            }}
        </AssetByIdQuery>
    )
}

export default Launch
