import pageActions from './lib/pages/pageActions'

const routesMap = {
    ERROR: {
        path: '/error',
    },
    PAGE: {
        path: '/:lang(|en|de|fr|ru|ja)?/:page?/:subpage?/:id?/:subid?',
        thunk: pageActions,
        confirmLeave: (state) => {
            const { location, stream } = state
            if (location.payload.page === 'anywhere' && stream?.active) {
                return 'If you leave, you may lose any unsaved progress'
            }
        },
    },
}

export default routesMap

