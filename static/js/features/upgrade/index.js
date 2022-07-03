import _isEmpty from 'lodash/isEmpty'
import { connect } from 'react-redux'
import Upgrade from './components/Upgrade'
import { getLanguage } from '../../selectors'

function mapStateToProps(props, ownProps) {
    let data = {}

    if (!_isEmpty(ownProps.section)) {
        data = ownProps.section
    }

    let { headline, body, teaser, img, buttonText, buttonUrl } = ''

    if (data) {
        headline = data.headline
        body = data.body
        teaser = data.teaser
        img = data.image
        buttonText = data.buttonText
        buttonUrl = data.buttonUrl
    }
    return {
        headline,
        body,
        teaser,
        img,
        buttonText,
        buttonUrl,
        language: getLanguage(props),
    }
}

export default connect(mapStateToProps)(Upgrade)

