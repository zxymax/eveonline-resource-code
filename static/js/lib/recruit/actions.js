import getConfig from 'config/web'
import authenticated from '../../utils/api/authenticated'

// TODO: temp json import to get mocked rewards.
// import rewardsData from './rewards.json'

const { recruitmentServiceUrl } = getConfig()

export const RECRUIT_INVITATION_START = 'RECRUIT_INVITATION_START'
export const RECRUIT_INVITATION_FINISH = 'RECRUIT_INVITATION_FINISH'
export const RECRUIT_INVITATION_ERROR = 'RECRUIT_INVITATION_ERROR'

export const RECRUIT_REWARDS_START = 'RECRUIT_REWARDS_START'
export const RECRUIT_REWARDS_FINISH = 'RECRUIT_REWARDS_FINISH'
export const RECRUIT_REWARDS_ERROR = 'RECRUIT_REWARDS_ERROR'

export const recruitRewardsStart = () => ({
    type: RECRUIT_REWARDS_START,
})

export const recruitRewardsFinish = (rewards) => ({
    type: RECRUIT_REWARDS_FINISH,
    rewards,
})

export const recruitRewardsError = (error) => ({
    type: RECRUIT_REWARDS_ERROR,
    error,
})

export const recruitRewards = () => (dispatch) => {
    dispatch(recruitRewardsStart())

    try {
        // setTimeout(() => {
        //     // console.log('rewardsData', rewardsData.rewards)
        //     dispatch(recruitRewardsFinish(rewardsData.rewards))
        // }, 100)

        const url = `${recruitmentServiceUrl}/rewards/me`
        authenticated.get(url).then(({ data }) => {
            dispatch(recruitRewardsFinish(data))
        })
    } catch (err) {
        dispatch(recruitRewardsError('Could not fetch the rewards'))
    }
}

export const recruitInvitationStart = () => ({
    type: RECRUIT_INVITATION_START,
})

export const recruitInvitationFinish = (
    invitationToken,
    invitationEnabled
) => ({
    type: RECRUIT_INVITATION_FINISH,
    invitationToken,
    invitationEnabled,
})

export const recruitInvitationError = (error) => ({
    type: RECRUIT_INVITATION_ERROR,
    error,
})

export const recruitInvitation = () => (dispatch) => {
    dispatch(recruitInvitationStart())
    try {
        const url = `${recruitmentServiceUrl}/invite/token`
        authenticated
            .get(url)
            .then(({ data }) => {
                dispatch(recruitInvitationFinish(data.token, data.isEnabled))
                // Doing this after getting token, it has to be created.
                dispatch(recruitRewards())
            })
            .catch(({ response }) => {
                // If not found then post to create token.
                if (!response) {
                    dispatch(
                        recruitInvitationError(
                            'Could not create the invitation, no response from service'
                        )
                    )
                } else if (response.status === 404) {
                    // * Have to send empty body so that Axios will not remove
                    // * Content-Type: aplication/json from the header.
                    authenticated.post(url, {}).then(({ status }) => {
                        if (status === 201) {
                            // Created, then get it again.
                            authenticated.get(url).then(({ data }) => {
                                dispatch(
                                    recruitInvitationFinish(
                                        data.token,
                                        data.isEnabled
                                    )
                                )
                                // Doing this after getting token, it has to be created.
                                dispatch(recruitRewards())
                            })
                        } else {
                            dispatch(
                                recruitInvitationError(
                                    'Could not create the invitation'
                                )
                            )
                        }
                    })
                }
            })
    } catch (err) {
        dispatch(recruitInvitationError('Could not fetch the invitation'))
    }
}
