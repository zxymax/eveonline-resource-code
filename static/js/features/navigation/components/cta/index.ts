import { connect } from 'react-redux'
import { GlobalState } from 'types'
import CTA from './CTA'

interface CtaProps {
    page: string
    language: string
}

function mapStateToProps({ location, language }: GlobalState): CtaProps {
    return {
        page: location.payload.page,
        language,
    }
}

export default connect(mapStateToProps)(CTA)
