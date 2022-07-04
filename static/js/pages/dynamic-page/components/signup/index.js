// export { default } from './Hero'

import { connect } from 'react-redux'
import { getLanguage } from 'selectors'
import Signup from './Signup'

function mapStateToProps(state) {
    return {
        language: getLanguage(state),
    }
}

export default connect(mapStateToProps)(Signup)
