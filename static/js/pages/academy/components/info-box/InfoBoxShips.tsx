import React from 'react'
import { Translate } from 'react-localize-redux'
import LanguageType from 'models/language-type'
import SmallIconEnum from '../../models/small-icon-enum'
import IconWithBackground from '../icons/icon-with-background'
import SmallIcons from '../icons/small-icons'
import { TooltipIcon, ShieldIcon, ArmorIcon, HullIcon } from '../icons'

import { ShipInfoModel } from './InfoBoxModel'
import style from './InfoBox.module.scss'

interface InfoProps {
    info: ShipInfoModel
    language: LanguageType
}
export default function InfoBoxShips({
    info,
    language,
}: InfoProps): JSX.Element {
    return (
        <>
            <p className={style.mainHeading}>
                <Translate id="academy.shipInfo" />:
            </p>
            <div className={style.twoColumns}>
                {info.empire && (
                    <>
                        <p className={style.bold}>
                            <Translate id="academy.empire" />:
                        </p>
                        <p className={style.pink}>
                            {info.empire}
                            <IconWithBackground
                                className={style.iconContainerRight}
                            >
                                <SmallIcons
                                    icon={SmallIconEnum[info.empireIcon]}
                                />
                            </IconWithBackground>
                        </p>
                    </>
                )}
                {info.class && (
                    <>
                        <p className={style.bold}>
                            <Translate id="academy.class" />:
                        </p>
                        <p className={style.pink}>{info.class[language]} </p>
                    </>
                )}
                {info.requiredSkills && (
                    <>
                        <p className={style.bold}>
                            <Translate id="academy.requiredSkills" />:
                        </p>
                        <div>
                            {info.requiredSkills.map((item) => (
                                <p key={item.en}>{item[language]}</p>
                            ))}
                        </div>
                    </>
                )}
                {info.totalTrainingTime && (
                    <>
                        <p className={style.orange}>
                            <Translate id="academy.totalTrainingTime" />:
                        </p>
                        <p className={style.orange}>{info.totalTrainingTime}</p>
                    </>
                )}
                {info.damage && (
                    <>
                        <p className={style.bold}>
                            <Translate id="academy.damage" />:
                        </p>
                        <p>
                            {info.damage} <Translate id="academy.dps" />
                            <Translate>
                                {({ translate }) => (
                                    <span
                                        className={style.iconContainerRight}
                                        title={translate(
                                            'academy.damagePerSecond'
                                        ).toString()}
                                    >
                                        <TooltipIcon />
                                    </span>
                                )}
                            </Translate>
                        </p>
                    </>
                )}
                {info.maxSpeed && (
                    <>
                        <p className={style.bold}>
                            <Translate id="academy.maxSpeed" />:
                        </p>
                        <p>{info.maxSpeed} m/sec</p>
                    </>
                )}
                {info.suggestedDrones && (
                    <>
                        <p className={style.bold}>
                            <Translate id="academy.suggestedDrones" />:
                        </p>
                        <div>
                            {info.suggestedDrones.map((item) => (
                                <p key={item.en}>{item[language]}</p>
                            ))}
                        </div>
                    </>
                )}
                <p className={style(style.smallHeading, style.span2)}>
                    <Translate id="academy.healthPoints" />
                </p>
                {info.shield && (
                    <>
                        <p className={style.bold}>
                            <Translate id="academy.shield" />:
                        </p>
                        <p>
                            {info.shield}
                            <IconWithBackground
                                className={style.iconContainerRight}
                            >
                                <ShieldIcon />
                            </IconWithBackground>
                        </p>
                    </>
                )}
                {info.armor && (
                    <>
                        <p className={style.bold}>
                            <Translate id="academy.armor" />:
                        </p>
                        <p>
                            {info.armor}
                            <IconWithBackground
                                className={style.iconContainerRight}
                            >
                                <ArmorIcon />
                            </IconWithBackground>
                        </p>
                    </>
                )}
                {info.hull && (
                    <>
                        <p className={style.bold}>
                            <Translate id="academy.hull" />:
                        </p>
                        <div>
                            <p>
                                {info.hull}{' '}
                                <IconWithBackground
                                    className={style.iconContainerRight}
                                >
                                    <HullIcon />
                                </IconWithBackground>
                            </p>
                        </div>
                    </>
                )}
                {info.shield && info.armor && info.hull && (
                    <>
                        <p className={style.orange}>
                            <Translate id="academy.total" />:
                        </p>
                        <p className={style.orange}>
                            {info.shield + info.armor + info.hull}
                        </p>
                    </>
                )}
                {info.bonuses && (
                    <>
                        <p className={style.smallHeading}>
                            {' '}
                            <Translate id="academy.bonuses" />:
                        </p>
                        {info.bonusesHeadline && (
                            <>
                                <p className={style(style.bold, style.span2)}>
                                    {info.bonusesHeadline[language]}
                                </p>
                            </>
                        )}
                        <ul className={style.span2}>
                            {info.bonuses.map((item) => (
                                <li key={item.en}>{item[language]}</li>
                            ))}
                        </ul>
                    </>
                )}
                {info.roleBonus && (
                    <>
                        <p className={style.smallHeading}>
                            {' '}
                            <Translate id="academy.roleBonus" />:
                        </p>
                        <ul className={style.span2}>
                            {info.roleBonus.map((item) => (
                                <li key={item.en}>{item[language]}</li>
                            ))}
                        </ul>
                    </>
                )}
            </div>
        </>
    )
}
