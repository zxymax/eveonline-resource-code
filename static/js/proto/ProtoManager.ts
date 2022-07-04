import SettingsModel from 'settings/models/SettingsModel'
import Logger from 'utils/logging'
import { isClient } from 'config/web'
import GetUserId from './helpers/userid'
import sendEvent from './api'
import getAccountCreatedProtoMessage from './mapping/account-created'
import getInstallerDownloadProtoMessage from './mapping/installer-download'
import ProtoEventModel from './models/ProtoEventModel'
import JourneyValuesType from './models/journeyValuesType'
import JourneyValuesManager from './helpers/journeyvalues'
import JourneyIdManager from './helpers/journeyid'
import DownloadInfoType, { PlatformEnum } from './models/downloadInfoType'

// PROTO_EVENT_TRACKING_CODE

export default class ProtoManager {
  static async publishAccountCreatedEvent(
    userId: number,
    settings: SettingsModel
  ): Promise<ProtoEventModel> {
    try {
      // Settings has to come in and have correct values to continue, enabled and prefereably valid gateway url
      if (settings && settings.eventEnabledSignup) {
        // console.log('running publish account created event')

        // These are values stored in session from first visit to the site
        const journeyValuesManager = new JourneyValuesManager(isClient)
        const journeyValues = journeyValuesManager.getJourneyValues() as JourneyValuesType
        // console.log('values: ', values)

        const accountCreated = getAccountCreatedProtoMessage(
          userId,
          journeyValues
        )

        const journeyIdManager = new JourneyIdManager()
        const journeyId = journeyIdManager.getUint8Array()

        // console.log('journey id: ', manager.getJourneyId())

        // Send the event, get the event object back to work with if needed
        const protoEvent = await sendEvent(
          accountCreated.serializeBinary(),
          accountCreated.toObject(),
          'eve_public.app.com.eveonline.www.signup.AccountCreated',
          journeyId,
          settings.urlEventGatewayBaseUrl
        )

        protoEvent.messageObject = accountCreated.toObject()
        protoEvent.messageSerialized = accountCreated.serializeBinary()

        return protoEvent
      }
    } catch (error) {
      Logger.captureException(error, null, {
        category: 'proto',
        functionName: 'ProtoManager.publishAccountCreatedEvent',
      })
    }

    return null
  }

  static async publishInstallerDownloadEvent(
    version: string,
    platform: PlatformEnum,
    operatingSystem: string,
    eventUrl: string,
    eventEnabled: boolean
  ): Promise<ProtoEventModel> {
    // console.log(
    //     'data: ',
    //     version,
    //     platform,
    //     operatingSystem,
    //     eventEnabled,
    //     eventUrl
    // )

    try {
      // Settings has to come in and have correct values to continue, enabled and prefereably valid gateway url
      if (eventEnabled) {
        // console.log('Download event enabled')
        // console.log('eventUrl: ', eventUrl)

        const journeyValuesManager = new JourneyValuesManager(isClient)
        const journeyValues = journeyValuesManager.getJourneyValues() as JourneyValuesType

        const downloadValues: DownloadInfoType = {
          version,
          platform,
          operatingSystem,
        }

        const userId = GetUserId()
        // console.log('the user id gotten is: ', userId)

        const installerDownloadMessage = getInstallerDownloadProtoMessage(
          userId,
          journeyValues,
          downloadValues
        )

        // console.log(
        //     'installerDownloadMessage: ',
        //     installerDownloadMessage
        // )

        const manager = new JourneyIdManager()
        const journeyId = manager.getUint8Array()

        // Not send the actual event yet, but eventually
        const protoEvent = await sendEvent(
          installerDownloadMessage.serializeBinary(),
          installerDownloadMessage.toObject(),
          'eve_public.app.com.eveonline.www.download.InstallerDownloadStarted',
          journeyId,
          // applicationInstanceId TODO
          eventUrl
        )

        protoEvent.messageObject = installerDownloadMessage.toObject()
        protoEvent.messageSerialized = installerDownloadMessage.serializeBinary()

        return protoEvent
      }
    } catch (error) {
      Logger.captureException(error, null, {
        category: 'proto',
        functionName: 'ProtoManager.publishInstallerDownloadEvent',
      })
    }

    return null
  }
}

