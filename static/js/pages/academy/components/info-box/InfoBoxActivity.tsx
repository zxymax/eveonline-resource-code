import React from 'react'
import { Translate } from 'react-localize-redux'
import ReactTooltip from 'react-tooltip'
import { Link } from 'features'
import getUrlWithLangPrefix from 'pages/academy/helpers/getUrlWithLangPrefix'
import LanguageType from 'models/language-type'
import SmallIconEnum from '../../models/small-icon-enum'
import MilestoneIconEnum from '../../models/milestone-icon-enum'
import SmallIcons from '../icons/small-icons'
import MilestoneIcons from '../icons/milestone-icons'
import IconWithBackground from '../icons/icon-with-background'
import { ActivityInfoModel } from './InfoBoxModel'
import style from './InfoBox.module.scss'

interface Props {
    info: ActivityInfoModel
    language: LanguageType
    page: string
}
// TODO add loc for strings inside here in json file to be sent to LOC or it is ready already

export default function ActivityInfo({
    info,
    language,
    page,
}: Props): JSX.Element {
    if (!info) return <></>

    return (
        <>
            <p className={style.mainHeading}>
                <Translate id="academy.keyInfo" />:
            </p>
            <div className={style(style.twoColumns, style.even)}>
                {info.trainingTime && (
                    <>
                        <p className={style.bold}>
                            <Translate id="academy.trainingTime" />:
                        </p>
                        <p className={style.pink}>{info.trainingTime}</p>
                    </>
                )}
                {info.skillPointsNeeded && (
                    <>
                        <p className={style.bold}>
                            <Translate id="academy.skillPoints" />:
                        </p>
                        <p className={style.pink}>{info.skillPointsNeeded}</p>
                    </>
                )}
            </div>
            {info.recommendedShips && (
                <>
                    <p className={style(style.smallHeading, style.span2)}>
                        <Translate id="academy.recommendedShips" />:
                    </p>
                    <div className={style(style.twoColumns, style.even)}>
                        {info.recommendedShips.map((item) => (
                            <Link
                                key={item.name}
                                url={getUrlWithLangPrefix(
                                    language,
                                    page,
                                    item.url
                                )}
                                className={style.link}
                            >
                                <p key={item.name} className={style.bold}>
                                    <IconWithBackground
                                        className={style.iconContainer}
                                    >
                                        <SmallIcons
                                            icon={SmallIconEnum[item.icon]}
                                        />
                                    </IconWithBackground>
                                    {item.name}
                                </p>
                            </Link>
                        ))}
                    </div>
                </>
            )}
            {info.milestoneUnlocks && (
                <>
                    <p className={style(style.smallHeading, style.span2)}>
                        <Translate id="academy.milestoneUnlocks" />:
                    </p>
                    <div className={style.inline}>
                        {info.milestoneUnlocks.map((item) => (
                            <p key={item.name} data-tip={item.name}>
                                <IconWithBackground
                                    className={style.iconContainer}
                                >
                                    <MilestoneIcons
                                        icon={MilestoneIconEnum[item.icon]}
                                    />
                                </IconWithBackground>
                            </p>
                        ))}
                        <ReactTooltip type="light" />
                    </div>
                </>
            )}
        </>
    )
}
