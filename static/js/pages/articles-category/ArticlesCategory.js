import _get from 'lodash/get'
import { connect } from 'react-redux'
import ArticlesCategory from './components/articles-category'

function mapStateToProps({ location }) {
    let page = _get(location, 'payload.id', 0) - 1
    let path = _get(location, 'pathname', '')
    if (page < 0) {
        page = 0
        path = `${path}/1`
    } else {
        const url = path.split('/')
        url.pop()
        url.push('1')
        path = url.join('/')
    }

    return {
        path,
        query: _get(location, 'query.q', ''),
        page,
        lang: _get(location, 'payload.lang', 'en'),
        category: location.payload.subpage,
    }
}

export default connect(mapStateToProps)(ArticlesCategory)
