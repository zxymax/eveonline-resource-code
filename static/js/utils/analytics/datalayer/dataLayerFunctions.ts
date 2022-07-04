import { DataLayerEventActionType } from './models/DataLayerEventTypes'
import pushEventToDataLayer from './dataLayerHelper'

/**
 * Used in navigation item clicks.
 */
export function pushNavigationClickEventToDataLayer(dataId: string): void {
  pushEventToDataLayer({
    eventCategory: 'Interaction',
    eventAction: 'Nav click',
    eventLabel: `Nav clicked: ${dataId}`,
  })
}

/**
 * Used in client download interactions.
 * Allowed values for eventAction are Windows or Mac OS
 */
export function pushClientDownloadEventToDataLayer(
  eventAction: DataLayerEventActionType,
  eventLabel: string
): void {
  pushEventToDataLayer({
    eventCategory: 'EVE Client Download',
    eventAction,
    eventLabel,
  })
}

/**
 * Used in signup mailcheck click
 */
export function pushMailcheckSuggestionToDataLayer(): void {
  pushEventToDataLayer({
    eventCategory: 'Interaction',
    eventAction: 'Mailcheck suggestion click',
    eventLabel: 'Mailcheck suggestion clicked',
  })
}

/**
 * Used for button click tracking
 */
export function pushClickEventToDataLayer(
  eventAction: DataLayerEventActionType,
  eventLabel: string
): void {
  pushEventToDataLayer({
    eventCategory: 'Interaction',
    eventAction,
    eventLabel: `Button clicked: ${eventLabel}`,
  })
}

export function pushSocialShareEventToDataLayer(eventLabel: string): void {
  pushEventToDataLayer({
    eventCategory: 'Interaction',
    eventAction: 'Social share',
    eventLabel: `Social shared: ${eventLabel}`,
  })
}

