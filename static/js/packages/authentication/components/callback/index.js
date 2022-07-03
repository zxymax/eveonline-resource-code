import { connect } from 'react-redux'
import { loginSuccess, loginFailure } from '../../lib/actions'
import { isLoggedIn } from '../../lib/selectors'
import Callback from './Callback'

export const redirectTest = (page, subpage, id, lang) => ({
    type: 'PAGE',
    payload: { lang, page, subpage, id },
})

function mapStateToProps(state) {
    return {
        isLoggedIn: isLoggedIn(state),
    }
}

function mapDispatchToProps(dispatch) {
    return {
        loginSuccess: (token, expiresAt) =>
            dispatch(loginSuccess(token, expiresAt)),
        loginFailure: (err) => dispatch(loginFailure(err)),
        redirect: (prevpath) => dispatch(prevpath),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Callback)
