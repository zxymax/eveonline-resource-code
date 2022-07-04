import ComProtobuf from 'proto/generated/eve_public/app/com/com_pb'
import { ClickIdType, UtmType, PageInfoType } from '../../models'
import getUtmProtoMessage from '../utm'

export default function getContextProtoMessage(
  utmValues: UtmType,
  clickIdValues: ClickIdType,
  pageInfoValues: PageInfoType
  // gaClientId: string
): ComProtobuf.Context {
  // console.log('utm values inside: ', utmValues)

  const context = new ComProtobuf.Context()

  const utmProtoMessage = getUtmProtoMessage(utmValues)
  //  console.log('UTM PROTO MESSAGE: ', utmProtoMessage.toObject())
  context.setUtm(utmProtoMessage)

  // Google client id
  //  console.log('gaClientId: ', gaClientId)

  // -------------------------------
  // Set click id logic:
  // Check if any are set and them set them
  // only one click id is needed and if more than one should come in
  // then this is the order priority google > yandex > facebook
  if (clickIdValues) {
    const googleClickId = clickIdValues.gclid
    const yandexClickId = clickIdValues.yclid
    const facebookClickId = clickIdValues.fbclid

    context.setNoClickId(true) // Set to true initially
    if (googleClickId) context.setGoogleClickId(googleClickId)
    else if (yandexClickId) context.setYandexClickId(yandexClickId)
    else if (facebookClickId) context.setFacebookClickId(facebookClickId)
  }
  // -------------------------------

  if (pageInfoValues) {
    // ERROR CHECK AND ONLY SET IF WHAT!??, empty, null, etc.
    context.setGaClientId(pageInfoValues.gaClientId)

    // Browser locale
    // console.log('locale: ', locale)
    context.setLocale(pageInfoValues.locale)
  }

  if (pageInfoValues) {
    // Landing page
    const { landingPage } = pageInfoValues
    //  console.log('landingPage: ', landingPage)
    if (landingPage) context.setLandingPage(landingPage)

    // Referrer domain
    const { referrerDomain } = pageInfoValues
    //  console.log('referrerDomain: ', referrerDomain)
    if (referrerDomain) context.setReferrerDomain(referrerDomain)
  }

  //  console.log('context.toObject(): ', context.toObject())

  return context
}
