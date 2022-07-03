export const getLocation = (state) => state && state.location
export const getPathname = (state) => state && getLocation(state).pathname
export const getLocationPayload = (state) =>
    getLocation(state) && getLocation(state).payload
export const getPage = (state) =>
    getLocationPayload(state) && getLocationPayload(state).page
export const getSubpage = (state) =>
    getLocationPayload(state) && getLocationPayload(state).subpage
export const getId = (state) =>
    getLocationPayload(state) && getLocationPayload(state).id
export const getSubId = (state) =>
    getLocationPayload(state) && getLocationPayload(state).subid
export const getQuery = (state) =>
    getLocation(state) && getLocation(state).query
