import React from 'react'

export default function Picture({ widthPercentage = 100, src, alt }) {
    const widthToCalc = widthPercentage / 100

    // Need to make sure we are using an image from Contentful.
    const ctfSrc =
        src &&
        src.replace('//webimg.ccpgamescdn.com/', '//images.ctfassets.net/')

    return (
        <picture>
            <source
                type="image/webp"
                key="img-3"
                srcSet={`${ctfSrc}?fm=webp`}
                media="(min-width: 1850px)"
            />
            <source
                type="image/webp"
                key="img-4"
                srcSet={`${ctfSrc}?fm=webp&w=${widthToCalc * 1750 + 100}`}
                media="(min-width: 1750px)"
            />
            <source
                type="image/webp"
                key="img-5"
                srcSet={`${ctfSrc}?fm=webp&w=${widthToCalc * 1500 + 100}`}
                media="(min-width: 1500px)"
            />
            <source
                type="image/webp"
                key="img-6"
                srcSet={`${ctfSrc}?fm=webp&w=${widthToCalc * 1200 + 100}`}
                media="(min-width: 1200px)"
            />
            <source
                type="image/webp"
                key="img-8"
                srcSet={`${ctfSrc}?fm=webp&w=${widthToCalc * 1000 + 100}`}
                media="(min-width: 1000px)"
            />
            <source
                type="image/webp"
                key="img-10"
                srcSet={`${ctfSrc}?fm=webp&w=${widthToCalc * 800 + 100}`}
                media="(min-width: 800px)"
            />
            <source
                type="image/webp"
                key="img-11"
                srcSet={`${ctfSrc}?fm=webp&w=${widthToCalc * 600 + 100}`}
                media="(min-width: 600px)"
            />
            <source
                type="image/webp"
                key="img-12"
                srcSet={`${ctfSrc}?fm=webp&w=${widthToCalc * 500 + 100}`}
                media="(min-width: 500px"
            />
            <source
                type="image/webp"
                key="img-13"
                srcSet={`${ctfSrc}?fm=webp&w=${widthToCalc * 300 + 100}`}
                media="(min-width: 300px"
            />
            <img src={ctfSrc} alt={alt} />
        </picture>
    )
}
