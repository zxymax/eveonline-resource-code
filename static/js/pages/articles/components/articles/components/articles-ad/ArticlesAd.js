import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import Border from '../../../../../../layouts/borders'
import { Column, Row } from '../../../../../../layouts/common'
import AdGlare from '../../../../../../features/ad-glare'

const ArticlesAd = ({ s, showHeading = true }) => (
    <div className={s.articles_ad}>
        {showHeading && (
            <>
                <div className={s.article_heading}>
                    <h2>Offer</h2>
                </div>
                <Border primary clean className={s.border} />
            </>
        )}
        <Column xs={12} sm={12} md={12} className={s.col}>
            <Row className={s.row}>
                <AdGlare type="small" />
            </Row>
        </Column>
    </div>
)

ArticlesAd.propTypes = {
    s: PropTypes.func,
    showHeading: PropTypes.bool,
}

export default ArticlesAd
