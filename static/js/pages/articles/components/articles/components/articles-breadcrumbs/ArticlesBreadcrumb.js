import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'features'
import { Column, Row } from 'layouts'
import styles from './articlesBreadCrumbs.scss'

const ArticlesBreadCrumbs = ({
    first,
    second,
    third,
    fourth,
    isLastItemLink = false,
}) => (
    <Row className={styles.row_wrapper}>
        <Column xs={12}>
            <ul className={styles.breadcrumbs}>
                {first && (
                    <li>
                        <Link>{first}</Link>
                    </li>
                )}
                {first &&
                    second &&
                    (third ? (
                        <li>
                            <Link path={{ page: second }}>{second}</Link>
                        </li>
                    ) : (
                        <li>{second}</li>
                    ))}
                {first &&
                    second &&
                    third &&
                    (isLastItemLink ? (
                        <li>
                            <Link path={{ page: second, subpage: third }}>
                                {third}
                            </Link>
                        </li>
                    ) : (
                        <li>{third}</li>
                    ))}
                {first && second && third && fourth && (
                    <li>
                        <Link
                            path={{ page: second, subpage: third, id: fourth }}
                        >
                            {fourth}
                        </Link>
                    </li>
                )}
            </ul>
        </Column>
    </Row>
)

ArticlesBreadCrumbs.propTypes = {
    first: PropTypes.string,
    second: PropTypes.string,
    third: PropTypes.string,
    fourth: PropTypes.string,
    isLastItemLink: PropTypes.bool,
}

export default ArticlesBreadCrumbs
