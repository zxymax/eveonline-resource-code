import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import styled, { css, theme } from 'styled-components'
// import style from './folderContainer.scss'

const fontSize = '15px'
const decoHeight = '11px'
const decoCutHeight = '5px'

const ContainerWrapper = styled.div`
    font-size: 18px;
    padding: 40px 30px;
    position: relative;
    margin-bottom: 60px;
    font-size: ${fontSize};
    margin-top: 60px;
    background-color: ${(props) => props.mainColor};
`

const TopDeco = styled.div`
    position: absolute;
    left: ${decoHeight};
    top: -${decoHeight};
    height: ${decoHeight};
    width: calc(100% - ${decoHeight});
    background-color: ${(props) => props.mainColor};

    ${(props) =>
        props.showLine &&
        css`
            &::after {
                position: absolute;
                right: 0;
                top: 0;
                content: '';
                height: 20px;
                width: 3px;
                background-color: ${props.secondaryColor};
            }
        `}

    &::before {
        position: absolute;
        left: -${decoHeight};
        top: 0;
        content: '';
        border-bottom: ${decoHeight} solid ${(props) => props.mainColor};
        border-left: ${decoHeight} solid transparent;
    }

    .right {
        width: 50px;
        height: ${decoCutHeight};
        background: ${(props) => props.mainColor};
        right: 0;
        top: -${decoCutHeight};
        position: absolute;

        &::before {
            position: absolute;
            left: -${decoCutHeight};
            bottom: 0;
            content: '';
            border-bottom: ${decoCutHeight} solid ${(props) => props.mainColor};
            border-left: ${decoCutHeight} solid transparent;
        }
    }

    .left {
        width: calc(100% - 150px);
        height: ${decoCutHeight};
        background: ${(props) => props.mainColor};
        left: ${decoCutHeight};
        top: -${decoCutHeight};
        position: absolute;

        &::before {
            position: absolute;
            left: -${decoCutHeight};
            bottom: 0;
            content: '';
            border-bottom: ${decoCutHeight} solid ${(props) => props.mainColor};
            border-left: ${decoCutHeight} solid transparent;
        }

        &::after {
            position: absolute;
            right: -${decoCutHeight};
            bottom: 0;
            content: '';
            border-bottom: ${decoCutHeight} solid ${(props) => props.mainColor};
            border-right: ${decoCutHeight} solid transparent;
        }
    }
`

const BottomDeco = styled.div`
    position: absolute;
    right: ${decoHeight};
    bottom: -${decoHeight};
    height: ${decoHeight};
    width: calc(100% - ${decoHeight});
    background-color: ${(props) => props.mainColor};

    &::before {
        position: absolute;
        right: -${decoHeight};
        top: 0;
        content: '';
        border-top: ${decoHeight} solid ${(props) => props.mainColor};
        border-right: ${decoHeight} solid transparent;
    }

    .right {
        width: calc(100% - 150px);
        height: ${decoCutHeight};
        background: ${(props) => props.mainColor};
        right: ${decoCutHeight};
        bottom: -${decoCutHeight};
        position: absolute;

        &::before {
            position: absolute;
            left: -${decoCutHeight};
            bottom: 0;
            content: '';
            border-top: ${decoCutHeight} solid ${(props) => props.mainColor};
            border-left: ${decoCutHeight} solid transparent;
        }

        &::after {
            position: absolute;
            right: -${decoCutHeight};
            bottom: 0;
            content: '';
            border-top: ${decoCutHeight} solid ${(props) => props.mainColor};
            border-right: ${decoCutHeight} solid transparent;
        }
    }
    .left {
        width: 50px;
        height: ${decoCutHeight};
        background: ${(props) => props.mainColor};
        left: 0;
        bottom: -${decoCutHeight};
        position: absolute;

        &::after {
            position: absolute;
            right: -${decoCutHeight};
            bottom: 0;
            content: '';
            border-top: ${decoCutHeight} solid ${(props) => props.mainColor};
            border-right: ${decoCutHeight} solid transparent;
        }
    }
`

const FolderContainer = ({ children, showLine, secondaryColor, ...rest }) => {
    const Container = (
        <ContainerWrapper mainColor={rest.mainColor} className={rest.className}>
            {children}
            <BottomDeco mainColor={rest.mainColor} onlyCorners>
                {!rest.onlyCutCorners && (
                    <>
                        <div className="right" />
                        <div className="left" />
                    </>
                )}
            </BottomDeco>
        </ContainerWrapper>
    )

    return Container
}

FolderContainer.propTypes = {
    children: PropTypes.node,
    mainColor: PropTypes.string,
    secondaryColor: PropTypes.string,
    onlyCutCorners: PropTypes.bool,
    showLine: PropTypes.bool,
}

FolderContainer.defaultProps = {
    mainColor: '#222',
    secondaryColor: '#8a8a8a',
    onlyCutCorners: false,
    showLine: false,
}

export default FolderContainer

