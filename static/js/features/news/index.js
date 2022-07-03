import _isEmpty from 'lodash/isEmpty'
import { connect } from 'react-redux'
import News from './components/news'

function mapStateToProps(props, ownProps) {
    const { sections } = props
    let data = {}

    if (!_isEmpty(sections.content)) {
        data = sections.content[ownProps.sectionID]
    }

    let { headline } = ''

    if (data.fields != null && !_isEmpty(data.fields)) {
        headline = data.fields.headline
    }
    return {
        headline,
        content: data.entries,
    }
}

export default connect(mapStateToProps, null)(News)
