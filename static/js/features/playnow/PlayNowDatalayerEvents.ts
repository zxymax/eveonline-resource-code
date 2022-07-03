import pushEventToDataLayer from 'utils/analytics/datalayer/dataLayerHelper'
import {
    DataLayerEventCategoryType,
    DataLayerEventActionType,
} from 'utils/analytics/datalayer/models/DataLayerEventTypes'

const eventCategory: DataLayerEventCategoryType = 'Interaction'
const eventAction: DataLayerEventActionType = 'Browser Play'

/**
 * Used in navigation item clicks.
 */
export default function pushPlayNowEvent(eventLabel: string): void {
    // console.log('-- Pushing Play Now Event to DataLayer!')
    // console.log(`--- ${eventLabel}`)
    pushEventToDataLayer({
        eventCategory,
        eventAction,
        eventLabel,
    })
}
