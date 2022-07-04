import * as google_protobuf_any_pb from 'google-protobuf/google/protobuf/any_pb'
import { v4 as uuidv4, parse as uuidParse } from 'uuid'
import PublicProtobuf from 'proto/generated/eve_public/public_pb'
import Logger from 'utils/logging'
// import { AxiosError, AxiosResponse } from 'axios'
import { Timestamp } from 'google-protobuf/google/protobuf/timestamp_pb'
import getConfig from 'config/web'
import protoClient from './authenticatedProtoClient'
import ProtoMessageModel from '../models/ProtoEventModel'

const { webBaseUrl } = getConfig()


export default async function sendEvent(
  serialized: Uint8Array,
  messageObject: unknown,
  name: string,
  journeyId: Uint8Array,
  gatewayUrl = ''
): Promise<ProtoMessageModel> {
  // Generate Event message and populate
  // Create Any type and populate it
  const payload = new google_protobuf_any_pb.Any()

  // Pack the event into Any to be set as Payload
  payload.pack(serialized, name)
  payload.setTypeUrl(`type.evetech.net/${name}`)

  const event = new PublicProtobuf.Event()

  // Journey Id always comes in, either genereated for this specific event or passed along.
  event.setJourney(journeyId)

  // This is the message itself
  event.setPayload(payload)

  // TODO, need to verify that this is indeed correct way of doing the uuid
  // Generate uuid as Uint8Array
  // uuidv4() => uuid as string
  // uuidParse() => converts uuid string to ArrayLike object
  // Uint8Array.from() => converts ArrayLike to 16 byte Uint8Array
  const uuidByteArray = Uint8Array.from(uuidParse(uuidv4()))
  // console.log('uuidByteArray: ', uuidByteArray)
  event.setUuid(uuidByteArray)

  // ExternalOriginId is required, what value should it have?
  // Maybe website we are connecting from, dev, staging, prod www
  event.setExternalOrigin(webBaseUrl)

  // Do we need this or better yet, can we do this
  // event.getApplicationInstanceUuid()

  // Timestamp
  const timestamp: Timestamp = new Timestamp()
  timestamp.fromDate(new Date())
  event.setOccurred(timestamp)

  const model: ProtoMessageModel = {
    eventSerialized: event.serializeBinary(),
    eventObject: event.toObject(),
  }

  // console.log('model: ', model)

  // const eventAsString = JSON.stringify(model.eventObject)
  // const messageAsString = JSON.stringify(messageObject)

  // console.log('eventAsString: ', eventAsString)
  // console.log('messageAsString: ', messageAsString)

  await protoClient
    .post(gatewayUrl, event.serializeBinary())
    .then((result) => {
      return result.data.message
    })
    .catch((err) => {
      Logger.captureException(err, null, {
        category: 'proto',
        eventType: name,
      })
    })

  return model
}

