export const allowUrls = [
  /www\.eveonline\.com/,
  /eveonline\.com/,
  /ccpeveweb\.com/,
  /amazonaws\.com/,
  /googletagmanager\.com/,
  /localhost/,
]

export const denyUrls = [
  // Cookiebot script error
  /consent\.cookiebot\.com/i,
  // Facebook flakiness
  /graph\.facebook\.com/i,
  // Facebook blocked
  /connect\.facebook\.net\/en_US\/all\.js/i,
  // Woopra flakiness
  /eatdifferent\.com\.woopra-ns\.com/i,
  /static\.woopra\.com\/js\/woopra\.js/i,
  // Chrome extensions
  /extensions\//i,
  /^chrome:\/\//i,
  // Other plugins
  /127\.0\.0\.1:4001\/isrunning/i, // Cacaoweb
  /webappstoolbarba\.texthelp\.com\//i,
  /metrics\.itunes\.apple\.com\.edgesuite\.net\//i,
  // Firefox extensions
  /moz-extension\//i,
]

export const ignoreErrors = [
  // Random plugins/extensions
  'top.GLOBALS',
  // See: http://blog.errorception.com/2012/03/tale-of-unfindable-js-error.html
  'originalCreateNotification',
  'canvas.contentDocument',
  'MyApp_RemoveAllHighlights',
  'http://tt.epicplay.com',
  "Can't find variable: ZiteReader",
  'jigsaw is not defined',
  'ComboSearch is not defined',
  'http://loading.retry.widdit.com/',
  'atomicFindClose',
  // Facebook borked
  'fb_xd_fragment',
  // ISP "optimizing" proxy - `Cache-Control: no-transform` seems to reduce this. (thanks @acdha)
  // See http://stackoverflow.com/questions/4113268/how-to-stop-javascript-injection-from-vodafone-proxy
  'bmi_SafeAddOnload',
  'EBCallBackMessageReceived',
  // See http://toolbar.conduit.com/Developer/HtmlAndGadget/Methods/JSInjection.aspx
  'conduitPage',
  // Generic error code from errors outside the security sandbox
  // You can delete this if using raven.js > 1.0, which ignores these automatically.
  'Script error.',
  // Adding Custom Errors. Ingvi Rafn Hafþórsson
  'WeixinJSBridge is not defined',
  'vid_mate_check is not defined',
  // Cookiebot error
  't.className.match is not a function',
  "Object doesn't support property or method 'match'", // Edge
  // Illegal character reported in different browsers
  'Invalid or unexpected token', // Chrome
  'illegal character', // Firefox
  'Invalid character', // Edge
  // jWQuery windows 7 strange error
  '$ is not defined',
  // Ignoring native code execution errors.
  '[native code]',
  'NS_ERROR_NOT_INITIALIZED',
  'NS_ERROR_ILLEGAL_VALUE',
  'URLSearchParams',
  't.indexOf is not a function',
  'r.indexOf is not a function',
  "Can't find variable: sds",
  "Failed to execute 'pushState' on 'History'",
]
