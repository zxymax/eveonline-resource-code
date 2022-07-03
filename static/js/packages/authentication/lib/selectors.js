export const isLoggedIn = (state) =>
    state.auth ? state.auth.isLoggedIn : false
export const getLoggedInUser = (state) => state.auth && state.auth.username
export const getLoggedInJwt = (state) => state.auth && state.auth.token
