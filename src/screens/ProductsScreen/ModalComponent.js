
import Modal from '@mui/material/Modal';
import star from "../../assets/star.png"
import cartWhite from "../../assets/cartWhite.png"
import logo from "../../assets/logo.png"

const ModalComponent = ({open, close, product, handleClick}) => {

    const onImageError = (ev) => {
        ev.target.src = logo
    }

    return(
        <Modal
            open={open}
            onClose={close}
            aria-labelledby="product-quick-preview"
            aria-describedby="product-quick-preview"
        >
            <div className='product-modal'>
                <img src={product.image_link} className='product-image-modal' onError={onImageError} alt="product"/>
                <div className="sproduct-name-rating">
                    <p className="product-name-modal">{product.name}</p>
                    <div className="product-rating-modal">
                        <img className="sproduct-star" src={star} alt="star"/>
                        <p className="sproduct-rating">{product.rating ? product.rating * 20 + " / 100" : "no rating"}</p>
                    </div>
                </div>
                <p className="product-brand-modal">{product.brand}</p>
                <p className="product-price-modal"> ${product.price}</p>
                {
                    product.product_colors ?
                    <div className="sproduct-colors">
                        {(product.product_colors).map(function(item, i){
                            return ( <div key={i} className="sproduct-color" style={{background: item.hex_value}}></div>)
                        })}
                    </div>
                    :
                    <div/>
                }

                {
                    product.tag_list ?
                    <div className="sproduct-tags">
                        <p className="sproduct-tag-title"> {product.tag_list.length > 0 ? "Tags:" : ""} 
                        {(product.tag_list).map(function(item, i){
                            if(i == product.tag_list.length - 1)
                                return <span className="sproduct-tag" key={i}> {item}</span>
                            else
                                return <span className="sproduct-tag" key={i}> {item}, </span>
                        })}
                        </p>
                    </div>
                    :
                    <div/>
                }
                <p className="product-cart-modal" onClick={handleClick}>Show More</p>
            </div>
        </Modal>
    )
}


export default ModalComponent;