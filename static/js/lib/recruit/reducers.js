import {
  RECRUIT_INVITATION_START,
  RECRUIT_INVITATION_FINISH,
  RECRUIT_INVITATION_ERROR,
  RECRUIT_REWARDS_START,
  RECRUIT_REWARDS_FINISH,
  RECRUIT_REWARDS_ERROR,
} from './actions'

const INITIAL_STATE = {
  isFetchingInvitation: true,
  isFetchingRewards: true,
}

const recruit = (state = INITIAL_STATE, action) => {
  switch (action.type) {
      case RECRUIT_INVITATION_START: {
          return {
              ...state,
              isFetchingInvitation: true,
          }
      }
      case RECRUIT_INVITATION_FINISH: {
          return {
              ...state,
              isFetchingInvitation: false,
              invitationToken: action.invitationToken,
              invitationEnabled: action.invitationEnabled,
          }
      }
      case RECRUIT_INVITATION_ERROR: {
          return {
              ...state,
              isFetchingInvitation: false,
              error: action.error,
              invitationToken: null,
              invitationEnabled: false,
          }
      }
      case RECRUIT_REWARDS_START: {
          return {
              ...state,
              isFetchingRewards: true,
          }
      }
      case RECRUIT_REWARDS_FINISH: {
          return {
              ...state,
              isFetchingRewards: false,
              rewards: action.rewards,
          }
      }
      case RECRUIT_REWARDS_ERROR: {
          return {
              ...state,
              isFetchingRewards: false,
              error: action.error,
              rewards: null,
          }
      }
      default:
          return state
  }
}

export default recruit
