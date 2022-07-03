import React, { Component } from 'react'
import loadScript from 'load-script'
import Logger from 'utils/logging'
import { propTypes, defaultProps } from './props'
import * as api from './api'

const SDK_URL = 'https://www.youtube.com/iframe_api'
const SDK_GLOBAL = 'YT'
const SDK_GLOBAL_READY = 'onYouTubeIframeAPIReady'

class YouTube extends Component {
    static getSDK() {
        if (window[SDK_GLOBAL] && window[SDK_GLOBAL].loaded) {
            return Promise.resolve(window[SDK_GLOBAL])
        }
        return new Promise((resolve, reject) => {
            const previousOnReady = window[SDK_GLOBAL_READY]
            window[SDK_GLOBAL_READY] = () => {
                if (previousOnReady) previousOnReady()
                resolve(window[SDK_GLOBAL])
            }
            loadScript(SDK_URL, (err) => {
                if (err) reject(err)
            })
        })
    }

    constructor(props) {
        super(props)

        this.isReady = false
        this.log = false
    }

    componentDidMount() {
        // if (this.log) console.log('componentDidMount')

        const { videoId, config, playing } = this.props
        const conf = { ...defaultProps.config, ...config }

        // if (this.log) console.log('Calling SDK')
        YouTube.getSDK().then((YT) => {
            // if (this.log) console.log('SDK loaded')
            this.player = new YT.Player(this.playerContainer, {
                width: '100%',
                height: '100%',
                videoId,
                playerVars: {
                    ...conf,
                    origin: window.location.origin,
                    autoplay: conf.autoplay || playing,
                },
                events: {
                    onReady: this.onReady,
                    onStateChange: this.onStateChange,
                    onPlaybackQualityChange: this.onPlaybackQualityChange,
                    onPlaybackRateChange: this.onPlaybackRateChange,
                    onError: (event) => this.onError(event),
                },
            })
            // if (this.log) console.log('Player created')
        }, this.onError)
    }

    componentDidUpdate(prevProps) {
        // if (this.log) console.log('componentDidUpdate', prevProps)

        const {
            videoId,
            volume,
            playbackRate,
            playbackQuality,
            playing,
            startSecond,
        } = this.props
        if (videoId !== prevProps.videoId && videoId) {
            // if (this.log) console.log('videoId prop changed')
            this.load(videoId)
        } else if (!videoId && prevProps.videoId) {
            // if (this.log) console.log('videoid prop nulled')
            api.stop(this.isReady, this.player)
        }

        if (volume !== prevProps.volume) {
            // if (this.log) console.log('volume prop changed')
            api.setVolume(this.isReady, this.player, volume)
        }

        if (playbackRate !== prevProps.playbackRate) {
            // if (this.log) console.log('rate prop changed')
            api.setPlaybackRate(this.isReady, this.player, playbackRate)
        }

        if (playbackQuality !== prevProps.playbackQuality) {
            // if (this.log) console.log('quality prop changed')
            api.setPlaybackQuality(this.isReady, this.player, playbackQuality)
        }

        if (startSecond !== prevProps.startSecond) {
            // if (this.log) console.log('quality prop changed')
            // api.seekTo(this.isReady, this.player, startSecond)
            this.player.seekTo(startSecond, true)
        }

        if (playing !== prevProps.playing) {
            // if (this.log) console.log('play prop changed')
            if (playing) api.play(this.isReady, this.player)
            else api.pause(this.isReady, this.player)
        }
    }

    componentWillUnmount() {
        // if (this.log) console.log('componentWillUnmount')
        api.stop(this.isReady, this.player)
        api.destroy(this.isReady, this.player)
    }

    // ====================================================================================
    // === EVENTS
    // ====================================================================================

    onReady = () => {
        const { onReady, volume, playbackRate, playbackQuality } = this.props
        this.isReady = true
        if (volume || volume === 0) {
            api.setVolume(this.isReady, this.player, volume)
        }

        if (playbackRate) {
            api.setPlaybackRate(this.isReady, this.player, playbackRate)
        }

        if (playbackQuality) {
            api.setPlaybackQuality(this.isReady, this.player, playbackQuality)
        }

        // if (this.log) console.log('onReady: ', data)
        onReady()
    }

    onStateChange = (state) => {
        const { onStateChange } = this.props
        const { PLAYING, PAUSED, BUFFERING, ENDED, CUED } = window[
            SDK_GLOBAL
        ].PlayerState

        if (state.data === PLAYING) this.onPlay()
        if (state.data === PAUSED) this.onPause()
        if (state.data === BUFFERING) this.onBuffer()
        if (state.data === ENDED) this.onEnded()
        if (state.data === CUED) this.onReady()

        onStateChange(state.data)
    }

    onPlaybackQualityChange = (quality) => {
        const { onPlaybackQualityChange } = this.props
        // if (this.log) console.log('playback quality changed: ', quality.data)
        onPlaybackQualityChange(quality)
    }

    onPlaybackRateChange = (rate) => {
        const { onPlaybackRateChange } = this.props
        // if (this.log) console.log('playback rate changed: ', rate.data)
        onPlaybackRateChange(rate)
    }

    onPlay = () => {
        const { onPlay } = this.props
        // if (this.log) console.log('onPlay')
        onPlay()
    }

    onPause = () => {
        const { onPause } = this.props
        // if (this.log) console.log('onPause')
        onPause()
    }

    onBuffer = () => {
        const { onBuffer } = this.props
        // if (this.log) console.log('onBuffer')
        onBuffer()
    }

    onEnded = () => {
        const {
            onEnded,
            config: { loop },
        } = this.props
        if (loop) {
            api.seekTo(this.isReady, this.player, 0)
            // if (this.log) console.log('seekTo: 0')
        }
        // if (this.log) console.log('onEnded')
        onEnded()
    }

    onError = (error) => {
        const { onError } = this.props

        Logger.captureException(error, null, {
            category: 'youtube',
            message: error,
        })
        onError(error)
    }

    // ====================================================================================

    load(videoId) {
        // console.log(videoId)
        // if (this.log) console.log('load: ', videoId)
        this.player.cueVideoById({
            videoId,
            startSeconds: 0,
        })
    }

    render() {
        // if (this.log) console.log(this.state)
        // eslint-disable-next-line
        return (
            <>
                <div
                    className={this.props.className}
                    ref={(ref) => (this.playerContainer = ref)} // eslint-disable-line
                />
            </>
        )
    }
}

YouTube.propTypes = propTypes
YouTube.defaultProps = defaultProps

export default YouTube
