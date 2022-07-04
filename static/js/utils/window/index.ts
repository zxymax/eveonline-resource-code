import { isClient } from 'config/web'

export default function getWindowPropertyValue(propertyName: string): string {
  if (isClient) {
    if (window && window[propertyName]) {
      return window[propertyName]
    }
  }
  // Defaults to empty string if nothing found
  return null
}

