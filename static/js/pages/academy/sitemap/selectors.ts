import PageLocationType from 'models/page-location-type'
import AcademyPageType from '../models/academy-page-type'

export const getSitemapPageBySlug = (
    page: AcademyPageType,
    slug: string
): AcademyPageType => page?.pages?.find((p) => p.pageSlug === slug)

export const getActiveSitemapPage = (
    sitemap: AcademyPageType,
    location: PageLocationType
): AcademyPageType => {
    // This might get confusing but need to get the correct page in the tree

    if (location) {
        // we are on e.g /careers or /ships
        if (location.subpage) {
            const sitemapSubpage = getSitemapPageBySlug(
                sitemap,
                location.subpage
            )

            if (location.id) {
                // we are lower
                const sitemapIdPage = getSitemapPageBySlug(
                    sitemapSubpage,
                    location.id
                )

                // even lower
                if (location.subid) {
                    const sitemapSubIdPage = getSitemapPageBySlug(
                        sitemapIdPage,
                        location.subid
                    )

                    return sitemapSubIdPage
                }

                return sitemapIdPage
            }

            return sitemapSubpage
        }
    }

    return sitemap
}

// export default getSitemapPageBySlug
