export const LANGUAGE_CHANGE = 'LANGUAGE_CHANGE'

export const languageChange = (language) => ({
    type: LANGUAGE_CHANGE,
    payload: language,
})
