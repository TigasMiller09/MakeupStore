import {useState, useEffect} from 'react'
import { useNavigate } from "react-router-dom";
import { useSearchParams } from 'react-router-dom';
import star from "../../assets/star.png"
import logo from "../../assets/logo.png"
import toast, { Toaster } from 'react-hot-toast';

import './SingleProductScreen.css';
import HeaderComponent from '../../components/HeaderComponent';
import {getSingleProduct, getRelatedProducts} from '../../api/apiFunctions'
import ProductComponent from '../ProductsScreen/ProductComponent';
import ModalComponent from '../ProductsScreen/ModalComponent'


const ProductsScreen = ({location}) => {
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const [product, setProduct] = useState(null)
    const [relatedProducts, setRelatedProducts] = useState(null)
    const [openModal, setOpenModal] = useState(false)
    const [quickProduct, setQuickProduct] = useState({product: {}, i: null})

    useEffect(() => {
        //get product if from url
        const productId = searchParams.get('id')

        //fetch product
        getSingleProduct(productId)
        .then(response => response.json())
        .then(data => { //if product success
           setProduct(data)

           //fetch related products
           getRelatedProducts(data.brand.replace(/ /g,"%20"))
           .then(response => response.json())
           .then(data => {
               setRelatedProducts(data)
           })
           .catch(() => {toast.error("Error getting related products")})
        })
        .catch(() => {toast.error("Error getting the product")})
    }, [])

    const onImageError = (ev) => {
        ev.target.src = logo
    }

    const handleOpenProduct = (index) => {
        navigate({
            pathname: '/product',
            search: '?id=' + relatedProducts[index].id,
          });
        window.location.reload(false);
    }

    const handleAddToCart = () => {
        toast.success('Item added to cart', {
            style: {
              border: '1px solid #292933',
              padding: '16px',
              color: '#292933',
            },
            iconTheme: {
              primary: '#292933',
              secondary: '#ffffff',
            },
          });
    }

    const handleQuickPreview = (index) => {
        setQuickProduct({product:relatedProducts[index], i: index})
        setOpenModal(true)
    }

    return (
        <div className="App" id="main">
        <Toaster />
        <HeaderComponent />
        <div className="sproduct">
            {product === null
            ?
                <p>Loading..</p>
            :
                <div>
                    <div className="sproduct-div">
                        <div className="sproduct-image-div">
                            <img className="sproduct-image" src={product.image_link} onError={onImageError} alt="product"/>
                        </div>
                        <div className="sproduct-info-div">
                            <div className="sproduct-name-rating">
                                <p className="sproduct-name">{product.name}</p>
                                <div className="sproduct-rating">
                                    <img className="sproduct-star" src={star} alt="star"/>
                                    <p className="sproduct-rating">{product.rating ? product.rating * 20 + " / 100" : "no rating"}</p>
                                </div>
                            </div>
                            <p className="sproduct-brand">{product.brand}</p>
                            <p className="sproduct-price"> ${product.price}</p>
                            <div className="sproduct-colors">
                                {(product.product_colors).map(function(item, i){
                                    return (<div key={i} className="sproduct-color" style={{background: item.hex_value}}></div>)
                                })}
                            </div>

                            <div className="sproduct-tags">
                                <p className="sproduct-tag-title"> Tags:  
                                {(product.tag_list).map(function(item, i){
                                    if(i === product.tag_list.length - 1)
                                        return <span className="sproduct-tag" key={i}> {item}</span>
                                    else
                                        return <span className="sproduct-tag" key={i}> {item}, </span>
                                })}
                                </p>
                            </div>
                            <p className="sproduct-description">{product.description}</p>
                            <p className="sproduct-cart" onClick={handleAddToCart}>Add to Cart</p>
                        </div>
                    </div>
                    <p className="sproduct-related-products-title">Related Products</p>
                    <div className="sproduct-related-products">
                        {relatedProducts === null
                            ?
                                <p className='load-related'>Loading..</p>
                            :
                                relatedProducts.map(function(item, i){
                                    return <ProductComponent 
                                        key={i} 
                                        name={item.name} 
                                        price={item.price} 
                                        priceSign={item.price_sign} 
                                        brand={item.brand} 
                                        image={item.image_link}
                                        rating={item.rating}
                                        handleClick={() => handleOpenProduct(i)}
                                        addToCart={handleAddToCart}
                                        index={i}
                                        openQuick={handleQuickPreview}
                                    />
                                })
                        }
                    </div>
                </div>
            }
        </div>
        <ModalComponent 
            open={openModal} 
            close={() => {setOpenModal(false)}}
            product={quickProduct.product}
            handleClick={() => handleOpenProduct(quickProduct.i)}
            addToCart={handleAddToCart}
        />
      </div>
        
    );
}

export default ProductsScreen;
