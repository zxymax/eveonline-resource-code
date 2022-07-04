import { isClient } from 'config/web'
import dataLayerEventModel from './models/DataLayerEventModel'

// Todo get rid of this error
// declare global {
//     interface Window {
//         dataLayer: any
//     }
// }

/**
 *
 * @param event The dataLayerEvent you want to add.
 */
export default function pushEventToDataLayer(event: dataLayerEventModel): void {
  if (isClient) {
    window.dataLayer = window.dataLayer || []
    window.dataLayer.push({ event: 'Interaction', ...event }) // Always have event: Interaction, it triggers GA/GTM to pick up the rest of the properties
  }
}

