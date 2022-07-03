import React from 'react'
import _mapKeys from 'lodash/mapKeys'
import _isEmpty from 'lodash/isEmpty'
import _values from 'lodash/values'
import { Button } from 'layouts'
import { propTypes, defaultProps } from './props'
import s from './CTA.scss'

const CTA = (props) => {
    if (props.content === undefined || _isEmpty(props.content)) {
        return <div />
    }

    const items = props.content
    const { alignLeft, className } = props
    const buttons = _mapKeys(_values(items), 'buttonTheme')
    let primary = buttons.primary
    let showPlatform = true

    // Added button theme to show button with no platform.
    if (buttons.primaryNoPlatform) {
        showPlatform = false
        primary = buttons.primaryNoPlatform
    }

    const secondary = buttons.secondary

    const classes = [s.cta]
    if (alignLeft) {
        classes.push(s.alignLeft)
    }

    return (
        <div className={s(classes, className)}>
            {primary && (
                <div>
                    <Button
                        path={primary.buttonUrl}
                        size="large"
                        data-id={props['data-id']}
                        showPlatform={showPlatform}
                        custom={props.custom}
                    >
                        {primary.buttonText}
                    </Button>
                    {primary.body && (
                        <span className={s.no_sub}>{primary.body}</span>
                    )}
                </div>
            )}
            {secondary && (
                <div className={s.second_button}>
                    <Button
                        path={secondary.buttonUrl}
                        className={s.upgrade}
                        theme="secondary"
                        border={1}
                        size="large"
                    >
                        {secondary.buttonText}
                    </Button>
                </div>
            )}
        </div>
    )
}

CTA.propTypes = propTypes
CTA.defaultProps = defaultProps

export default CTA
