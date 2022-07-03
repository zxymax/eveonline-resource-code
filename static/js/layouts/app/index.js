import { connect } from 'react-redux'
import { withLocalize } from 'react-localize-redux'
import { getLanguage } from 'selectors'
import App from './App'

function mapStateToProps(store) {
    const type = store.location.type
    let page = store.location.payload.page
    const subpage = store.location.payload.subpage
    const slug = store.location.payload.slug
    const category = store.location.category
    const id = store.location.payload.id
    const lang = getLanguage(store)
    page = page !== undefined ? page : 'home'
    return {
        type,
        page,
        subpage,
        category,
        slug,
        id,
        lang,
    }
}

export default connect(mapStateToProps)(withLocalize(App))

