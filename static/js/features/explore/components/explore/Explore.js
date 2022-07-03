import React, { Component } from 'react'
import ReactMarkdown from 'react-markdown'
import classNames from 'classnames'
import { Container, Section, Row, Icon } from 'layouts'
import YouTube from 'features/youtube'
import FullscreenVideo from 'features/fullscreen-video'
import ResponsiveImage from 'features/responsive-image'
import s from './Explore.scss'
import { propTypes, defaultProps } from './props'
import TextBoxLeft from '../textbox-left'

class Explore extends Component {
    state = {
        isPlaying: false,
    }

    playVideo = () => {
        this.setState({ isPlaying: true })
    }

    stopVideo = () => {
        this.setState({ isPlaying: false })
    }

    render() {
        const { headline, body, img, videoId } = this.props

        // Values that goes into textbox component
        const textboxSettings = {
            headline: <ReactMarkdown source={headline} />,
            body,
        }
        const exploreClass = classNames(s.explore, {
            [s.isplaying]: this.state.isPlaying,
        })
        return (
            <div className={exploreClass}>
                {this.state.isPlaying && (
                    <FullscreenVideo>
                        <span role="presentation" onClick={this.stopVideo}>
                            <Icon name="times-circle" className={s.close} />
                        </span>
                        <YouTube
                            playing
                            className={s.player}
                            videoId={videoId}
                        />
                    </FullscreenVideo>
                )}
                <Section>
                    <Container className={s.container}>
                        <Row className={s.row}>
                            <TextBoxLeft {...textboxSettings} />
                            <div
                                role="presentation"
                                onClick={this.playVideo}
                                className={s.right}
                            >
                                <div className={s.wrapper}>
                                    <ResponsiveImage
                                        className={s.image}
                                        url={img}
                                    />
                                    <img
                                        className={s.icon}
                                        src="//web.ccpgamescdn.com/aws/eveonline/images/play-icon.png"
                                        alt=""
                                    />
                                </div>
                            </div>
                        </Row>
                    </Container>
                </Section>
            </div>
        )
    }
}

Explore.propTypes = propTypes
Explore.defaultProps = defaultProps

export default Explore
