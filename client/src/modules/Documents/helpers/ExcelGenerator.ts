import ExcelJS from 'exceljs'

export const ExcelGeneratorIDocuments = (items: IDocumentItems) => {
  const workbook = new ExcelJS.Workbook()
  const worksheet = workbook.addWorksheet('Sheet 1')
  worksheet.addRow(['מק״ט', 'שם פריט', 'כמות', 'מכיר ליחידה', 'הנחה', 'סה״כ'])
  items?.products?.['hydra:member']?.map((item) => {
    worksheet.addRow([
      item.sku,
      item.product.title,
      item.quantity,
      item.priceByOne,
      item.discount,
      item.total,
    ])
  })

  workbook.xlsx.writeBuffer().then((buffer) => {
    const blob = new Blob([buffer], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'document.xlsx'
    a.click()
    window.URL.revokeObjectURL(url)
  })
}
