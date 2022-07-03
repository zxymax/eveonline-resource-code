import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames/bind'
import styles from './Loading.scss'

const cx = classNames.bind(styles)

const Loading = (props) => {
    const { className, ...rest } = props

    rest.className = cx('loading', className)

    return (
        <div {...rest}>
            <div className={styles.ship}>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="95"
                    height="104"
                    fill="none"
                    viewBox="0 0 95 104"
                >
                    <path
                        fill="#30B2E6"
                        d="M92.115 68.216v7.814h-3.42V56.987l-3.38 3.447h-.04V76.03l-4.27 4.366v3.333l-11.04-3.806v-4.198l-8.512-5.108V54.545l1.971-7.514V31.045l2.354-8.978V1.474L57.681 0l-8.097 1.474v20.593l4.325 36.644v20.684l-6.402-5.63-6.416 5.626V58.71l4.329-36.644V1.474L37.323 0l-8.097 1.474v20.593l2.355 8.978V47.03l1.98 7.523v16.063l-8.526 5.108v4.198l-11.044 3.806v-3.333L9.72 76.03V60.434h-.036l-3.38-3.447V76.03h-3.42v-7.814L0 65.269v33.01l2.885 2.947V95.5h4.4l28.201 4.43V95.5h4.548v3.925L47.507 104l7.459-4.575V95.5H59.523v4.43l28.196-4.43h4.396v5.726L95 98.279v-33.01l-2.885 2.947z"
                    />
                </svg>
                <div className={styles.boosters}>
                    <div className={styles.booster} />
                    <div className={styles.booster} />
                    <div className={styles.booster} />
                </div>
            </div>
        </div>
    )
}

Loading.propTypes = {
    className: PropTypes.string,
}

export default Loading
