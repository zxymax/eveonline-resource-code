export default function getInternalLinkPath(url) {
  // TODO UNIT TEST THIS MAN!!
  if (!url) return {}

  const split = url.split('/')
  const path = {}
  if (split[0]) {
      path.page = split[0]
  }

  if (split[1]) {
      path.subpage = split[1]
  }

  if (split[2]) {
      path.id = split[2]
  }

  // console.log('path', path)
  return path
}
