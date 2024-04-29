import React, { FC } from 'react'

type TagsProps = {
  product: IProduct
}

const Tags: FC<TagsProps> = ({ product }) => {
  return (
    <>
      <div className="flip-card">
        <div className="flip-card-inner">
          {/* {product?.discoint && <p className="c-sale">{'מבצע'}</p>} */}
          {/* {product?.stock <= 0 && <p className="c-sale">{'אין מלאי'}</p>} */}

          {/* {product?.Tags?.map((tagEle, tagInd) => {
                    return (
                        <p key={tagInd} className={tagEle.ColorCls}>{tagEle.WebTitle}</p>
                    )
                })} */}

          {/* {product.stock < 10 && <p className="c4">{'אחרונים במלאי'}</p>} */}
        </div>
      </div>

      {/* {product.RePrice && 
            <div className={"favorite-cont change_price_cont"}> 
                <span className="material-symbols-outlined">price_change</span>
            </div>
        } */}
    </>
  )
}

export default Tags
