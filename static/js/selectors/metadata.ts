import { MetadataType } from 'models/types/ts/metadataType'
import PageType from 'models/types/ts/pageType'

const getMetadata = (page: PageType): MetadataType => {
  if (page) {
    const {
      metaTitle = '',
      metaDescription = '',
      metaImage = '',
      // robots = '',
    } = page
    const image = metaImage && metaImage.url ? metaImage.url : metaImage as string
    const metadata = {
      title: metaTitle,
      description: metaDescription,
      image,
      robots: '',
    }
    return metadata
  }

  // Returning object still, returning null or undefined now will break code elsewhere, it needs better null checks there
  const emptyMetadata: MetadataType = {
    title: '',
    description: '',
    image: '',
    robots: '',
  }
  return emptyMetadata
}

export default getMetadata

