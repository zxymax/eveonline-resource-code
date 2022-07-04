import { AccountCreated } from 'proto/generated/eve_public/app/com/eveonline/www/signup_pb'
import { Identifier } from 'proto/generated/eve_public/user/user_pb'
import { UtmType, ClickIdType, PageInfoType } from 'proto/models'
import getContextProtoMessage from 'proto/mapping/context'
import JourneyValuesType from 'proto/models/journeyValuesType'

export default function getAccountCreatedProtoMessage(
  userId: number,
  journeyValues: JourneyValuesType
): AccountCreated {
  // const values = getValues()

  // console.log('values: ', values)

  // if (values) {
  // const utmValues = parseUtmQueryParameters(values)

  const utmValues = journeyValues as UtmType
  // console.log('utmValues: ', utmValues)

  // const clickIdValues = parseClickIdQueryParameters(values)
  const clickIdValues = journeyValues as ClickIdType
  // console.log('clickIdValues: ', clickIdValues)

  // const pageInfoValues = parsePageInfoValues(values)
  const pageInfoValues = journeyValues as PageInfoType
  // console.log('pageInfoValues: ', pageInfoValues)

  // Construct the objects here, we have all values.

  // const locale = getLocale()

  // --------------------------------
  // All context related
  // Maybe move to mapping helper
  const context = getContextProtoMessage(
    utmValues,
    clickIdValues,
    pageInfoValues
  )
  // Context ready
  // -----------------

  // Set User
  const identifier = new Identifier()
  identifier.setSequential(userId)

  // Generate AccountCreated message and populate
  const accountCreated = new AccountCreated()
  accountCreated.setContext(context)
  accountCreated.setUser(identifier)

  return accountCreated
}

