
import { isClient } from 'config/web'
import { setItem as setCookieItem, removeItem as removeCookieItem } from 'utils/storage'

// Copied mostly from JourneyIdStorage.
export default class LauncherTokenStorage implements Storage {
  storage: Storage

  enableSessionCookie: boolean

  /**
   * Storage can be sessionStorage or localStorage, if not set then window.sessionStorage is used.
   *
   * @param storage
   * @param optional set to true to store value also in session cookie
   */
  constructor(storage?: Storage, enableSessionCookie = false) {
    // console.log('LauncherTokenManager constructor init')
    if (isClient) {
      if (storage) this.storage = storage
      else {
        this.storage = sessionStorage // Default set sessionStorage, can be overwritten, e.g. localStorage or from unit test
      }
      this.enableSessionCookie = enableSessionCookie
    }
  }

  // [name: string]: any

  length: number

  clear(): void {
    this.storage?.clear()
  }

  getItem(key: string): string {
    return this.storage?.getItem(key)
  }

  key(index: number): string {
    return this.storage?.key(index)
  }

  removeItem(key: string): void {
    this.storage?.removeItem(key)
    removeCookieItem(key)
  }

  setItem(key: string, value: string): void {
    this.storage?.setItem(key, value)
    // TODO only use session cookie for all values, no need to use session storage, and we need the jid value accessible in cookie
    setCookieItem(key, value) // Also setting in session cookie, maybe we should just do that from now on if we are using that, no need to do both.
  }
}
