import axios from 'axios'

const CartServices = {
  async CreateOrder(
    comment: string,
    userExtId: string,
    total: number,
    agentId: number,
    isBuyByCreditCard: boolean,
    discount: number,
    documentType: IDocumentType,
    deliveryPrice: number,
    deliveryDate: string,
    products: ICart[]
  ) {
    const obj = {
      comment,
      userExtId,
      total,
      agentId,
      isBuyByCreditCard,
      discount,
      documentType,
      deliveryPrice,
      deliveryDate,
      products,
      user: '',
    }
    const response = await axios.post(
      `${process.env.REACT_APP_API}/api/send_orders`,
      obj
    )
    return response.data
  },
}

export default CartServices
