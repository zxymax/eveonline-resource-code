import { connect } from 'react-redux'
import GTM from './GTM'

export { default as GTM } from './GTM'

function mapStateToProps(props) {
    const { pathname } = props.location
    return {
        pathname,
    }
}

export default connect(mapStateToProps)(GTM)
