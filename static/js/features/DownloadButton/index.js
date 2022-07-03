import _isEmpty from 'lodash/isEmpty'
import { connect } from 'react-redux'
import { getLanguage } from 'selectors'
import DownloadButtonNew from './components/DownloadButtonNew'

function mapStateToProps(props) {
    const { downloadVersions } = props

    let hasContent = false
    let versions = { win: 2023444, mac: 2023444 }
    if (!_isEmpty(downloadVersions)) {
        versions = downloadVersions.versions || versions
        hasContent = downloadVersions.hasContent
    }
    return {
        versions,
        hasContent,
        language: getLanguage(props),
    }
}

const mapDispatchToProps = (dispatch) => ({
    dispatch,
})

export default connect(mapStateToProps, mapDispatchToProps)(DownloadButtonNew)
