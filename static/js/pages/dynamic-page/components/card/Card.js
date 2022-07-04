import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ReactMarkdown from 'react-markdown'
import Visibility from 'react-visibility-sensor'
import { Button } from 'layouts'
import style from './Card.scss'

class Card extends Component {
    state = {
        active: false,
    }

    onChange = (isVisible) => {
        if (isVisible) {
            this.setState({ active: true })
        }
    }

    render() {
        const { id, card, inlineStyle } = this.props
        const {
            headline,
            body,
            imageFile,
            buttonText,
            buttonTheme,
            buttonUrl,
        } = card
        const innerStyle = {
            height: inlineStyle.height,
        }
        const classes = [style.inner]
        let flippable = false
        if (
            headline !== undefined &&
            imageFile === undefined &&
            body !== undefined &&
            buttonText === undefined
        ) {
            classes.push(style.flippable)
            flippable = true
        }

        return (
            <Visibility
                onChange={this.onChange}
                offset={{ top: 30 }}
                partialVisibility
            >
                <div
                    key={id}
                    className={style(style.card, {
                        [style.active]: this.state.active,
                    })}
                    style={inlineStyle}
                >
                    <div className={style(classes)} style={innerStyle}>
                        <div
                            className={style.background}
                            style={inlineStyle.background}
                        >
                            {imageFile && (
                                <div
                                    className={style.shade}
                                    style={{ height: inlineStyle.height }}
                                />
                            )}
                            <img
                                alt=""
                                src={`${imageFile}_w=640&fm=jpg&fl=progressive`}
                                style={{ minHeight: inlineStyle.height }}
                            />
                        </div>
                        <div className={style.info}>
                            <div className={style.content}>
                                <h4>{headline}</h4>
                                {!flippable && (
                                    <ReactMarkdown
                                        source={body}
                                        escapeHtml={false}
                                    />
                                )}
                                {buttonText != null &&
                                    buttonTheme === 'secondary' && (
                                        <Button
                                            target="_blank"
                                            path={buttonUrl}
                                            secondary
                                            xxs
                                        >
                                            {buttonText}
                                        </Button>
                                    )}
                                {buttonText != null &&
                                    buttonTheme === 'primary' && (
                                        <Button
                                            target="_blank"
                                            path={buttonUrl}
                                            secondary
                                            small
                                        >
                                            {buttonText}
                                        </Button>
                                    )}
                            </div>
                        </div>
                        {flippable && (
                            <div className={style(style.info, style.backside)}>
                                <div className={style.content}>
                                    <ReactMarkdown
                                        source={body}
                                        escapeHtml={false}
                                    />
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </Visibility>
        )
    }
}

Card.propTypes = {
    inlineStyle: PropTypes.shape({
        background: PropTypes.string,
        height: PropTypes.string,
        left: PropTypes.string,
        marginTop: PropTypes.number,
        top: PropTypes.number,
    }),
    card: PropTypes.shape({
        body: PropTypes.string,
        buttonText: PropTypes.string,
        buttonTheme: PropTypes.string,
        buttonUrl: PropTypes.string,
        headline: PropTypes.string,
        imageFile: PropTypes.string,
    }),
    id: PropTypes.number,
}

export default Card
