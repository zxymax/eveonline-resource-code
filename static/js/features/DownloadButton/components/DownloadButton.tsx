import React, { Component } from 'react'
import Platform from 'platform'
import localize from 'shared/localize'
import { isClient } from 'config/web'
import ProtoManager from 'proto'
import JourneyIdManager from 'proto/helpers/journeyid'
import { pushClientDownloadEventToDataLayer } from 'utils/analytics/datalayer/dataLayerFunctions'
import { Icon, Section } from 'layouts'
import { DataLayerEventActionType } from 'utils/analytics/datalayer/models/DataLayerEventTypes'
import { PlatformEnum } from 'proto/models/downloadInfoType'
import LanguageType from 'models/language-type'
import { fetchVersionIfNeeded } from '../actions'
import style from './DownloadButton.module.scss'

export interface Props {
    dispatch?: (func: unknown) => void
    hasContent?: boolean
    small?: boolean
    versions?: {
        win: string
        mac: string
    }
    language?: LanguageType
    installerDownloadUrl?: string
    downloadEventEnabled?: boolean
    eventGatewayUrl?: string
    transparent?: boolean
    hideSecondaryPlatform?: boolean
    platform?: string // PROP NOT USED IN COMPONENT
    urlPrefix?: string // PROP NOT USED IN COMPONENT
}

class DownloadButton extends Component<Props> {
    componentDidMount = (): void => {
        this.props.dispatch(fetchVersionIfNeeded)
    }

    dataLayerPush = (platform: unknown, filename: string): void => {
        if (isClient) {
            let eventAction: DataLayerEventActionType
            let eventLabel: string

            if (platform === 'windows') {
                eventAction = 'Windows'
                eventLabel = 'EVE client Windows download'
            } else {
                eventAction = 'Mac OS'
                eventLabel = 'EVE client Mac download'
            }

            // Append filename to event label
            eventLabel = `${eventLabel} - ${filename}`

            pushClientDownloadEventToDataLayer(eventAction, eventLabel)
        }
    }

    downloadClicked(platform: unknown, filename: string, version: string): void{
        // We have to make sure there is a journey id in session cookie
        // This is an unused variable but might add a new void function that just makes sure that jid is in session cookie
        const jidManager = new JourneyIdManager()
        jidManager.getJourneyId()


        ProtoManager.publishInstallerDownloadEvent(
            version,
            platform as PlatformEnum,
            Platform.os.family,
            this.props.eventGatewayUrl,
            this.props.downloadEventEnabled
        )

        this.dataLayerPush(platform, filename)
    }

    renderButtons = (): JSX.Element => {
        const {
            versions,
            small,
            transparent = false,
            hideSecondaryPlatform = false,
        } = this.props
        if (!this.props.hasContent) {
            return <></>
        }

        const family = Platform.os.family

        const isWin = family.includes('Windows')

        const primaryVersionAndExtension = isWin
            ? `${versions.win}.exe`
            : `${versions.mac}.dmg`
        const secondaryVersionAndExtension = isWin
            ? `${versions.mac}.dmg`
            : `${versions.win}.exe`

        // This comes here from new settings, can be set in contentful
        const path = this.props.installerDownloadUrl

        const primaryLink = path + primaryVersionAndExtension
        const secondaryLink = path + secondaryVersionAndExtension

        const primaryPlatformIcon = isWin ? 'windows' : 'apple'
        const secondaryPlatformIcon = isWin ? 'apple' : 'windows'

        const primaryPlatformText = isWin
            ? localize[this.props.language].forWindows
            : localize[this.props.language].forMac

        const secondaryPlatformText = isWin
            ? localize[this.props.language].downloadMacClient
            : localize[this.props.language].downloadWindowsClient

        return (
            <>
                <div className={style.btnWrapper}>
                    <a
                        className={style(style.primaryBtn, {
                            [style.transparent]: transparent,
                            [style.small]: small,
                        })}
                        href={primaryLink}
                        onClick={() =>
                            this.downloadClicked(
                                primaryPlatformIcon,
                                primaryVersionAndExtension,
                                primaryPlatformIcon === 'windows'
                                    ? versions.win
                                    : versions.mac
                            )
                        }
                    >
                        <div className={style.dArrow}>
                            <Icon name="download" />
                        </div>
                        {localize[this.props.language].download}
                        <span className={style.platform}>
                            <Icon brand name={primaryPlatformIcon} />
                            {primaryPlatformText}
                        </span>
                    </a>
                    {!hideSecondaryPlatform && (
                        <a
                            className={style.secondary}
                            href={secondaryLink}
                            onClick={() =>
                                this.downloadClicked(
                                    secondaryPlatformIcon,
                                    secondaryVersionAndExtension,
                                    primaryPlatformIcon === 'windows'
                                        ? versions.win
                                        : versions.mac
                                )
                            }
                        >
                            <Icon brand name={secondaryPlatformIcon} />
                            {secondaryPlatformText}
                        </a>
                    )}
                </div>
            </>
        )
    }

    render(): JSX.Element {
        const { hasContent } = this.props
        return (
            <Section hasContent={hasContent} loadingTypeSmall>
                {this.renderButtons()}
            </Section>
        )
    }
}

export default DownloadButton
