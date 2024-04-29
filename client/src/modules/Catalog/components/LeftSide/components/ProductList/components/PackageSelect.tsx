import React, { FC } from 'react'
import Select from 'react-select'
import { useCart } from '../../../../../../Cart/store/cart.store'
type PackageSelectProps = {
  product: IProduct
}

const customStyles = {
  control: (provided: any, state: any) => ({
    ...provided,
    background: state.isSelected ? '#2c1e5d' : 'white',
    fontSize: '14px',
  }),
  option: (provided: any, state: any) => ({
    ...provided,
    background: state.isSelected ? '#2c1e5d' : 'white',
    color: state.isSelected ? 'white' : 'black',
    fontSize: '14px',
  }),
}

const PackageSelect: FC<PackageSelectProps> = ({ product }) => {
  const { changePackQuantity, addToCart, getCartItem } = useCart()

  const inCart = getCartItem(product)

  const defaultOption =
    product?.packProducts?.find(
      (item) => item.pack.quantity === inCart?.choosedPackQuantity
    ) ||
    product?.packProducts?.[0] ||
    []

  const handleChangeQuantity = (value: number) => {
    if (inCart) {
      changePackQuantity(product, value)
    } else {
      addToCart(product)
      changePackQuantity(product, value)
    }
  }
  return (
    <>
      {product?.packProducts?.length > 0 ? (
        <Select
          styles={customStyles}
          options={product?.packProducts.map((item) => {
            return {
              value: item.pack.quantity,
              label: item.pack.name + ' - ' + item.pack.quantity + ' ' + "יח'",
            }
          })}
          placeholder={'בחר מארז'}
          onChange={(e) => handleChangeQuantity(+e?.value!)}
          value={{
            value: defaultOption?.pack.quantity,
            label:
              defaultOption?.pack.name +
              ' - ' +
              defaultOption?.pack.quantity +
              ' ' +
              "יח'",
          }}
        />
      ) : (
        <Select
          styles={customStyles}
          options={[{ value: 1, label: 'יחידה 1' }]}
          placeholder={'בחר מארז'}
          onChange={(e) => handleChangeQuantity(+e?.value!)}
          value={[{ value: 1, label: 'יחידה 1' }]}
        />
      )}
    </>
  )
}

export default PackageSelect
