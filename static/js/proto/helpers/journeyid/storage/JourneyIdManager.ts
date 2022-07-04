
import { isClient } from 'config/web'
import {
    v4 as uuidv4,
    parse as uuidParse,
    version as uuidVersion,
    validate as uuidValidate,
} from 'uuid'
import JourneyIdStorage from './storage'

export const JOURNEY_ID_STORAGE_KEY = 'jid'

export default class JourneyIdManager {
    storage: Storage
    // journeyIdStorage: JourneyIdStorage

    /**
     * Storage can be sessionStorage or localStorage, if not set then window.sessionStorage is used.
     * @param storage
     */
    constructor(customStorage?: Storage) {
        // console.log('JourneyIdManager constructor init')
        if (isClient) {
            if (customStorage)
                this.storage = new JourneyIdStorage(customStorage)
            else {
                this.storage = new JourneyIdStorage(sessionStorage) // Default set sessionStorage, can be overwritten, e.g. localStorage or from unit test
            }
        }
    }

    private static generateJourneyId(): string {
        const uuidValue = uuidv4()
        return uuidValue
    }

    /**
     * Can be used to validate that uuid is valid
     * @param uuid the uuid to validate
     * @returns true if uuid is valid and version 4
     */
    public static uuidValidateV4(uuid: string): boolean {
        return uuidValidate(uuid) && uuidVersion(uuid) === 4
    }

    /**
     * This  always return a journey id, if there is one in storage, that is returned, else a new one is created and stored and returned
     * @returns a journey id
     */
    public getJourneyId(): string {
        // if journey id exists, return it
        const storedJid = this.storage?.getItem(JOURNEY_ID_STORAGE_KEY)
        if (storedJid) return storedJid

        // id no journey id exists, create a new one and store it and return it
        const generatedJid = JourneyIdManager.generateJourneyId()
        this.setJourneyId(generatedJid)
        return generatedJid
    }

    /**
     * Journey Id can be set externally if it needs to be passed on to web events
     * @param value The journey id to set and store
     * @returns true if journey id was set and is valid, false otherwise
     */
    public setJourneyId(value: string): boolean {
        // Verify journey id here
        const valid = JourneyIdManager.uuidValidateV4(value)

        // Store journey id and
        if (valid) {
            this.storage?.setItem(JOURNEY_ID_STORAGE_KEY, value)
            return true
        }

        // Returns false if not valid
        return false
    }

    /**
     * Check if a journey id exists in storage.
     * @returns true if journey id exists in storage, else false
     */
    public hasJourneyId(): boolean {
        return !!this.storage?.getItem(JOURNEY_ID_STORAGE_KEY)
    }

    /**
     * Removes the journey id from storage
     */
    public clearJourneyId(): void {
        this.storage?.removeItem(JOURNEY_ID_STORAGE_KEY)
    }

    /**
     *
     * @returns the journey id as Uint8Array
     */
    public getUint8Array(): Uint8Array {
        // This will create new jid or get the current one
        const jid = this.getJourneyId()

        return Uint8Array.from(uuidParse(jid))
    }
}
