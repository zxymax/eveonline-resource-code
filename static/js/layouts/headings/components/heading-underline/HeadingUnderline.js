import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ReactMarkdown from 'react-markdown'
import Visibility from 'react-visibility-sensor'
import style from './headings.scss'

class HeadingUnderline extends Component {
    state = {
        active: false,
    }

    onChange = (isVisible) => {
        if (isVisible) {
            this.setState({ active: true })
        }
    }

    render() {
        const { title, subTitle, color, isMarkdownSubHeading } = this.props

        return (
            <Visibility
                onChange={this.onChange}
                offset={{ top: 30 }}
                partialVisibility
            >
                <div className={style.heading}>
                    <div
                        className={style(style.inner, {
                            [style.active]: this.state.active,
                        })}
                    >
                        <h3>{title}</h3>
                        {subTitle && (
                            <h4>
                                {isMarkdownSubHeading ? (
                                    <ReactMarkdown source={subTitle} />
                                ) : (
                                    subTitle
                                )}
                            </h4>
                        )}
                        <div
                            className={style.line}
                            style={{ background: color }}
                        />
                    </div>
                </div>
            </Visibility>
        )
    }
}

HeadingUnderline.propTypes = {
    title: PropTypes.string,
    subTitle: PropTypes.string,
    color: PropTypes.string,
    isMarkdownSubHeading: PropTypes.bool,
}

HeadingUnderline.defaultProps = {
    color: '#154f5b',
    isMarkdownSubHeading: false,
}

export default HeadingUnderline
