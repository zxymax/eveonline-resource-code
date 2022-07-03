import { isClient } from 'config/web'
import { allowedCountries } from './allowedCountries'

export default function allowedToPlay(country: string): boolean {
    if (isClient) {
        const allowed = allowedCountries.includes(country)
        return allowed
    }
    // Always return false if not client
    return false
}
