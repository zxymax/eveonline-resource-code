import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Link from 'features/link'
import { Section, Container, Row, Column } from 'layouts'
import style from './breadcrumbs.scss'

class Breadcrumbs extends Component {
    componentDidMount = () => {}

    render() {
        const { page, subpage, id } = this.props

        return (
            <Section>
                <Container>
                    <Row>
                        <Column xs={12}>
                            <ul className={style.breadcrumbs}>
                                <li>
                                    <Link>Home</Link>
                                </li>
                                {page && (
                                    <li>
                                        <Link path={{ page }}>{page}</Link>
                                    </li>
                                )}
                                {page && subpage && (
                                    <li>
                                        <Link path={{ page, subpage }}>
                                            {subpage}
                                        </Link>
                                    </li>
                                )}
                                {page && subpage && id && (
                                    <li>
                                        <Link path={{ page, subpage, id }}>
                                            {id}
                                        </Link>
                                    </li>
                                )}
                            </ul>
                        </Column>
                    </Row>
                </Container>
            </Section>
        )
    }
}

Breadcrumbs.propTypes = {
    page: PropTypes.string,
    subpage: PropTypes.string,
    id: PropTypes.string,
}

export default Breadcrumbs
