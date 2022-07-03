import { connect } from 'react-redux'
import Footer from './components/Footer'
import localize from './components/localize'
import { getLanguage } from '../../selectors'

function mapStateToProps(state) {
    return { language: getLanguage(state) }
}

export default connect(mapStateToProps)(Footer)
