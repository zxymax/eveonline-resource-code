import { connect } from 'react-redux'
import Link from './Link'
import { getLanguage, getLanguages } from '../../selectors'

function mapStateToProps(state, ownProps) {
    const languages = getLanguages()
    let lang = getLanguage(state)
    // If provided language is valid, use that, otherwise use from state
    if (languages.indexOf(ownProps.lang) > -1) {
        lang = ownProps.lang
    }
    return { lang }
}

export default connect(mapStateToProps)(Link)
