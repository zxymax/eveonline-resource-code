import React, { useEffect } from 'react'
import { NOT_FOUND } from 'redux-first-router'
import { isClient } from 'config/web'
import { usePrevious } from 'hooks'
import _includes from 'lodash/includes'
import sitemap from 'config/sitemap'
import NotFound from 'pages/not-found'
import Error from 'pages/error'
import { AppLayout } from 'layouts'
import DefaultPageLayout from 'layouts/page-layouts'
import LanguageType from 'models/language-type'

interface Props {
    lang: LanguageType
    type: string
    page: string
    subpage: string
    id: string
    setActiveLanguage: (lang: string) => void
}

const App = ({
    lang,
    type,
    page,
    subpage,
    id,
    setActiveLanguage,
}: Props): JSX.Element => {
    const prevLang = usePrevious(lang)

    // Runs only on mount
    useEffect(() => {
        setActiveLanguage(lang)

        if (isClient) {
            window.dataLayer = window.dataLayer || []
            window.dataLayer.push({ event: 'optimize.activate' })
        }
    }, [])

    // Runs on language change
    useEffect(() => {
        if (prevLang !== lang) {
            setActiveLanguage(lang)
        }
    }, [lang])

    const currentPage = sitemap[page]

    const renderPage = (): JSX.Element => {
        if (type === 'ERROR') return <Error />
        if (type === NOT_FOUND) return <NotFound />

        if (currentPage && currentPage.render()) {
            if (subpage) {
                // If subpage is set then get that from sitemap.
                if (currentPage.children) {
                    // If one template set for all children then use, e.g. articles/category
                    if (currentPage.children.render()) {
                        if (_includes(currentPage.children.values, subpage))
                            return currentPage.children.render()
                    } else {
                        // TODO, this part of the code is not executed because there are not pages with children set like that now
                        // Else get the correct subpage from sitemap and use that pages template.
                        const currentSubpage = currentPage.children[subpage] // eslint-disable-line
                        if (currentSubpage && currentSubpage.render()) {
                            if (id) {
                                // Third level page can be set then check if that exists in sitemap.
                                const currentId = currentSubpage.children[id]
                                if (currentId) return currentId.render()
                            }

                            return currentSubpage.render()
                        }
                    }
                }

                return currentPage.render()
            }

            return currentPage.render()
        }

        return <NotFound />
    }

    const isPageLightTheme = (): boolean => {
        if (type === NOT_FOUND || type === 'ERROR') {
            return false
        }
        if (currentPage && currentPage.showDarkHeader) {
            return true
        }

        return false
    }

    return (
        <AppLayout lang={lang}>
            <DefaultPageLayout
                page={renderPage()}
                lang={lang}
                darkNavigation={isPageLightTheme()}
                hideMenuBorder={currentPage && currentPage.hideMenuBorder}
                showLogin={currentPage && currentPage.showLogin}
                hideCTA={currentPage && currentPage.hideCTA}
                showTwitch={currentPage && currentPage.showTwitch}
            />
        </AppLayout>
    )
}

export default App

