import TagManager from 'react-gtm-module'
import { isClient } from 'config/web'


// Handles direct interaction with the datalayer
class DataLayer {
    static PushVariable(key, value) {
        const dict = {}
        dict[key] = value

        if (isClient) {
            window.dataLayer = window.dataLayer || []
            window.dataLayer.push(dict)
        }
    }

    // Adds parameter to the vritual path
    static AppendVirtualPath(parameter) {
        const datalayer = window.dataLayer
        const path = datalayer.filter((x) => x.virtualPath)

        if (isClient) {
            window.dataLayer = window.dataLayer || []
            window.dataLayer.push({
                virtualPath: `${path[0].virtualPath}&${parameter}`,
            })
        }
    }

    // Pushes a single event to the DataLayer
    // Example:
    // eventObject:
    // event: 'Interaction',
    // eventCategory: 'EVE Client Download',
    // eventAction: 'Mac OS',
    // eventLabel: 'EVE client Mac download',
    static PushEventObjectToDataLayer = (eventObject) => {
        if (isClient) {
            window.dataLayer = window.dataLayer || []
            window.dataLayer.push(eventObject)
        }
    }

    // Pushes a single event to the DataLayer
    // Example:
    // event: 'sendVirtualPageView'
    // event: 'choosePaymentMethod'
    static PushEventToDataLayer = (event) => {
        if (isClient) {
            window.dataLayer = window.dataLayer || []
            window.dataLayer.push({
                event,
            })
        }
    }

    // static pushVirtualPageViewToDataLayer = virtualPath => {
    // Event + VirtualPath
    static VirtualPageView = (virtualPath) => {
        if (isClient) {
            window.dataLayer = window.dataLayer || []
            window.dataLayer.push({
                event: 'sendVirtualPageView',
                virtualPath,
            })
        }
    }

    static Sanitize = (key) => {
        const dict = {}
        dict[key] = undefined

        if (isClient) {
            window.dataLayer = window.dataLayer || []
            window.dataLayer.push(dict)
        }
    }

    static SanitizeArray = (keys) => {
        const dict = {}

        if (isClient) {
            window.dataLayer = window.dataLayer || []

            keys.forEach((key) => {
                dict[key] = undefined
            })

            window.dataLayer.push(dict)
        }
    }

    // ------------------------------------------------------------

    static Legacy_PushToDataLayer = (
        event,
        virtualPath,
        isEcommerce,
        ReceiptPath,
        ReceiptType,
        isReceipt
    ) => {
        if (isClient) {
            const tagManagerArgs = {
                dataLayer: {
                    event,
                    virtualPath,
                    isEcommerce,
                    ReceiptPath,
                    ReceiptType,
                    isReceipt,
                },
            }
            TagManager.dataLayer(tagManagerArgs)
        }
    }

    // Virtual Path
    static gtmVirtualPageView = (virtualPath) => {
        // console.log(
        //     '%c-----DataLayer::gtmVirtualPageView-----',
        //     'color:#a5b1ff; font-size: 12px',
        //     event
        // )
        this.pushVirtualPageViewToDataLayer(virtualPath)
        // console.log('datalayer.js::gtmVirtualPageView()', virtualPath)
    }
}

export default DataLayer

