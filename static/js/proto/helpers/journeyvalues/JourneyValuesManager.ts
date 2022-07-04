import Logger from 'utils/logging'
// import { isClient } from 'config/web'
import getLocale from 'utils/locale'
import getWindowPropertyValue from 'utils/window'
import { ClickIdType, UtmType } from 'proto/models'
// import { getValues, setValues } from './JourneyValuesStorage'
// import ClickIdType from './models/clickIdType'
// import UtmType from './models/utmType'
// import PageInfoType from './models/pageInfoType'
import JourneyValuesType from 'proto/models/journeyValuesType'

export const JOURNEY_VALUES_STORAGE_KEY = 'frstvst'

/**
 * Handles processing and storing user journey values
 */
export default class JourneyValuesManager {
  storage: Storage

  isClient: boolean

  constructor(isClient: boolean, storage?: Storage) {
    if (storage) this.storage = storage
    else {
      this.storage = isClient && sessionStorage
    }
    this.isClient = isClient
  }

  private setJourneyValues = (values: unknown): void => {
    // PROTO_EVENT_TRACKING_CODE
    if (this.isClient) {
      this.storage?.setItem(
        JOURNEY_VALUES_STORAGE_KEY,
        JSON.stringify(values)
      )
    }
  }

  /**
   *
   * @returns the journey values from storage, if not in browser, isClient= false, then returns empty json {}
   */
  public getJourneyValues = (): JourneyValuesType => {
    // PROTO_EVENT_TRACKING_CODE
    if (this.isClient) {
      const journeyValues: JourneyValuesType = JSON.parse(
        this.storage?.getItem(JOURNEY_VALUES_STORAGE_KEY)
      )

      // Also getting values when asking for them
      if (journeyValues) {
        journeyValues.locale = getLocale()
        journeyValues.gaClientId = getWindowPropertyValue('gaClientId')
      }

      return journeyValues
    }
    return {} // Returns empty json array when not in browser
  }

  /** * Local function only used here for now */
  private getReferrerDomain(): string {
    if (this.isClient) {
      try {
        const a = document.createElement('a')
        a.href = document.referrer
        const referrerDomain = a.hostname
        return referrerDomain
      } catch (e) {
        // It's fine, just returning nothing
      }
    }
    return ''
  }

  private static parseUtmQueryParameters(query: UtmType): UtmType {
    let parsedUtm: UtmType
    if (query) {
      const {
        utm_source: utmSource,
        utm_medium: utmMedium,
        utm_campaign: utmCampaign,
        utm_term: utmTerm,
        utm_content: utmContent,
      } = query
      parsedUtm = {
        utm_source: utmSource,
        utm_medium: utmMedium,
        utm_campaign: utmCampaign,
        utm_term: utmTerm,
        utm_content: utmContent,
      }
    }
    return parsedUtm
  }

  private static parseClickIdQueryParameters(
    query: ClickIdType
  ): ClickIdType {
    let parsesClickIds: ClickIdType
    if (query) {
      const { gclid, yclid, fbclid } = query
      parsesClickIds = {
        fbclid,
        yclid,
        gclid,
      }
    }
    return parsesClickIds
  }

  // NOT USED
  // private static parsePageInfoValues(values: PageInfoType): PageInfoType {
  //     let parsedValues: PageInfoType
  //     if (values) {
  //         const { landingPage, referrerDomain } = values
  //         parsedValues = {
  //             landingPage,
  //             referrerDomain,
  //         }
  //     }
  //     return parsedValues
  // }

  // eslint-disable-next-line
  public processFirstPageVisit(landingPage: string, query: unknown): void {
    try {
      // Only in browser, this writes to browser session
      if (this.isClient) {
        // If there are values in session then user has already visited the site in this browser session and we don't override it.
        if (!this.getJourneyValues()) {
          const clickIdValues = JourneyValuesManager.parseClickIdQueryParameters(
            query
          )
          const utmValues = JourneyValuesManager.parseUtmQueryParameters(
            query
          )
          const referrerDomain = this.getReferrerDomain()

          // TODO get window.gaCLientId here instead

          const values = {
            landingPage,
            referrerDomain,
            ...clickIdValues,
            ...utmValues,
          }
          this.setJourneyValues(values)
        } else {
          // already has some values, so user has already come to the page in this session.
        }
      }
    } catch (error) {
      Logger.captureException(error, null, {
        category: 'events',
        functionName: 'StoredValuesProcessor.processFirstPageVisit',
        message: error,
      })
    }
  }
}
