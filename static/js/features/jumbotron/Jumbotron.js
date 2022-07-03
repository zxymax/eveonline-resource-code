import _isEmpty from 'lodash/isEmpty'
import { connect } from 'react-redux'
import Jumbotron from './components/jumbotron'

function mapStateToProps(props, ownProps) {
    let data = {}

    if (!_isEmpty(ownProps.section)) {
        data = ownProps.section
    }

    let { headline, body, backgroundImage, img, videoId, imageFile, quote } = ''

    if (data) {
        headline = data.headline
        body = data.body
        backgroundImage = data.backgroundImage
        img = data.image
        videoId = data.videoId
        imageFile = data.imageFile
        if (data.content) {
            quote =
                data.content[Math.floor(Math.random() * data.content.length)]
        }
    }

    return {
        headline,
        body,
        backgroundImage,
        img,
        videoId,
        quote,
        imageFile,
    }
}

export default connect(mapStateToProps, null)(Jumbotron)
