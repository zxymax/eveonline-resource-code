// Platforms
import { faWindows } from '@fortawesome/free-brands-svg-icons/faWindows'
import { faApple } from '@fortawesome/free-brands-svg-icons/faApple'

// Social
import { faFacebookF } from '@fortawesome/free-brands-svg-icons/faFacebookF'
import { faTwitter } from '@fortawesome/free-brands-svg-icons/faTwitter'
import { faYoutube } from '@fortawesome/free-brands-svg-icons/faYoutube'
import { faYoutubeSquare } from '@fortawesome/free-brands-svg-icons/faYoutubeSquare'
import { faTwitch } from '@fortawesome/free-brands-svg-icons/faTwitch'
import { faReddit } from '@fortawesome/free-brands-svg-icons/faReddit'
import { faInstagram } from '@fortawesome/free-brands-svg-icons/faInstagram'
import { faVk } from '@fortawesome/free-brands-svg-icons/faVk'

import { faEnvelope } from '@fortawesome/pro-light-svg-icons/faEnvelope'

const light = [faEnvelope]
const platforms = [faWindows, faApple]
const social = [
    faFacebookF,
    faTwitter,
    faYoutube,
    faYoutubeSquare,
    faTwitch,
    faReddit,
    faInstagram,
    faVk,
]

export default [...platforms, ...social, ...light]
