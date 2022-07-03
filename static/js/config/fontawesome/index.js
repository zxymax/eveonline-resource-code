import { library, dom } from '@fortawesome/fontawesome-svg-core'

// Solid icons
import solid from './solid'

// Regular icons
import regular from './regular'

// // Light icons
import light from './light'

// // Brands
import brands from './brands'

// console.log('brands', brands)

// library.add(...solid, ...regular, ...light, ...brands)
library.add(...solid, ...regular, ...light, ...brands)

dom.watch()
