import { connectRoutes, HistoryEntries } from 'redux-first-router'
import {
  combineReducers,
  createStore,
  applyMiddleware,
  compose,
  StoreEnhancer,
} from 'redux'
import thunk from 'redux-thunk'
import logger from 'redux-logger'
import { localizeReducer } from 'react-localize-redux'
import { isProduction, isClient, isLocal } from 'config/web'
import createLoggingMiddleware from './middlewares/logging/middleware'
import analyticsReporter from './middlewares/analytics/middleware'
import localizationMiddleware from './middlewares/localization/middleware'
import pages from './lib/pages/reducers'
import recruit from './lib/recruit/reducers'
import language from './lib/language/reducers'
import navigation from './lib/menu/reducers'
import stream from './lib/stream/reducers'
import ads from './features/ad-glare/reducer'
import downloadVersions from './features/DownloadButton/downloadButton'
import monuments from './pages/monument/reducers'
import routesMap from './routesMap'
import options from './utils/options'
import auth from './packages/authentication/lib/reducers'
import authMiddleware from './packages/authentication/lib/middleware'

/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

const devEnabled = !isProduction && !isLocal

function configureStore(
  preLoadedState: unknown,
  initialEntries?: HistoryEntries
) {
  const {
    reducer,
    middleware,
    enhancer,
    thunk: rfrThunk,
  } = connectRoutes(routesMap, { ...options, initialEntries })

  const reducers = {
    localize: localizeReducer,
    pages,
    language,
    navigation,
    ads,
    recruit,
    downloadVersions,
    monuments,
    stream,
    location: reducer,
    auth,
  }

  // and you already know how the story ends:
  const rootReducer = combineReducers(reducers)

  let composeEnhancers = compose

  const middlewares = [
    middleware,
    thunk,
    createLoggingMiddleware(),
    analyticsReporter(),
    localizationMiddleware(),
  ]

  middlewares.push(authMiddleware)

  // Enable logger and redux dev tools in dev builds
  if (devEnabled) {
    middlewares.push(logger)
    // There is no window on the server
    if (isClient) {
      /* eslint-disable no-underscore-dangle */
      composeEnhancers =
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
      /* eslint-enable */
    }
  }

  const allMiddlewares = applyMiddleware(...middlewares)
  const enhancers = composeEnhancers(
    enhancer as StoreEnhancer,
    allMiddlewares
  )
  // note the order: enhancer, then middlewares
  const store = createStore(rootReducer, preLoadedState, enhancers)

  return { store, thunk: rfrThunk }
}

export default configureStore

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof configureStore>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof configureStore

