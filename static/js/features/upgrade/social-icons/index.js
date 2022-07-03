import React, { memo } from 'react'
import PropTypes from 'prop-types'
import styles from './styles.scss'
import SocialIcon from '../../social-icon'

// const Icons = ({ ids }) => ids.map(id => <SocialIcon key={id} id={id} />)

// Icons.propTypes = {
//     ids: PropTypes.arrayOf(PropTypes.string).isRequired,
// }

const SocialIcons = memo(({ ids, className }) => {
    const icons = ids.map((id) => <SocialIcon key={id} id={id} />)
    const cName = `${styles.social}${className ? ` ${className}` : ''}`
    return <div className={cName}>{icons}</div>
})

SocialIcons.propTypes = {
    ids: PropTypes.arrayOf(PropTypes.string).isRequired,
    className: PropTypes.string,
}

SocialIcons.defaultProps = {
    ids: ['facebook', 'twitter', 'youtube', 'twitch', 'instagram', 'vk'],
}

export default SocialIcons

