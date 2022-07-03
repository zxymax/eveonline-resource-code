/* eslint-disable */

// ! TODO, remove eslint-disable above and try and fix errors if possible

import React from 'react'
import styled from 'styled-components'
import { sizes, typography } from 'config/styled-theme'

interface Props extends React.HTMLAttributes<HTMLElement> {
    fontSize?: Array<number> // [number, number]
    fontFamily?: string
    fontWeight?: number
    textTransform?: string
    textShadow?: string
    lineHeight?: number
    children?: any
    as?: any // h1, h2, p, div etc
    className?: string
}

function stripUnit(value: number | string): number {
    // Remove unit from number: 20px -> 20
    return parseInt(value.toString(), 10)
}

function responsiveFont(
    minSize = 13,
    size = 16,
    limit = 1290 + 80 * 2
): string {
    const unitlessMin = stripUnit(minSize)
    const unitlessSize = stripUnit(size)
    const baseline = stripUnit(sizes.xs)
    const multiplier =
        (unitlessSize - unitlessMin) / (stripUnit(limit) - baseline)
    const fontBaseline = unitlessMin - multiplier * baseline

    if (unitlessMin >= unitlessSize) {
        console.warn('Responsive font: min-size equal or greater than size')
    }

    return `
        font-size: ${unitlessMin}px;

        @media (min-width: ${sizes.xs}) {
            font-size: calc(${multiplier} * 100vw + ${fontBaseline}px);
        }

        @media (min-width: ${limit}px) {
            font-size: ${unitlessSize}px;
        }
    `
}

const {
    headingXLarge,
    headingLarge,
    headingMedium,
    headingRegular,
    headingSmall,
    headingXSmall,
    taglineLarge,
    taglineRegular,
    taglineSmall,
    paragraphLarge,
    paragraphRegular,
    labelSmall,
    headingShadow,
    headingShadowSmall,
} = typography

export { headingShadow, headingShadowSmall }

const DynamicComponent = styled.div`
    ${(props: Props) => responsiveFont(...props.fontSize)};
    font-family: ${(props: Props) => props.fontFamily};
    font-weight: ${(props: Props) => props.fontWeight};
    text-transform: ${(props: Props) => props.textTransform};
    line-height: ${(props: Props) => props.lineHeight};
    text-shadow: ${(props: Props) => props.textShadow};
`

export const HeadingXLarge = (props: Props): JSX.Element => (
    <DynamicComponent {...headingXLarge} {...props}>
        {props.children}
    </DynamicComponent>
)

export const HeadingLarge = (props: Props): JSX.Element => (
    <DynamicComponent {...headingLarge} {...props}>
        {props.children}
    </DynamicComponent>
)

export const HeadingMedium = (props: Props): JSX.Element => (
    <DynamicComponent {...headingMedium} {...props}>
        {props.children}
    </DynamicComponent>
)

export const HeadingRegular = (props: Props): JSX.Element => (
    <DynamicComponent {...headingRegular} {...props}>
        {props.children}
    </DynamicComponent>
)

export const HeadingSmall = (props: Props): JSX.Element => (
    <DynamicComponent {...headingSmall} {...props}>
        {props.children}
    </DynamicComponent>
)

export const HeadingXSmall = (props: Props): JSX.Element => (
    <DynamicComponent {...headingXSmall} {...props}>
        {props.children}
    </DynamicComponent>
)

export const TaglineLarge = (props: Props): JSX.Element => (
    <DynamicComponent {...taglineLarge} {...props}>
        {props.children}
    </DynamicComponent>
)

export const TaglineRegular = (props: Props): JSX.Element => (
    <DynamicComponent {...taglineRegular} {...props}>
        {props.children}
    </DynamicComponent>
)

export const TaglineSmall = (props: Props): JSX.Element => (
    <DynamicComponent {...taglineSmall} {...props}>
        {props.children}
    </DynamicComponent>
)

export const ParagraphLarge = (props: Props): JSX.Element => (
    <DynamicComponent {...paragraphLarge} {...props}>
        {props.children}
    </DynamicComponent>
)

export const ParagraphRegular = (props: Props): JSX.Element => (
    <DynamicComponent {...paragraphRegular} {...props}>
        {props.children}
    </DynamicComponent>
)

export const LabelSmall = (props: Props): JSX.Element => (
    <DynamicComponent {...labelSmall} {...props}>
        {props.children}
    </DynamicComponent>
)
