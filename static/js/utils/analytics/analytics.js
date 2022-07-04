import TagManager from 'react-gtm-module'
import { isClient } from 'config/web'
import DataLayer from './datalayer'

/*

Are all the datalayer variables required for each call?

Parity:
PLEX
1. /PLEX/default.aspx?step=SelectProduct&flow=BuyPlex
2. /PLEX/default.aspx?step=PaymentInfo&flow=BuyPlex
3. /PLEX/default.aspx?step=Receipt&flow=BuyPlex

For future versions, the product and flow needs to be passed through the process, i.e. via some form of state

---

Sanitizing

We need to sanitize the Data Layer Variables, as they will persist indefinately through the session

product
page.title
virtualPath
isEcommerce
ReceiptPath
ReceiptType
isReceipt

---

Aggregate the Store Tracking events, they consist of the following steps:

    Analytics.PushVariable('page.title', `${props.pageTitle} - Receipt`)
    Analytics.EcommerceSteps('PLEX', 'Receipt', 'BuyPlex')
    Analytics.PushEvent('pageTransition')
    Analytics.SanitizeVirtualPath()

Set the title
Set the steps
Push Transition
Sanitize

Redesigned function:

PushStoreStep(flow, step)

Title is created based on step


*/

// Used in new virtualPath logic in onBeforeChange
export function addVirtualPathToDatalayer(event, virtualPath) {
    if (isClient) {
        const tagManagerArgs = {
            dataLayer: {
                event,
                virtualPath,
            },
        }
        TagManager.dataLayer(tagManagerArgs)
    }
}

class Analytics {
    // Predefined Recruit Datalayer
    static dataLayerRecruit = (event, virtualPath, isReceipt) => {
        DataLayer.Legacy_PushToDataLayer(
            event,
            virtualPath,
            'no',
            'eo-secure',
            'trial',
            isReceipt
        )
    }

    // Event
    // sender is only for debugging purposes, to see what part of the code is sending the event.
    static PushEvent = (event, sender = null) => {
        DataLayer.PushEventToDataLayer(event)
    }

    static PushEventObject = (event, sender = null) => {
        DataLayer.PushEventObjectToDataLayer(event)
    }

    static PushVariable(key, value) {
        DataLayer.PushVariable(key, value)
    }

    // Virtual Path Combined
    // Testing different implementation methods
    static EcommerceSteps_Legacy_Basic = (product, step, flow) => {
        const virtualPath = `/${product}/default.aspx?step=${step}&flow=${flow}`

        DataLayer.VirtualPageView(virtualPath)
    }

    // This method determines the datalayer variables based on the supplied values
    static EcommerceSteps_Legacy = (product, step, flow) => {
        const virtualPath = `/${product}/default.aspx?step=${step}&flow=${flow}`

        if (step === 'Receipt') {
            DataLayer.Legacy_PushToDataLayer(
                'sendVirtualPageView',
                virtualPath,
                'yes',
                'eo-www',
                product,
                true
            )
        } else {
            DataLayer.Legacy_PushToDataLayer(
                'sendVirtualPageView',
                virtualPath,
                'yes',
                'eo-www',
                product,
                false
            )
            // DataLayer.VirtualPageView(virtualPath)
        }

        console.log('Analytics::EcommerceSteps()', virtualPath)
    }

    static EcommerceSteps_Revised_1 = (flow, productSlug, step) => {
        // 	/store/checkout/plex-110?step=PaymentMethod
        const virtualPath = `/store/${flow}/checkout/${productSlug}?step=${step}`

        if (step === 'Receipt') {
            DataLayer.Legacy_PushToDataLayer(
                'sendVirtualPageView',
                virtualPath,
                'yes',
                'eo-www',
                productSlug,
                true
            )
        } else {
            DataLayer.Legacy_PushToDataLayer(
                'sendVirtualPageView',
                virtualPath,
                'yes',
                'eo-www',
                productSlug,
                false
            )
            // DataLayer.VirtualPageView(virtualPath)
        }

        console.log(
            '%cAnalytics::EcommerceSteps_Revised_1()',
            'color:#ffeb19; font-size: 16px',
            virtualPath
        )
    }

    // Pushes payment method as a virtual path and a datalayer variable
    static PushPaymentMethod(value) {
        DataLayer.PushVariable('paymentMethod', value)
        DataLayer.AppendVirtualPath(`paymentMethod=${value}`)
    }

    static SanitizeVirtualPath() {
        DataLayer.VirtualPageView(undefined)
    }

    // Intended to clear out all the DataLayer Variables that are used, otherwise the variables
    // persist until overriden or the page reloads.
    static SanitizeAll() {
        const dataLayerVariables = [
            'product',
            'page.title',
            'virtualPath',
            'isEcommerce',
            'ReceiptPath',
            'ReceiptType',
            'isReceipt',
        ]

        DataLayer.SanitizeArray(dataLayerVariables)
    }

    static PushStoreStep(flow, productSlug, step) {
        let composedTitle

        if (isClient) {
            composedTitle = `${document.title} - ${step}`
        }

        // DataLayer.PushVariable('page.title', composedTitle)
        // this.EcommerceSteps_Legacy(flow, step, flow)
        this.EcommerceSteps_Revised_1(flow, productSlug, step)
        this.PushEvent('pageTransition', 'Store')
        this.SanitizeAll()
    }

    // Work in Progress
    // static PushStoreStep_2(flow, productSlug, step) {
    //     //console.log('Analytics::PushStoreStep()')

    //     let composedTitle

    //     if (isClient) {
    //         composedTitle = `${document.title} - ${step}`
    //     }

    //     // console.log(
    //     //     '%cAnalytics::PushStoreStep()',
    //     //     'color:#ffeb19; font-size: 16px',
    //     //     composedTitle
    //     // )
    //     // DataLayer.PushVariable('page.title', composedTitle)
    //     // this.EcommerceSteps_Legacy(flow, step, flow)
    //     this.EcommerceSteps_Revised_1(flow, productSlug, step)
    //     this.PushEvent('pageTransition', 'Store')
    //     this.SanitizeAll()
    // }
}

export default Analytics

