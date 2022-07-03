enum DataLayerEventsEnum {
  Initialize = 'Session Initiated Step',
  Start = 'Start Step',
  Finish = 'Session Ended Step',
  SpeedTestStart = 'Speed Test Running Step',
  SpeedTestFailed = 'Speed Test Failed Step',
  UnexpectedError = 'Unexpected Error',
  StartPageNotLoggedIn = 'Visit, not logged in',
  StartPageCountryNotSupported = 'Country not supported',
  StartPageLoginBtnClick = 'Login click',
  StartPageAlphaPlayer = 'Visit, Alpha',
  StartPageBuyNowClick = 'Buy now click',
  StartPageInsufficientPlex = 'Not enough PLEX popup',
  StartPageBuyPlexClick = 'Buy PLEX click',
}

export default DataLayerEventsEnum
