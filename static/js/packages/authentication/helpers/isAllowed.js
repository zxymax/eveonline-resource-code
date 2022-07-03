import sitemap from '../../../config/sitemap'

export default function isAllowed (page, subpage) {
    const sitemapPage = sitemap[page]

    if (!sitemapPage) {
        return false
    }

    let locked = false
    if (sitemapPage && sitemapPage.subpages) {
        const sitemapSubpage = sitemapPage.subpages[subpage]
        if (sitemapSubpage) {
            if (typeof sitemapSubpage.requireAuth !== 'undefined') {
                locked = sitemapSubpage.requireAuth
            } else {
                locked = false
            }
        }
    } else if (typeof sitemapPage.requireAuth !== 'undefined') {
        locked = sitemapPage.requireAuth
    } else {
        locked = false
    }

    return locked
}
