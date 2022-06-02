import './ProductsScreen.css';
import star from "../../assets/star.png"
import cartWhite from "../../assets/cartWhite.png"
import logo from "../../assets/logo.png"

function ProductComponent({name, brand, price, addToCart, image, rating, handleClick, openQuick, index}) {

    const onImageError = (ev) => {
        ev.target.src = logo
    }

    return (
        <div className='product' onClick={handleClick}>
            <div className="product-score-div">
                <div>
                    <img src={star} alt="star"/>
                    <p >{rating ? rating * 20 : "no rating"}</p>
                </div>
            </div>
            <img src={image} className='product-image' onError={onImageError} onClick={(e) => {e.stopPropagation();openQuick(index)}} alt="product"/>
            <p className='product-name'>{name}</p>
            <p className='product-brand'>{brand}</p>
            <div className='product-price-cart'>
                <p className='product-price'>${price}</p>
                <div onClick={(e) => {e.stopPropagation();addToCart()}}>
                    <img src={cartWhite} alt="cart"/>
                </div>
            </div>
        </div>
    );
}

export default ProductComponent;