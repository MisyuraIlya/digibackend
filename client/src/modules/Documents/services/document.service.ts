import axios from 'axios'
import moment from 'moment'

interface RestoreCartResponse extends Hydra {
  'hydra:member': ICart[]
}
export const DocumentsService = {
  async GetDocuments(
    user: IUser,
    documentType: string,
    fromDate: Date,
    toDate: Date,
    page: string | number
  ): Promise<DocumentsResponse> {
    const fromConverted = moment(fromDate).format('YYYY-MM-DD')
    const toDateConverted = moment(toDate).format('YYYY-MM-DD')

    let url = `${process.env.REACT_APP_API}/api/documents/${documentType}/${fromConverted}/${toDateConverted}?page=${page}`

    if (
      user.role === 'ROLE_USER' ||
      user.role === 'ROLE_AGENT' ||
      user.role === 'ROLE_SUPER_AGENT' ||
      user.role === null
    ) {
      url += `&userId=${user.id}`
    }
    const response = await axios.get(url)
    return response.data
  },

  async GetDocumentsItem(
    documentItemType: IDocumentTypes,
    documentNumber: number | string,
    user?: IUser
  ): Promise<IDocumentItems> {
    let apiUrl = `${process.env.REACT_APP_API}/api/documentItems/${documentItemType}/${documentNumber}`
    if (user) {
      apiUrl += `?userExId=${user.id}`
    }
    const response = await axios.get(apiUrl)
    return response.data
  },

  async RestoreCart(
    documentType: string,
    table: string,
    userExtId: string,
    documentNumber: string,
    PriceMode: IPriceMode
  ): Promise<ICart[] | null> {
    const response = await axios.get(
      `${process.env.REACT_APP_API}/api/restoreCart/${documentType}/${table}/${PriceMode}/${userExtId}/${documentNumber}`
    )
    if (response.data) {
      return response.data['hydra:member']
    } else {
      return null
    }
  },

  // async createPdf(data: IPdfDocument) {
  //   const response = await axios.post(
  //     `${process.env.REACT_APP_API}/api/pdf`,
  //     data
  //   )
  //   return response.data
  // },
  // async createXl(data: IPdfDocument) {
  //   const response = await axios.post(
  //     `${process.env.REACT_APP_API}/api/xl`,
  //     data
  //   )
  //   return response.data
  // },
}
