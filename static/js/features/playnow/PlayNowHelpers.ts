import { isClient } from 'config/web'
import {
    StreamUrlRequestModel,
    ClientInfo,
} from './models/LaunchUrlPostBodyModel'

export function getClientInfo(ownername: string): ClientInfo {
    if (isClient) {
        const canvas = document.createElement('canvas')
        const gl = canvas.getContext('webgl')
        let gpuInfo = 'UNKNOWN'
        if (!gl) {
            console.log('webgl not available')
        } else {
            const debugInfo = gl.getExtension('WEBGL_debug_renderer_info')
            if (debugInfo) {
                gpuInfo = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL)
            } else {
                console.log('no debuginfo')
            }
        }

        const clientInfo: ClientInfo = {
            cpu: [
                {
                    numcores: window.navigator.hardwareConcurrency,
                },
            ],
            gpu: [
                {
                    gpuid: gpuInfo,
                },
            ],
            static_sys_state: {
                screenwidth: window.screen.width,
                screenheight: window.screen.height,
                os: window.navigator.userAgent,
                ownername,
                clienttype: 'kBrowserClient',
            },
        }
        return clientInfo
    }
    return null
}

export function getLaunchUrlBody(
    username: string,
    sessionEndedUrl: string
): StreamUrlRequestModel {
    const body: StreamUrlRequestModel = {
        username,
        sessionEndedUrl,
        clientInfo: getClientInfo(username),
    }

    return body
}

export function getOsInfo(ownername: string): ClientInfo | null {
    if (isClient) {
        // const osInfo = window.navigator.userAgent
        // let os = 'Unknown'
        // if (osInfo.indexOf('Windows') !== -1) {
        //     os = 'Windows'
        // } else if (osInfo.indexOf('Mac') !== -1) {
        //     os = 'Mac/iOS'
        // } else if (osInfo.indexOf('X11') !== -1) {
        //     os = 'UNIX'
        // } else if (osInfo.indexOf('Linux') !== -1) {
        //     os = 'Linux'
        // }
        const canvas = document.createElement('canvas')
        const gl = canvas.getContext('webgl')
        let gpuInfo = 'UNKNOWN'
        if (!gl) {
            console.log('webgl not available')
        } else {
            const debugInfo = gl.getExtension('WEBGL_debug_renderer_info')
            if (debugInfo) {
                gpuInfo = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL)
            } else {
                console.log('no debuginfo')
            }
        }

        const body: ClientInfo = {
            cpu: [
                {
                    numcores: window.navigator.hardwareConcurrency,
                },
            ],
            gpu: [
                {
                    gpuid: gpuInfo,
                },
            ],
            static_sys_state: {
                screenwidth: window.screen.width,
                screenheight: window.screen.height,
                os: window.navigator.userAgent,
                ownername,
                clienttype: 'kBrowserClient',
            },
        }
        return body
    }
    return null
}
