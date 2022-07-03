import { connect } from 'react-redux'
import SEO from './SEO'

export { default as SEO } from './SEO'

function mapStateToProps(props) {
    const { pathname, search } = props.location
    const { language } = props

    const hrefLangPath = pathname.replace(`/${language}`, '')

    return {
        pathname,
        search,
        hrefLangPath,
    }
}

export default connect(mapStateToProps)(SEO)

