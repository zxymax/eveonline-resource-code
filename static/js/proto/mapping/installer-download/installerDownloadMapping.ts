import { InstallerDownloadStarted } from 'proto/generated/eve_public/app/com/eveonline/www/download_pb'
import { Identifier } from 'proto/generated/eve_public/user/user_pb'
import JourneyValuesType from 'proto/models/journeyValuesType'
import getContextProtoMessage from 'proto/mapping/context'
import { UtmType, ClickIdType, PageInfoType } from 'proto/models'
import DownloadInfoType, { PlatformEnum } from 'proto/models/downloadInfoType'

export default function getInstallerDownloadProtoMessage(
  userId: number,
  journeyValues: JourneyValuesType,
  downloadValues: DownloadInfoType
): InstallerDownloadStarted {
  const context = getContextProtoMessage(
    journeyValues as UtmType,
    journeyValues as ClickIdType,
    journeyValues as PageInfoType
  )

  // Generate AccountCreated message and populate
  const installerDownload = new InstallerDownloadStarted()
  installerDownload.setContext(context)

  installerDownload.setVersion(downloadValues.version)

  if (downloadValues.platform === PlatformEnum.windows)
    installerDownload.setPlatform('windows')
  else if (downloadValues.platform === PlatformEnum.mac) {
    installerDownload.setPlatform('mac')
  }
  installerDownload.setOperatingSystem(downloadValues.operatingSystem)

  // only setUser if userId is set
  if (userId) {
    const identifier = new Identifier()
    identifier.setSequential(userId)
    installerDownload.setUser(identifier)
  }

  return installerDownload
}

