import React, { Component } from 'react'
import VisibilitySensor from 'react-visibility-sensor'
import LazyLoad from 'react-lazyload'
import { isClient } from 'config/web'
import FullscreenVideo from 'features/fullscreen-video'
import YouTube from 'features/youtube'
import PlayButton from 'features/play-button'
import { Icon, Button } from 'layouts'
import Picture from 'features/picture'
import PropTypes from 'prop-types'
import style from './featureVideo.scss'

class FeatureVideo extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isPlaying: false,
            isVisible: false,
        }
    }

    handleChange = (isVisible) => {
        if (isVisible) this.setState({ isVisible: true })
    }

    playVideo = () => {
        this.setState({ isPlaying: true })

        if (this.props.playing) {
            this.props.playing(true)
        }

        if (isClient) {
            document.addEventListener(
                'mousedown',
                this.handleClickOutside,
                false
            )
            document.documentElement.style.overflow = 'hidden'
            window.addEventListener('keydown', this.handleEscKey, false)
        }
    }

    stopVideo = () => {
        this.setState({ isPlaying: false, isVisible: false })

        if (this.props.playing) {
            this.props.playing(false)
        }

        if (isClient) {
            document.removeEventListener(
                'mousedown',
                this.handleClickOutside,
                false
            )
            document.documentElement.style.overflow = 'auto'
            window.removeEventListener('keydown', this.handleEscKey, false)
        }
    }

    handleEscKey = (e) => {
        if (e.keyCode === 27) {
            this.stopVideo()
        }
    }

    handleClickOutside = (e) => {
        if (this.node) {
            if (!this.node.contains(e.target)) {
                return this.stopVideo()
            }
        }
    }

    hexagonButton = (title) => (
        <div className={style.btnWrapper}>
            <Button
                as="button"
                className={style.btn}
                theme="academy"
                size="small"
            >
                {title}
            </Button>
            <PlayButton size="small" className={style.icon} />
        </div>
    )

    renderContent() {
        const {
            image,
            videoId,
            title,
            subTitle,
            playButtonSize,
            isButton,
            isHexagonButton,
            transition,
        } = this.props
        return (
            <div className={style.videoWrapper} id="video-wrapper">
                {this.state.isPlaying && (
                    <VisibilitySensor onChange={this.handleChange}>
                        <FullscreenVideo
                            animate
                            transition={transition}
                            isVisible={this.state.isVisible}
                        >
                            <div
                                ref={(node) => {
                                    this.node = node
                                }}
                            >
                                <span
                                    role="presentation"
                                    onClick={this.stopVideo}
                                >
                                    <Icon
                                        solid
                                        name="times-hexagon"
                                        className={style.close}
                                    />
                                </span>
                                <YouTube
                                    playing
                                    className={style.player}
                                    videoId={videoId}
                                />
                            </div>
                        </FullscreenVideo>
                    </VisibilitySensor>
                )}
                <div role="presentation" onClick={this.playVideo}>
                    {isButton && isHexagonButton ? (
                        this.hexagonButton(title)
                    ) : (
                        <>
                            {title && <h5>{title}</h5>}
                            <div className={style.wrapper}>
                                <LazyLoad height={365} offset={200}>
                                    <Picture
                                        className={style.image}
                                        src={image}
                                        alt=""
                                    />
                                    <PlayButton
                                        size={playButtonSize}
                                        className={style.icon}
                                    />
                                </LazyLoad>
                            </div>
                            {subTitle && <p>{subTitle}</p>}
                        </>
                    )}
                </div>
            </div>
        )
    }

    render() {
        return this.renderContent()
    }
}

FeatureVideo.propTypes = {
    image: PropTypes.string,
    videoId: PropTypes.string,
    title: PropTypes.string,
    subTitle: PropTypes.string,
    playButtonSize: PropTypes.oneOf(['small', 'medium', 'large']),
    isButton: PropTypes.bool,
    isHexagonButton: PropTypes.bool,
}

FeatureVideo.defaultProps = {
    image:
        'https://webimg.ccpgamescdn.com/7lhcm73ukv5p/7jON5qF4nCJgTKOZ43D5Dj/2bda4edf50369dac013bbf1bff5be6fe/Omega-video-thumbnail.jpg',
    videoId: 'M5AtqXOe3Jw',
    playButtonSize: 'large',
    isButton: false,
    isHexagonButton: false,
}

export default FeatureVideo
