import React from 'react'
import ReactTooltip from 'react-tooltip'
import { ParagraphRegular } from 'layouts/typography'
import {
    HighSlotIcon,
    MidSlotIcon,
    LowSlotIcon,
    RigsSlotIcon,
    CargoSlotIcon,
    DroneSlotIcon,
} from './SlotsIcons'

import IconWithBackground from '../icons/icon-with-background'
import CopyToClipboard from '../copy-to-clipboard'
import style from './fits.module.scss'

import { SlotModel, FitsModel, FitModel } from './FitsModel'

interface FitsProps {
    title: string
    image: string
    body: string
    fits: FitsModel
}

function getSlotIcon(slotName: string): JSX.Element {
    if (slotName) {
        switch (slotName) {
            case 'high': {
                return HighSlotIcon()
            }
            case 'mid': {
                return MidSlotIcon()
            }
            case 'low': {
                return LowSlotIcon()
            }
            case 'rigs': {
                return RigsSlotIcon()
            }
            case 'cargo': {
                return CargoSlotIcon()
            }
            case 'drone': {
                return DroneSlotIcon()
            }
            default: {
                return <></>
            }
        }
    }
}

export default function FitsInfo({
    title,
    image,
    body,
    fits,
}: FitsProps): JSX.Element {
    if (!fits) return <></>

    return (
        <div className={style.fits}>
            <div className={style.info}>
                {/* <h3>{fits.fitName}</h3> */}
                <div className={style.infoBox}>
                    <ParagraphRegular>{fits.info.description}</ParagraphRegular>
                    {/* <dl>
                        <div>
                            <dt>DPS:</dt>
                            <dd>{fits.info.dps}</dd>
                        </div>
                        <div>
                            <dt>EHP:</dt>
                            <dd>{fits.info.ehp}</dd>
                        </div>
                        <div>
                            <dt>Repair HP/s:</dt>
                            <dd>{fits.info.repairhp}</dd>
                        </div>
                        <div>
                            <dt>Speed:</dt>
                            <dd>{fits.info.speed}</dd>
                        </div>
                    </dl> */}
                </div>
                <div className={style.slotList}>
                    {fits.slots &&
                        fits.slots.map((item: SlotModel) => (
                            <div className={style.singleSlot} key={item.name}>
                                <div className={style.title}>
                                    <IconWithBackground
                                        className={style.iconContainer}
                                    >
                                        {getSlotIcon(item.type)}
                                    </IconWithBackground>
                                    {item.name}
                                </div>
                                <div className={style.item}>
                                    {item.fitList.map((fit: FitModel) => (
                                        <div
                                            className={style.fit}
                                            key={fit.name}
                                        >
                                            <img
                                                src={`https://imageserver.eveonline.com/Type/${fit.typeId}_64.png`}
                                                alt={fit.name}
                                                // title={fit.name}
                                                data-tip=""
                                                data-for={`slotTooltip${fit.typeId}`}
                                            />
                                            <ReactTooltip
                                                type="light"
                                                effect="solid"
                                                aria-haspopup="true"
                                                id={`slotTooltip${fit.typeId}`}
                                            >
                                                {fit.name}
                                            </ReactTooltip>
                                            <div className={style.amount}>
                                                {' '}
                                                x {fit.amount}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                </div>
            </div>
            <div className={style.img}>
                {image && <img src={image} alt={title} />}
                <div className={style.buttons}>
                    <CopyToClipboard copyText={body} />
                </div>
            </div>
        </div>
    )
}
