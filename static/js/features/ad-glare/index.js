import _isEmpty from 'lodash/isEmpty'
import _replace from 'lodash/replace'
import { connect } from 'react-redux'
import AdGlare from './components/AdGlare'
import { getLanguage } from '../../selectors'

function mapStateToProps(props, ownProps) {
    const { ads } = props

    let banners = []
    let isFetching = true

    // let adsAlreadyLoaded = false
    if (!_isEmpty(ads.adTypes)) {
        if (!ads.isFetching || !ads.shouldFetch) {
            isFetching = false
        }

        banners = ads.adTypes.small
    }
    return {
        language: getLanguage(props),
        banners,
        isFetching,
        shouldFetch: ads.shouldFetch,
    }
}

const mapDispatchToProps = (dispatch) => ({
    dispatch,
})

export default connect(mapStateToProps, mapDispatchToProps)(AdGlare)
