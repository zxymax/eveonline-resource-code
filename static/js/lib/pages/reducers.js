import {
  FETCH_PAGE,
  FETCH_PAGE_START,
  FETCH_PAGE_ARTICLES,
  FETCH_PAGE_ARTICLES_START,
  FETCH_PAGE_ARTICLES_SUCCESSFUL,
  FETCH_PAGE_ARTICLES_CATEGORY,
  FETCH_PAGE_ARTICLES_CATEGORY_START,
  FETCH_PAGE_ARTICLE,
  FETCH_PAGE_ARTICLE_START,
} from './actions'

import { LANGUAGE_CHANGE } from '../language/actions'

const INITIAL_STATE = {
  home: {
      isFetching: false,
      hasContent: false,
  },
}

function pages(state = INITIAL_STATE, action) {
  // console.log('INITIAL_STATE', INITIAL_STATE)
  // console.log('ACTION', action)

  switch (action.type) {
      case FETCH_PAGE_START: {
          return {
              ...state,
              [action.id]: undefined,
          }
      }

      case FETCH_PAGE: {
          return {
              ...state,
              [action.id]: action.payload.page,
          }
      }
      case LANGUAGE_CHANGE: {
          return { home: { hasContent: false } }
      }

      case FETCH_PAGE_ARTICLE_START: {
          return {
              ...state,
              hasContent: false,
              isFetching: false,
              article: undefined,
          }
      }
      case FETCH_PAGE_ARTICLE: {
          // console.log('REDUCER FETCH_PAGE_ARTICLE')
          return {
              ...state,
              article: action.payload.article,
          }
      }
      case FETCH_PAGE_ARTICLES: {
          return {
              ...state,
              articles: action.payload.articles,
          }
      }
      case FETCH_PAGE_ARTICLES_START: {
          return {
              ...state,
              articles: undefined,
          }
      }
      case FETCH_PAGE_ARTICLES_CATEGORY_START: {
          return {
              ...state,
              articlesCategory: undefined,
          }
      }
      case FETCH_PAGE_ARTICLES_CATEGORY: {
          return {
              ...state,
              articlesCategory: action.payload,
          }
      }
      case FETCH_PAGE_ARTICLES_SUCCESSFUL: {
          return {
              ...state,
          }
      }
      default:
          return state
  }
}

export default pages
