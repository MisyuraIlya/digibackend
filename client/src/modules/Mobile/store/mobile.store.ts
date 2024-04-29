import { create } from 'zustand'

interface useMobileState {
  loading: boolean
  isIPhone: boolean
  isAndroid: boolean
  isPwa: boolean
  isMobile: boolean
  showMobileSearch: boolean
  setSHowMobileSearch: (value: boolean) => void
}

export const useMobile = create<useMobileState>((set, get) => ({
  // STATES
  loading: false,
  isMobile: false,
  isIPhone: /iPhone/i.test(navigator.userAgent),
  isAndroid: /Android/i.test(navigator.userAgent),
  isPwa: window.matchMedia('(display-mode: standalone)').matches,

  //header
  showMobileSearch: false,
  setSHowMobileSearch: (value: boolean) => set({ showMobileSearch: value }),
}))
