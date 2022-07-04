/**
 * This contains other information that is needed for signup account created event.
 */
export default interface DownloadInfoType {
  version?: string
  platform?: PlatformEnum
  operatingSystem?: string
}

export enum PlatformEnum {
  windows,
  mac,
}
