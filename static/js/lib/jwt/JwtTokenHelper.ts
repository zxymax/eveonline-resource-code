import decode, { JwtPayload } from 'jwt-decode'

export default class JwtTokenHelper {
    /**
     * Helper function that extract user id from jwt token
     * @param token jwt token to process
     * @returns USERID from the sub property that is on the form USER:EVE:USERID
     */
    static getUserId(token: string): number {
        try {
            const payload = decode<CcpJwtPayload>(token)
            if (payload) {
                const sub = payload.sub

                const subSplit = sub.split(':')
                if (subSplit.length === 3) {
                    const userId = Number(subSplit[2])
                    return userId
                }
            }
        } catch (error) {
            // Nothing to do, just returns null
        }
        return null
    }

    static getUsername(token: string): string {
        try {
            const payload = decode<CcpJwtPayload>(token)
            if (payload) {
                return payload.name
            }
        } catch (error) {
            // Nothing to do, just returns null
        }

        return null
    }
}

interface CcpJwtPayload extends JwtPayload {
    name?: string
    scp?: [string]
    azp: string
    tenant: string
    tier: string
    region: string
}
