interface ICart {
  discount: number
  price: float
  product: IProduct
  quantity: number
  sku: string
  stock: number
  total: float
  choosedPackQuantity: number
}

type IDocumentType = 'order' | 'quote' | 'return' | 'draft'

type IPriceMode = 'selfPrice' | 'updatedPrice'
