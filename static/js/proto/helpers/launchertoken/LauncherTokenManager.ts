import { isClient } from 'config/web'
import LauncherTokenStorage from './storage'

export const LAUNCHER_TOKEN_STORAGE_KEY = 'lt'

const BASE62_REGEX = /^([A-Za-z0-9]+)$/


export default class LauncherTokenManager {
  storage: Storage
  // launcherTokenStorage: LauncherTokenStorage

  /**
   * Storage can be sessionStorage or localStorage, if not set then window.sessionStorage is used.
   * @param storage
   */
  constructor(customStorage?: Storage) {
    // console.log('LauncherTokenManager constructor init')
    if (isClient) {
      if (customStorage)
        this.storage = new LauncherTokenStorage(customStorage)
      else {
        this.storage = new LauncherTokenStorage(sessionStorage) // Default set sessionStorage, can be overwritten, e.g. localStorage or from unit test
      }
    }
  }

  /**
   * Can be used to validate that data looks like base62 encoded data
   * @param data the base62 data to validate
   * @returns true if data matches a base62 regex
   */
  public static validateBase62(data: string): boolean {
    return !!data.match(BASE62_REGEX)
  }

  /**
   * Can be used to validate that data looks like base62 encoded data
   * with extra restrictions to match the launcher token length
   * @param data the base62 data to validate
   * @returns true if data matches a base62 regex
   */
  public static validateLauncherBase62(data: string): boolean {
    return this.validateBase62(data) && !!data.match(BASE62_REGEX)
  }

  /**
   * Returns a launcher token if set, otherwise null
   * @returns a launcher token
   */
  public getLauncherToken(): string | null {
    // if journey id exists, return it
    const storedToken = this.storage?.getItem(LAUNCHER_TOKEN_STORAGE_KEY)
    if (storedToken) return storedToken
    return null
  }

  /**
   * Journey Id can be set externally if it needs to be passed on to web events
   * @param value The journey id to set and store
   * @returns true if journey id was set and is valid, false otherwise
   */
  public setLauncherToken(value: string): boolean {
    // Verify journey id here
    const valid = LauncherTokenManager.validateLauncherBase62(value)

    // Store journey id and
    if (valid) {
      this.storage?.setItem(LAUNCHER_TOKEN_STORAGE_KEY, value)
      return true
    }

    // Returns false if not valid
    return false
  }

  /**
   * Check if a journey id exists in storage.
   * @returns true if journey id exists in storage, else false
   */
  public hasLauncherToken(): boolean {
    return !!this.storage?.getItem(LAUNCHER_TOKEN_STORAGE_KEY)
  }

  /**
   * Removes the journey id from storage
   */
  public clearLauncherToken(): void {
    this.storage?.removeItem(LAUNCHER_TOKEN_STORAGE_KEY)
  }
}
