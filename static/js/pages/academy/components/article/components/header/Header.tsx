import React from 'react'
import ImageType from 'models/types/ts/imageType'
import { HeadingRegular } from 'layouts/typography'
import { Container } from 'layouts'
import style from './Header.module.scss'

type Props = {
    headline: string
    imageFile: ImageType
    wideImage?: boolean
}

const Header = ({
    headline,
    imageFile,
    wideImage = false,
}: Props): JSX.Element => (
    <div className={style.header}>
        <Container>
            <HeadingRegular fontSize={[26, 48]}>{headline}</HeadingRegular>
        </Container>

        {/* Could do better with these cases */}
        {imageFile && wideImage && (
            <Container extraClass={style.wider}>
                <img
                    src={`${imageFile.url}?w=1450&h=600&fit=fill`}
                    className={style.img}
                    alt=""
                />
            </Container>
        )}

        {imageFile && !wideImage && (
            <Container>
                <img
                    src={`${imageFile.url}?w=1290`}
                    className={style.img}
                    alt=""
                />
            </Container>
        )}
    </div>
)

Header.defaultProps = {
    wideImage: false,
}

export default Header
