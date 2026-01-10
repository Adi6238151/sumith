export interface SanityImage {
  _type: string
  asset: {
    _ref: string
    _type: string
  }
  hotspot?: {
    x: number
    y: number
    height: number
    width: number
  }
}

export interface PortableTextBlock {
  _type: string
  _key?: string
  style?: string
  children?: Array<{
    _type: string
    marks?: string[]
    text: string
  }>
  listItem?: string
  level?: number
  markDefs?: Array<{
    _type: string
    _key: string
    href?: string
  }>
}

export interface Feature {
  featureTitle: string
  featureDescription: string
  icon?: SanityImage
}

export interface Specification {
  label: string
  value: string
}

export interface SupportLink {
  linkTitle: string
  linkUrl: string
  fileType?: string
}

export interface Support {
  supportText?: PortableTextBlock[]
  downloadLinks?: SupportLink[]
}

export interface Ordering {
  price?: number
  availability: 'In Stock' | 'Out of Stock' | 'Coming Soon'
}

export interface Slug {
  current: string
}

export interface Product {
  _id: string
  productName: string
  modelNumbers?: string[]
  slug: Slug
  shortDescription: string
  longDescription?: PortableTextBlock[]
  featuredImage: SanityImage
  productImages?: SanityImage[]
  specifications?: Specification[]
  features?: Feature[]
  support?: Support
  ordering: Ordering
}

export interface ProductCardProps {
  product: Product
  isSelected: boolean
  onClick: () => void
}

export interface ProductDetailProps {
  product: Product
}

export interface ProductTabsProps {
  features?: Feature[]
  specifications?: Specification[]
  support?: Support
}
