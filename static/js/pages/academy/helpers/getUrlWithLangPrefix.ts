export default function getUrlWithLangPrefix(
  lang: string,
  page: string,
  url: string
): string {
  // const language = useSelector((state) => getLanguage(state))
  const baseUrl = page ? `/${page}` : ''
  return lang !== 'en' ? `/${lang}${baseUrl}${url}` : `${baseUrl}${url}`
}
