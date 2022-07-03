import { connect } from 'react-redux'
import { createSelector } from 'reselect'
import SelectLanguage from './components/select-language'
import { getLanguage, getLanguages } from '../../selectors'

const getOrderedLanguages = createSelector([getLanguage], (language) => {
    const languages = getLanguages()

    // Move the selected language to the front of the array
    languages.splice(languages.indexOf(language), 1)
    languages.unshift(language)
    return languages
})

const mapStateToProps = (state) => ({
    language: getLanguage(state),
    languages: getOrderedLanguages(state),
    page: state.location.payload.page,
    subpage: state.location.payload.subpage,
    id: state.location.payload.id,
    subid: state.location.payload.subid,
    query: state.location.query,
})

export default connect(mapStateToProps)(SelectLanguage)

