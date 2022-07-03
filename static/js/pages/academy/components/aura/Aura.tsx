import React from 'react'
import SectionType from 'models/types/ts/sectionType'
import { FeatureVideo, ImageLazyLoad } from 'features'
import IconTypeEnum from 'pages/academy/models/icon-type-enum'
import IconColorEnum from 'pages/academy/models/icon-color-enum'

import { HeadingUnderline2 } from 'layouts/headings'
import style from './Aura.module.scss'
import Markdown from '../markdown'
import Icons, { AuraIcon } from '../icons'

interface Props {
    section: SectionType
}

const Aura = ({ section }: Props): JSX.Element => {
    const { headline, body, imageFile, image, videoId, buttonText } = section

    // const currentShipEnum = shipClasses.filter((id) => id.id === image)[0].icon
    function getCurrentShipIcon(imageIcon: string): JSX.Element {
        let iconEnum

        if (imageIcon) {
            switch (imageIcon) {
                case 'destroyer': {
                    iconEnum = IconTypeEnum.ShipsDestroyersIcon
                    break
                }
                case 'frigate': {
                    iconEnum = IconTypeEnum.ShipsFrigatesIcon
                    break
                }
                case 'mining': {
                    iconEnum = IconTypeEnum.ShipsMiningShipsIcon
                    break
                }
                default: {
                    iconEnum = IconTypeEnum.AuraIcon
                    break
                }
            }
        }

        return <Icons icon={iconEnum} color={IconColorEnum.GrayColor} />
    }

    return (
        <div className={style.aura}>
            <div className={style.content}>
                <div className={style.text}>
                    {image ? <>{getCurrentShipIcon(image)}</> : <AuraIcon />}

                    <HeadingUnderline2
                        title={headline}
                        subTitle=""
                        color="#BA1F7E"
                    />
                    {body && <Markdown content={body} />}
                    {videoId && buttonText && (
                        <FeatureVideo
                            videoId={videoId}
                            subTitle=""
                            isButton
                            isHexagonButton
                            title={buttonText}
                            className={style.btn}
                        />
                    )}
                </div>
                <div className={style.image}>
                    {imageFile && (
                        <ImageLazyLoad
                            image={imageFile}
                            param="?w=630&h=550&fm=jpg&fl=progressive&q=80&fit=fill"
                            lazyloadProps={{
                                height: 550,
                                offset: 100,
                                once: true,
                            }}
                        />
                    )}
                </div>
            </div>
        </div>
    )
}

export default Aura
