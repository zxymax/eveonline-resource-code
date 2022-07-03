import _isEmpty from 'lodash/isEmpty'
import { connect } from 'react-redux'
import Pilot from './components/pilot'
import { getLanguage } from '../../selectors'

function mapStateToProps(props, ownProps) {
    let data = {}

    if (!_isEmpty(ownProps.section)) {
        data = ownProps.section
    }

    let { headline, body, backgroundImage, buttonText, buttonUrl } = ''

    if (data) {
        headline = data.headline
        body = data.body
        backgroundImage = data.backgroundImage
        buttonText = data.buttonText
        buttonUrl = data.buttonUrl
    }
    return {
        headline,
        body,
        backgroundImage,
        buttonText,
        buttonUrl,
        language: getLanguage(props),
    }
}

export default connect(mapStateToProps)(Pilot)

