import { create } from 'zustand'
import CartServices from '../services/cart.services'
import { onErrorAlert, onSuccessAlert } from '../../../shared/MySweetAlert'
import moment from 'moment'
import { AdminOrderService } from '../../Admin/services/orders.service'
import { persist, createJSONStorage, PersistOptions } from 'zustand/middleware'
import {
  getAgentFromStorage,
  getUserFromStorage,
} from '../../Auth/helpers/auth.helper'

interface useCartState {
  loading: boolean

  // ========== HANDLE CART ==========
  cart: ICart[]
  setCart: (data: ICart[]) => void
  getCartItem: (product: { sku: string }) => ICart | null
  addToCart: (product: IProduct) => void
  increaseCart: (sku: string) => void
  decreaseCart: (sku: string) => void
  deleteFromCart: (sku: string) => void
  changeQuantity: (sku: string, quantity: number) => void
  changePrice: (cartItem: ICart, value: number) => void
  changeDiscount: (cartItem: ICart, value: number) => void
  changeSum: (cartItem: ICart, value: number) => void
  // ========== HANDLE CART ==========

  // ========== CART PAGE ==========
  selectedMode: IDocumentType
  comment: string
  deliveryDate: string
  Maam: number
  discount: number
  CartTitle: () => string
  setSelectedMode: (type: IDocumentType) => void
  setComment: (value: string) => void
  // ========== CART PAGE ==========

  // ========== MAIN FUNCTIONS ==========
  sendOrder: () => Promise<void>
  saveDarft: () => void
  // ========== MAIN FUNCTIONS ==========

  // ========== ALL CALCULATIONS ==========
  totalBeforeTax: () => number
  totalTax: () => number
  totalAfterTax: () => number
  finalPrice: () => number
  // ========== ALL CALCULATIONS ==========
}

