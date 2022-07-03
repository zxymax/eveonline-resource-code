import PropTypes from 'prop-types'

const { string, number, object, func, bool } = PropTypes

export const propTypes = {
    videoId: PropTypes.string, // maybe should be oneOfType([string, array]),
    volume: number,
    startSecond: number,
    playbackRate: number,
    playbackQuality: string,
    config: object,
    playing: bool,
    className: string,
    onReady: func,
    onPlay: func,
    onPause: func,
    onBuffer: func,
    onEnded: func,
    onError: func,
    onStateChange: func, // playerState
    onPlaybackQualityChange: func, // quality
    onPlaybackRateChange: func,
}

export const defaultProps = {
    config: {
        showinfo: 0,
        autohide: 1,
        iv_load_policy: 3,
        rel: 0,
        modestbranding: 1,
    },
    onReady() {},
    onPlay() {},
    onPause() {},
    onBuffer() {},
    onEnded() {},
    onError() {},
    onStateChange() {},
    onPlaybackQualityChange() {},
    onPlaybackRateChange() {},
}
