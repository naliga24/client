import { UAParser } from 'ua-parser-js'

let userAgent;

if (typeof window !== 'undefined') {
    userAgent = window?.navigator?.userAgent;
}

const parser = new UAParser(userAgent)
const { type } = parser.getDevice()

export const isMobile = type === 'mobile' || type === 'tablet'
const platform = parser.getOS().name
export const isIOS = platform === 'iOS'
export const isNonIOSPhone = !isIOS && type === 'mobile'
