import React from 'react'
import LazyLoad, { LazyLoadProps } from 'react-lazyload'
import ImageType from 'models/types/ts/imageType'

interface Props {
    image: ImageType
    lazyloadProps: LazyLoadProps
    param?: string
    className?: string
}

export default function ImageLazyLoad({
    image,
    lazyloadProps,
    param = '',
    className,
}: Props): JSX.Element {
    if (image && image.url)
        return (
            <LazyLoad {...lazyloadProps}>
                <img
                    src={`${image.url}${param}`}
                    className={className}
                    alt={image.description}
                />
            </LazyLoad>
        )

    return <></>
}

ImageLazyLoad.defaultProps = {
    param: '',
    className: '',
}
