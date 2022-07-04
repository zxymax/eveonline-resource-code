import ComProtobuf from 'proto/generated/eve_public/app/com/com_pb'
import UtmType from '../../models/utmType'

export default function getUtmProtoMessage(
  utmValues: UtmType
): ComProtobuf.UTM {
  // console.log('getUtmProtoMessage running: ', utmValues)
  const pbUtm = new ComProtobuf.UTM()
  if (utmValues) {
    const {
      utm_source: utmSource,
      utm_medium: utmMedium,
      utm_campaign: utmCampaign,
      utm_term: utmTerm,
      utm_content: utmContent,
    } = utmValues

    if (utmSource) pbUtm.setSource(utmSource)
    if (utmMedium) pbUtm.setMedium(utmMedium)
    if (utmCampaign) pbUtm.setCampaign(utmCampaign)
    if (utmTerm) pbUtm.setTerm(utmTerm)
    if (utmContent) pbUtm.setContent(utmContent)
  }
  return pbUtm
}

