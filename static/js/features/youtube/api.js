// --------------------------------------------------------------------------
// --- DOM Manipulation
// --------------------------------------------------------------------------

export function getIframe(ready, player) {
  if (!ready || !player.getIframe) return null
  return player.getIframe()
}

export function destroy(ready, player) {
  if (!ready || !player.destroy) return null
  return player.destroy()
}

// --------------------------------------------------------------------------

// --------------------------------------------------------------------------
// --- Playback Status
// --------------------------------------------------------------------------

export function getFractionLoaded(ready, player) {
  if (!ready || !player.getVideoLoadedFraction) return null
  return player.getVideoLoadedFraction()
}

export function getPlayerState(ready, player) {
  if (!ready || !player.getPlayerState) return null
  return player.getPlayerState()
}

export function getCurrentTime(ready, player) {
  if (!ready || !player.getCurrentTime) return null
  return player.getCurrentTime()
}

// --------------------------------------------------------------------------

// --------------------------------------------------------------------------
// --- Video Information
// --------------------------------------------------------------------------

export function getDuration(ready, player) {
  if (!ready || !player.getDuration) return null
  return player.getDuration()
}

export function getVideoUrl(ready, player) {
  if (!ready || !player.getVideoUrl) return null
  return player.getVideoUrl()
}

export function getVideoEmbedCode(ready, player) {
  if (!ready || !player.getVideoEmbedCode) return null
  return player.getVideoEmbedCode()
}

export function getFractionPlayed(ready, player) {
  if (!ready || !getDuration(ready, player) || !getCurrentTime(ready, player))
      return null
  return getCurrentTime(ready, player) / getDuration(ready, player)
}

// --------------------------------------------------------------------------

// --------------------------------------------------------------------------
// --- Playing a Video
// --------------------------------------------------------------------------

export function play(ready, player) {
  if (!ready || !player.playVideo) return
  player.playVideo()
}

export function pause(ready, player) {
  if (!ready || !player.pauseVideo) return
  player.pauseVideo()
}

export function stop(ready, player) {
  if (!ready || !player.stopVideo || !getIframe(ready, player)) return
  if (!document.body.contains(getIframe(ready, player))) return
  player.stopVideo()
}

export function seekTo(ready, player, fraction) {
  if (!ready || !player.seekTo) return
  player.seekTo(getDuration(ready, player) * fraction)
}

// --------------------------------------------------------------------------

// --------------------------------------------------------------------------
// --- Volume
// --------------------------------------------------------------------------

export function mute(ready, player) {
  if (!ready || !player.mute) return
  player.mute()
}

export function unMute(ready, player) {
  if (!ready || !player.unMute) return
  player.unMute()
}

export function isMuted(ready, player) {
  if (!ready || !player.isMuted) return null
  return player.isMuted()
}

export function setVolume(ready, player, fraction) {
  if (!ready || !player.setVolume) return
  player.setVolume(fraction * 100)
}

export function getVolume(ready, player) {
  if (!ready || !player.getVolume) return null
  return player.getVolume() / 100
}

// --------------------------------------------------------------------------

// --------------------------------------------------------------------------
// --- Playback Rate
// --------------------------------------------------------------------------

export function getPlaybackRate(ready, player) {
  if (!ready || !player.getPlaybackRate) return null
  return player.getPlaybackRate()
}

export function setPlaybackRate(ready, player, rate) {
  if (!ready || !player.setPlaybackRate) return
  player.setPlaybackRate(rate)
}

export function getAvailablePlaybackRates(ready, player) {
  if (!ready || !player.getAvailablePlaybackRates) return null
  return player.getAvailablePlaybackRates()
}

// --------------------------------------------------------------------------

// --------------------------------------------------------------------------
// --- Playback Quality
// --------------------------------------------------------------------------

export function getPlaybackQuality(ready, player) {
  if (!ready || !player.getPlaybackQuality) return null
  return player.getPlaybackQuality()
}

export function setPlaybackQuality(ready, player, quality) {
  if (!ready || !player.setPlaybackQuality) return
  player.setPlaybackQuality(quality)
}

export function getAvailableQualityLevels(ready, player) {
  if (!ready || !player.getAvailableQualityLevels) return null
  return player.getAvailableQualityLevels()
}

// --------------------------------------------------------------------------

// --------------------------------------------------------------------------
// --- Event Listeners
// --------------------------------------------------------------------------

export function addEventListener(ready, player, event, listener) {
  if (!ready || !player.addEventListener) return
  player.addEventListener(event, listener)
}

export function removeEventListener(ready, player, event, listener) {
  if (!ready || !player.removeEventListener) return
  player.removeEventListener(event, listener)
}

// --------------------------------------------------------------------------
