import { connect } from 'react-redux'
import Breadcrumbs from './components/breadcrumbs'

function mapStateToProps(props) {
    const { location } = props

    let { page, subpage, id } = ''
    page = location.payload.page
    subpage = location.payload.subpage
    id = location.payload.id

    return {
        page,
        subpage,
        id,
    }
}

const mapDispatchToProps = (dispatch) => ({
    dispatch,
})

export default connect(mapStateToProps, mapDispatchToProps)(Breadcrumbs)
