import LanguageType from 'models/language-type'
import { useSelector } from 'react-redux'
import { getLanguage } from 'selectors'
import React, { createContext, useEffect, useState } from 'react'

import getLocalizedEveAnywhere from './translations/eve-anywhere'

export type ResourceSetKeyType = 'EveAnywhere' | 'SomethingElse'
// export type ResourceKeyType = 'PlayInBrowser' | 'SomethingElse' // Not used for now or maybe never

export type TranslateFunctionSignature = (resourceKey: string) => string

export interface LocalizationContextModel {
    translate: TranslateFunctionSignature
    getResourceSet(string: ResourceSetKeyType): void
    translations: ResourceSetModel
}

// Resource Set is used to get many values in one go
export type ResourceSetModel = {
    [key: string]: ResourceModel
}

export interface ResourceModel {
    [key: string]: string
}

function getDefaultLoc(): ResourceSetModel {
    console.log('getting default loc!')
    return {
        default: {
            key1: 'testtest 1',
            key2: 'testtest 2',
            key3: 'testtest 3',
        },
    }
}

function getResourceSetForEveAnywhere(language: LanguageType): ResourceModel {
    console.log('getResourceSetEveAnywhere!')
    return getLocalizedEveAnywhere(language)
}

// type ResourceSetKey = 'EveAnywhere' | 'ResourceSetOne' | 'ResourceSetTwo'

export const LocalizeContext = createContext<LocalizationContextModel>(null)

interface Props {
    children: React.ReactNode
}

export function LocalizeProvider({ children }: Props): JSX.Element {
    const language = useSelector((state) => getLanguage(state))

    const [activeLanguage, setActiveLanguage] = useState()

    const [translations, setTranslations] = useState<ResourceSetModel>(null)

    const [hasInitialized, setHasInitialized] = useState<boolean>(false)

    // Only run for first load, we can get all default ones
    // We can always initialize with resource set from e.g. navigation and footer items?
    useEffect(() => {
        console.log('initializing, this should happen only once !!')
        if (!hasInitialized) {
            setTranslations(getDefaultLoc())
            setHasInitialized(true)
        }
    }, [])

    // Here to reset context if language is changed, could also store all languages but this should be a rare case that lang is switched
    // Could we combine the two use effects into one?
    useEffect(() => {
        console.log('Language has changed, need to reset!')
        if (language !== activeLanguage) {
            setActiveLanguage(language)
            setTranslations(getDefaultLoc())
            setHasInitialized(true)
        }
    }, [language])

    function localizationContextProvider(): LocalizationContextModel {
        // The important one, it does the translate
        function translate(key: string): string {
            // console.log('LocalizeContext: ', LocalizeContext)
            console.log('Current state of localization: ', translations)
            console.log('resource key: ', key)

            // TODO error check well, maybe even try/catch
            const setKey = key.split('.')[0]
            console.log('resource set key: ', setKey)

            // Error check a lot here, and have to return missing translation, could fallback to english but it might also be missing
            // When this goes into Contentful we will get the fallback of EN already but that might also be missing
            // Then return Missing LOC something, similart as react-localize-redux

            if (translations) {
                if (translations[setKey]) {
                    if (translations[setKey][key]) {
                        return translations[setKey][key]
                    }
                }
            }

            return `LOC missing for set ${{ setKey }} and key ${{
                key,
            }}`
        }

        function getResourceSet(resourceSetKey: ResourceSetKeyType): void {
            // This is getting Resource set, expose it so other scan ask for it
            // Important check, it is null on very first load
            if (translations) {
                console.log(
                    'localization is not null and is ',
                    translations[resourceSetKey]
                )

                // We check here if this has already been added then do nothing! Someone else maybe asked for it already, no need to get again
                if (!translations[resourceSetKey]) {
                    console.log(
                        'localization[resourceSetKey] is null so we want to populate it.'
                    )
                    // Only get it if it does not exist

                    // TODO Here we call web service or graphql to get the resource set.

                    // !!!! or if the language has changed!!!!
                    let resourceSet: ResourceModel
                    if (resourceSetKey === 'EveAnywhere') {
                        resourceSet = getResourceSetForEveAnywhere(language) // Loading from a file still but it looks more like Contentful Resource set will look like
                    }
                    // ADD More here, we only know how to treat EVE Anywhere until we take this further and get all stuff from Contenful

                    console.log(
                        'We are adding this resource set to the context ',
                        resourceSet
                    )

                    setTranslations({
                        ...translations,
                        [resourceSetKey]: resourceSet,
                    })
                }
            }
        }

        return {
            translate,
            getResourceSet,
            translations,
        }
    }

    console.log('returning from new localize provider: ', translations)

    return (
        <LocalizeContext.Provider value={localizationContextProvider()}>
            {children}
        </LocalizeContext.Provider>
    )
}