export const useCart = create(
  persist(
    (set, get) => ({
      loading: false,

      // ========== HANDLE CART ==========
      cart: [],
      setCart: (data: ICart[]) => {
        set({ cart: data })
      },
      getCartItem: (product): ICart | null => {
        const cart = get().cart
        const itemFind = cart.filter((item) => item.sku === product.sku)
        if (itemFind.length > 0) {
          return itemFind[0]
        } else {
          return null
        }
      },
      addToCart: (product: IProduct) => {
        const { cart } = get()
        const cartProduct = {
          sku: product.sku,
          quantity: 1,
          product: product,
          stock: product.stock,
          price: product.finalPrice,
          discount: product.discount,
          total: 1 * product.finalPrice,
          choosedPackQuantity:
            product?.packProducts?.[0]?.pack?.quantity ??
            product?.packQuantity ??
            1,
        }

        set({ cart: [...cart, cartProduct] })
      },
      increaseCart: (sku) => {
        const cart = get().cart
        const itemIndex = cart.findIndex((item) => item.sku === sku)
        if (itemIndex !== -1) {
          cart[itemIndex].quantity += 1
          cart[itemIndex].total =
            cart[itemIndex].quantity * cart[itemIndex].price
        } else {
          console.error('Item not found in cart')
        }
        set({ cart })
      },
      decreaseCart: (sku) => {
        const cart = get().cart
        const itemIndex = cart.findIndex((item) => item.sku === sku)
        if (itemIndex !== -1) {
          cart[itemIndex].quantity -= 1
          cart[itemIndex].total =
            cart[itemIndex].quantity * cart[itemIndex].price
        } else {
          console.error('Item not found in cart')
        }
        set({ cart })
      },
      deleteFromCart: (sku) => {
        const cart = get().cart
        const filtered = cart.filter((item) => item.sku !== sku)
        set({ cart: filtered })
      },
      changeQuantity: (sku, quantity) => {
        const cart = get().cart
        const itemIndex = cart.findIndex((item) => item.sku === sku)
        if (itemIndex !== -1) {
          cart[itemIndex].quantity = +quantity
          cart[itemIndex].total = +quantity * cart[itemIndex].price
        } else {
          console.error('Item not found in cart')
        }
        set({ cart })
      },

      changePrice: (cartItem: ICart, value: number) => {
        const updatedProduct = { ...cartItem.product, finalPrice: value }
        const discountedPrice = value - (value * cartItem.discount) / 100
        const updatedCartItem = {
          ...cartItem,
          price: discountedPrice,
          product: updatedProduct,
        }
        updatedCartItem.total = updatedCartItem.quantity * discountedPrice
        set((state) => ({
          cart: state.cart.map((item) =>
            item === cartItem ? updatedCartItem : item
          ),
        }))
      },

      changeDiscount: (cartItem: ICart, value: number) => {
        const clampedDiscount = Math.max(0, Math.min(value, 100))
        const updatedCartItem = { ...cartItem, discount: clampedDiscount }
        const discountedPrice =
          updatedCartItem.product.finalPrice -
          (updatedCartItem.product.finalPrice * clampedDiscount) / 100
        updatedCartItem.price = discountedPrice
        updatedCartItem.total = updatedCartItem.quantity * discountedPrice
        set((state) => ({
          cart: state.cart.map((item) =>
            item === cartItem ? updatedCartItem : item
          ),
        }))
      },

      changeSum: (cartItem: ICart, value: number) => {
        const updatedCartItem = { ...cartItem, price: value }
        const discount =
          ((cartItem.product.finalPrice - value) /
            cartItem.product.finalPrice) *
          100
        updatedCartItem.discount = discount
        updatedCartItem.total = updatedCartItem.quantity * value

        set((state) => ({
          cart: state.cart.map((item) =>
            item === cartItem ? updatedCartItem : item
          ),
        }))
      },

      // ========== HANDLE CART ==========

      // ========== CART PAGE ==========
      selectedMode: 'order', // 1 - order | 2 - Request | 3 - Return
      deliveryDate: '2023-11-21', //TODO
      Maam: 17,
      comment: '',
      setSelectedMode: (type: IDocumentType) => set({ selectedMode: type }),
      CartTitle: () => {
        let totalTitle = 'סיכום'
        if (get().selectedMode == 'order') {
          totalTitle += ' ' + 'הזמנה'
        } else if (get().selectedMode == 'quote') {
          totalTitle += ' ' + 'ה.מחיר'
        } else if (get().selectedMode == 'return') {
          totalTitle += ' ' + 'החזרה'
        }
        totalTitle += ' | ' + getUserFromStorage().name
        return totalTitle
      },
      setComment: (value) => set({ comment: value }),
      // ========== CART PAGE ==========

      // ========== MAIN FUNCTIONS ==========

      sendOrder: async () => {
        try {
          set({ loading: true })
          const response = await CartServices.CreateOrder(
            get().comment,
            getUserFromStorage().id,
            get().finalPrice(),
            getAgentFromStorage().id,
            false,
            get().discount,
            get().selectedMode,
            +process.env.DELIVERY_PRICE!,
            get().deliveryDate,
            get().cart
          )
          if (response?.orderNumber) {
            onSuccessAlert(
              'הזמנה בוצה בהצלחה!',
              `מספר הזמנה ${response?.orderNumber}`
            )
            set({ cart: [] })
          } else {
            onErrorAlert('הזמנה לא בוצעה', response['hydra:description'])
          }
        } catch (e) {
          console.log('error', e)
        } finally {
          set({ loading: false })
        }
      },

      saveDarft: async () => {
        const cart = get().cart
        try {
          set({ loading: true })
          const totalPrice = cart.reduce(
            (acc, item) => acc + item.quantity * item.price,
            0
          )
          //  @ts-ignore
          const objHistory: IHistory = {
            //  @ts-ignore
            user: `/api/users/${getUserFromStorage().id}`,
            total: totalPrice,
            orderStatus: 'draft',
            createdAt: moment().format('YYYY-MM-DD'),
            updatedAt: moment().format('YYYY-MM-DD'),
            isSendErp: false,
            isBuyByCreditCard: false,
            //  @ts-ignore
            agent: getAgentId() ? `/api/users/${getAgentId()}` : null,
            documentType: 'draft',
          }

          const historyId = await AdminOrderService.createHistory(objHistory)
          cart.map(async (item) => {
            let objDetailed: IDocument = {
              //  @ts-ignore
              history: `/api/histories/${historyId.id}`,
              //  @ts-ignore
              product: `/api/products/${item.product.id}`,
              singlePrice: item.price,
              quantity: item.quantity,
              discount: 0,
              total: item.total,
            }
            await AdminOrderService.createHistoryDetailed(objDetailed)
          })
        } catch (e) {
          console.log('[ERROR]', e)
        } finally {
          set({ loading: false })
        }
      },

      // ========== ALL CALCULATIONS ==========

      totalBeforeTax: () => {
        const priceBefore = get().cart.reduce((accumulator, item) => {
          return accumulator + item.total
        }, 0)
        return priceBefore
      },

      totalTax: () => {
        return (get().totalBeforeTax() * get().Maam) / 100
      },

      totalAfterTax: () => {
        return get().totalBeforeTax() + get().totalTax()
      },

      finalPrice: () => {
        const deliveryPrice = +process.env.DELIVERY_PRICE!
        return deliveryPrice + get().totalAfterTax()
      },
    }),
    {
      name: 'cart-storage',
      storage: createJSONStorage(() => localStorage),
    } as PersistOptions<useCartState, useCartState>
  )
)
