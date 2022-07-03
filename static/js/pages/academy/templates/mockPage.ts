import PageType from 'models/types/ts/pageType'

const mockPage: PageType = {
    siteName: 'mockSiteName',
    slug: 'mock-slug',
    body: 'mock-body',
    metaTitle: 'mock meta title',
    metaDescription: 'mock meta description',
    pageBackground: {
        url: '',
        description: ''
    },
    metaImage: {
        url: '',
        description: ''
    },
    sections: undefined,
    sectionsCollection: {
        total: 1,
        items: [
            {
                name: 'Mock Hero',
                headline: 'Mock Hero Title',
                teaser: 'Mock Hero Teaser',
                body: 'the body',
                backgroundImage: '',
                identifier: 'academy-hero',
                imageFile: {
                    description: '',
                    url: ''
                },
                sys: {
                    id: 'string'
                }
            },
        ],
    },
    config: {},
}

export default mockPage
