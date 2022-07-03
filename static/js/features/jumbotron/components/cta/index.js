import _isEmpty from 'lodash/isEmpty'
import { connect } from 'react-redux'
import CTA from './CTA'
import { getLanguage } from '../../../../selectors'

function mapStateToProps(props, ownProps) {
    let data = {}

    if (!_isEmpty(ownProps.section)) {
        data = ownProps.section
    }

    return {
        content: data,
        language: getLanguage(props),
    }
}

export default connect(mapStateToProps)(CTA)
