import { getItem } from '../../../utils/storage'
import { LOGINSTATE } from './token'

const isValidState = (state) => state === getItem(LOGINSTATE)

export default isValidState