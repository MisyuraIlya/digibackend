import React from 'react'
import { useSelectedProduct } from '../../../../../store/selecterdProduct.store'
import AddToCart from '../../../../../../Cart/components/AddToCart/AddToCart'

const SubProducts = () => {
  const { loading } = useSelectedProduct()
  //   TODO
  return (
    <div>
      {!loading && (
        <>
          {/* {subProducts?.length > 0 &&
                        <h2>מוצרי בן</h2>
                    } */}
          {/* {subProducts?.map((item,index) => 
                        <div className='flex-container' key={index} style={{marginTop:'10px'}}>
                            <div className='col-lg-2' style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
                                <img className="img" 
                                    src={item.ImgPath ? item.ImgPath : process.env.REACT_APP_MEDIA + '/product/' + item.Img}
                                    onError={(e) => e.target.src = process.env.REACT_APP_MEDIA + 'logo.png'}
                                    onClick={()=> this.setState({imageModal: this.state.chosenImg})}
                                />
                            </div>    
                            <div className='col-lg-6' style={{display:'flex',justifyContent:'right',alignItems:'center'}}>
                                <div style={{paddingRight:'10px'}}>
                                    <div>
                                        <span style={{fontSize:'16px'}}>{item.Title}</span>
                                    </div>    
                                    <div>
                                        <span style={{fontSize:'14px'}}>מק"ט: {item.CatalogNumber} </span>
                                    </div>    
                                </div>    
                            </div>    
                            <div className='col-lg-4 '>
                                <div className="actions flex-container">
                                    <div className={"add-to-cart"}>
                                        <AddToCart item={item}/>
                                    </div>    
                                </div>
                            </div>    
                            
                        
                        </div>    
                    )} */}
        </>
      )}
    </div>
  )
}

export default SubProducts
