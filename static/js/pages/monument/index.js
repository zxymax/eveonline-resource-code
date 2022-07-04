import { connect } from 'react-redux'
import Monument from './components/monument'

const mapDispatchToProps = (dispatch) => ({
    dispatch,
})

const mapStateToProps = (state) => ({
    searching: state.monuments.searching,
    searchResult: state.monuments.searchResult,
    showNotFound: state.monuments.showNotFound,
})

export default connect(mapStateToProps, mapDispatchToProps)(Monument)
