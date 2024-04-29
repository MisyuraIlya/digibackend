// ============= Documents =============
type OrderStatus = 'paid' | 'draft' | 'pending' | 'faild'

type IDocumentTypes =
  | 'history'
  | 'draft'
  | 'order'
  | 'priceOffer'
  | 'deliveryOrder'
  | 'aiInvoice'
  | 'ciInvoice'
  | 'returnOrder'
  | 'kartesset'

interface IDocument {
  id: number
  documentNumber: string
  documentType: IDocumentTypes
  userName: string
  userExId: string
  agentExId: string
  agentName: string
  status: string
  createdAt: string
  updatedAt: string
  total: number
}

// ============= Documents =============

// ============= Documents Items =============

interface IDocumentItems {
  products: {
    'hydra:totalItems': number
    'hydra:member': IDocumentItem[]
  }
  totalTax: number
  totalPriceAfterTax: number
  totalAfterDiscount: number
  totalPrecent: number
  documentType: string
  files: {
    'hydra:totalItems': number
    'hydra:member': IDocumentItemsFile[]
  }
}

interface IDocumentItem {
  '@type': string
  '@id': string
  sku: string
  title: string
  quantity: number
  priceByOne: number
  total: number
  discount: number
  product: IProduct
}

interface IDocumentItemsFile {
  name: string
  base64: string
}

// ============= Documents Items =============

interface DocumentsResponse extends Hydra {
  'hydra:member': IDocument[]
}
