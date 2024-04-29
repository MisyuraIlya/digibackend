import { create } from 'zustand'
import { AdminProductService } from '../services/products.service'

interface useProductsEditStoreState {
  products: IProduct[]
  productsRezerved: IProduct[]
  search: string
  setSearch: (search: string) => void
  setProducts: (arr: IProduct[]) => void
  selectedProduct: IProduct | null
  setSelectedProduct: (product: IProduct | null) => void
  deleteImageFunc: (imageId: number | string) => Promise<void>
  updateProduct: (product: any) => Promise<void>
}

export const useProductsEditStore = create<useProductsEditStoreState>(
  (set, get) => ({
    products: [],
    setProducts: (arr) => set({ products: arr, productsRezerved: arr }),
    productsRezerved: [],
    search: '',
    setSearch: (search: string) => {
      if (search) {
        const filter = get().products.filter(
          (item) => item.title.includes(search) || item.sku.includes(search)
        )
        set({ products: filter })
      } else {
        set({ products: get().productsRezerved })
      }
      set({ search })
    },

    selectedProduct: null,
    setSelectedProduct: (product) => set({ selectedProduct: product }),
    deleteImageFunc: async (imageId: number | string) => {
      let newSelected = get().selectedProduct
      if (newSelected) {
        let newImages = newSelected?.imagePath.filter(
          (item) => item.id !== imageId
        )
        newSelected.imagePath = newImages
        set({ selectedProduct: newSelected })
      }
      await AdminProductService.deleteImage(imageId)
    },
    updateProduct: async (product: any) => {
      try {
        const res = await AdminProductService.updateProduct(product)
        set({ selectedProduct: res })
      } catch (e) {
        console.log('error', e)
      }
    },
  })
)
