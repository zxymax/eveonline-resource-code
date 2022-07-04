import LanguageType from 'models/language-type'
import { ResourceModel } from '../LocalizeContext'

const locEN: ResourceModel =
{
  "EveAnywhere.PlayInBrowser": "EN Play in browser",
  "EveAnywhere.CheckComplete": "EN All checks completed",
  "EveAnywhere.UndockingIn": "EN Undocking in  ",
  "EveAnywhere.SessionEnded.ThankYou": "EN Thank you for playing"
}
const locFR: ResourceModel =
{
  "EveAnywhere.PlayInBrowser": "FR Play in browser",
  "EveAnywhere.CheckComplete": "FR All checks completed",
  "EveAnywhere.UndockingIn": "FR Undocking in  ",
  "EveAnywhere.SessionEnded.ThankYou": "FR Thank you for playing"
}
const locDE: ResourceModel =
{
  "EveAnywhere.PlayInBrowser": "DE Play in browser",
  "EveAnywhere.CheckComplete": "DE All checks completed",
  "EveAnywhere.UndockingIn": "DE Undocking in  ",
  "EveAnywhere.SessionEnded.ThankYou": "DE Thank you for playing"
}
const locRU: ResourceModel =
{
  "EveAnywhere.PlayInBrowser": "RU Play in browser",
  "EveAnywhere.CheckComplete": "RU All checks completed",
  "EveAnywhere.UndockingIn": "RU Undocking in  ",
  "EveAnywhere.SessionEnded.ThankYou": "RU Thank you for playing"
}
const locJA: ResourceModel =
{
  "EveAnywhere.PlayInBrowser": "JA Play in browser",
  "EveAnywhere.CheckComplete": "JA All checks completed",
  "EveAnywhere.UndockingIn": "JA Undocking in  ",
  "EveAnywhere.SessionEnded.ThankYou": "JA Thank you for playing"
}

export default function getLocalizedEveAnywhere(language: LanguageType): ResourceModel {

  switch (language) {
    case 'en':
      return locEN
    case 'fr':
      return locFR
    case 'de':
      return locDE
    case 'ru':
      return locRU
    case 'ja':
      return locJA
    default: return locEN
  }
}
