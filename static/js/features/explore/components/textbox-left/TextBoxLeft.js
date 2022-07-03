import React from 'react'
import PropTypes from 'prop-types'
import style from './TextBoxLeft.scss'
import { Border, Column } from '../../../../layouts'

const TextBoxLeft = (props) => (
    <Column xs={12} sm={6} md={4} className={style.left}>
        <h2>{props.headline}</h2>
        <Border primary small />
        <p>{props.body}</p>
    </Column>
)

TextBoxLeft.propTypes = {
    headline: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
    body: PropTypes.string,
}

export default TextBoxLeft
