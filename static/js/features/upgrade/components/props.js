import PropTypes from 'prop-types'

const { string } = PropTypes

export const propTypes = {
    headline: string,
    body: string,
    img: string,
    buttonText: string,
    buttonUrl: string,
}

export const defaultProps = {
    headline: '## Unlock Your __Potential__',
    body:
        "Upgrading to Omega Clone state will unlock some of EVE's best ships and skills, as well as removing the skill cap, giving you an infinite skill queue  and giving you double training speed.",
    img:
        'https://webimg.ccpgamescdn.com/7lhcm73ukv5p/6M6ZReiJeoMSk8KUAaSUaG/bb305e49ac2db12b6e9c14b205561f64/omega-icon.png',
    buttonText: 'Upgrade to Omega',
}

