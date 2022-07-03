import { connect } from 'react-redux'
import { getTranslate, TranslateFunction } from 'react-localize-redux'
import { GlobalState } from 'types'
import NavItem from './NavItem'

interface NavItemProps {
  translate: TranslateFunction
}

function mapStateToProps({ localize }: GlobalState): NavItemProps {
  return {
    translate: getTranslate(localize),
  }
}

export default connect(mapStateToProps)(NavItem)

