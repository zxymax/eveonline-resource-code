import { UAParser } from 'ua-parser-js'

const OS_WINDOWS = 'Windows'
const OS_MAC = 'Mac OS'
// const OS_CHROMIUM = 'Chromium OS'

export default class PlatformHelper {
  ua: UAParser

  constructor() {
    this.ua = new UAParser() // eslint-disable-line
  }

  setUA(uastring: string): void {
    this.ua.setUA(uastring)
  }

  getUA(): string {
    return this.ua.getUA()
  }

  getOSName(): string {
    return this.ua.getOS().name
  }

  isWindowsOrMac(): boolean {
    const os = this.ua.getOS().name
    return os === OS_WINDOWS || os === OS_MAC
  }

  isWindows(): boolean {
    return this.ua.getOS().name === OS_WINDOWS
  }

  isMac(): boolean {
    return this.ua.getOS().name === OS_MAC
  }
}

