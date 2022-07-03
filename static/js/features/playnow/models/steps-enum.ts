enum StepsEnum {
  Run = 'run',
  Start = 'start',
  Running = 'running', // Might not be used but was missing in switch case
  End = 'end',
  Download = 'download',
  Launching = 'launching',
  NoLogin = 'no_login',
  NoOmega = 'no_omega',
  NoServers = 'no_servers',
  NoSpeed = 'no_speed',
  NoUrl = 'no_url',
  Done = 'done',
  Error = 'error',
}

export default StepsEnum
