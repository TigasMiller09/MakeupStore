import {useState, useEffect} from 'react'
import { useNavigate } from "react-router-dom";
import { useSearchParams } from 'react-router-dom';
import arrowDown from "../../assets/arrowDown.png"
import arrowUp from "../../assets/arrowUp.png"
import toast, { Toaster } from 'react-hot-toast';

import './ProductsScreen.css';
import ProductComponent from './ProductComponent';
import TagComponent from './TagComponent';
import RatingComponent from './RatingComponent';
import HeaderComponent from '../../components/HeaderComponent';
import {getProducts} from '../../api/apiFunctions'
import ModalComponent from './ModalComponent'

const initialTags = [
    {name: "Canadian", value: "canadian", checked: false},
    {name: "Cert Clean", value: "certclean", checked: false},
    {name: "Cruelty Free", value: "cruelty free", checked: false},
    {name: "Dairy Free", value: "Dairy Free", checked: false},
    {name: "EWG Verified", value: "EWG Verified", checked: false},
    {name: "Eco Cert", value: "EcoCert", checked: false},
    {name: "Fair Trade", value: "Fair Trade", checked: false},
    {name: "Gluten Free", value: "Gluten Free", checked: false},
    {name: "Hypoallergenic", value: "Hypoallergenic", checked: false},
    {name: "No Talc", value: "No Talc", checked: false},
    {name: "Non-GMO", value: "Non-GMO", checked: false},
    {name: "Organic", value: "Organic", checked: false},
    {name: "Peanut Free", value: "Peanut Free Product", checked: false},
    {name: "Sugar Free", value: "Sugar Free", checked: false},
    {name: "USDA Organic", value: "USDA Organic", checked: false},
    {name: "Vegan", value: "Vegan", checked: false},
    {name: "Alcohol Free", value: "alcohol free", checked: false},
    {name: "Oil Free", value: "oil free", checked: false},
    {name: "Purpicks", value: "purpicks", checked: false},
    {name: "Silicone Free", value: "silicone free", checked: false},
    {name: "Water Free", value: "water free", checked: false},
]

const initialRatings = [
    {name: "80 - 100", value: "80", checked: false},
    {name: "60 - 78", value: "60", checked: false},
    {name: "40 - 58", value: "40", checked: false},
    {name: "20 - 38", value: "20", checked: false},
    {name: "0 - 18", value: "0", checked: false},
    {name: "All ratings", value: "all", checked: false},
]

const ProductsScreen = ({location}) => {
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const [tags, setTags] = useState([])
    const [ratings, setRatings] = useState([])
    const [rating, setRating] = useState(null)
    const [tagsLink, setTagsLink] = useState([])
    const [allProducts, setAllProducts] = useState(null)
    const [products, setProducts] = useState(null)
    const [pagination, setpagination] = useState(15)
    const [showFilters, setShowFilters] = useState(true)
    const [windowWidth, setWindowWidth] = useState(window.innerWidth)
    const [openModal, setOpenModal] = useState(false)
    const [quickProduct, setQuickProduct] = useState({product: {}, i: null})

    useEffect(() => {
        window.addEventListener('resize', updateWidth);
    }, [])

    const updateWidth = () => {
        setWindowWidth(window.innerWidth)
    }

    useEffect(() => {

        //get tags param and convert to array
        const tagParams = searchParams.get('tags')
        const tagsArray = tagParams ? tagParams.split(',') : []

        //get rating param and convert to number from 0-100
        const ratingParams = searchParams.get('rating')
        const ratingArray = ratingParams ? ratingParams.split(',') : []
        const rating = ratingArray.length === 0 ? 80 :ratingArray[0] === "all" ? "all" : Number(ratingArray[0]) >= 80 ? 80 : Number(ratingArray[0]) >= 60 ? 60 : Number(ratingArray[0]) >= 40 ? 40 : Number(ratingArray[0]) >= 20 ? 20 : 0

        //fetch products 
        getProducts(tagParams ? tagParams.replace(/ /g,"%20") : "", rating) //if tag name has space, replace it with "%20" for url
        .then(response => response.json())
        .then(data => {
            //sort products by rating
            const sorted = data.sort((a, b) => a.rating < b.rating ? 1 : -1)
            setAllProducts(sorted)

            //paginated products. 15 at a time
            setProducts(sorted.slice(0,15))
            setpagination(pagination+15)
        })
        .catch(() => {toast.error("Error getting products")})
        
        //check url current tags
        initialTags.forEach(element => {
            if(tagsArray.some(item => item === element.value))
                element.checked = true
        });

        //check url current rating
        initialRatings.forEach(element => {
            if(rating.toString() === element.value)
                element.checked = true
        });

        setTags(initialTags)
        setRatings(initialRatings)
        setTagsLink(tagsArray)
        setRating(rating)
    }, [])


    const handleChangeUrl = (valueTag, checkedTag, valueRating) => {
        let tagsTempArray = tagsLink

        //if rating was changed use new value. if it wasnt stick with the old one
        let ratingNew = valueRating != null ? valueRating : rating

        //if tags were changed
        if(valueTag !== null){
            if(checkedTag){
                //if a new tag was added
                tagsTempArray.push(valueTag)
            }
            else{
                //if a tag was removed
                const index = tagsTempArray.indexOf(valueTag)
                tagsTempArray.splice(index, 1)
            }
        }

        const arrayString = tagsTempArray.toString()

        //reload url
        navigate({
            pathname: '/products',
            search: '?tags=' + arrayString + "&rating=" + ratingNew,
          });
        window.location.reload(false);
    }

    const displayTags = () => {
        return(
        <div className='tags'>
            {
                tags.map(function(item, i){
                    return <TagComponent 
                        key={i} 
                        name={item.name} 
                        value={item.value} 
                        initialChecked={item.checked} 
                        handleCheck={handleChangeUrl}
                    />
                })
            }
        </div>
        )
    }

    const displayRatings = () => {
        return(
            <div className='tags'>
                {
                    ratings.map(function(item, i){
                        return <RatingComponent 
                            key={i} 
                            name={item.name} 
                            value={item.value} 
                            initialChecked={item.checked} 
                            handleCheck={handleChangeUrl}
                        />
                    })
                }
            </div>
            )
    }

    //deal with pagination
    const showMore = () => {
        if(products.length < allProducts.length){
            setProducts(allProducts.slice(0,pagination))
            setpagination(pagination+15)
        }
    }

    const handleOpenProduct = (index) => {
        navigate({
            pathname: '/product',
            search: '?id=' + products[index].id,
          });
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
        setQuickProduct({product:products[index], i: index})
        setOpenModal(true)
    }

    return (
      <div className="App" id="app">
        <Toaster />
        <HeaderComponent />
        <div className="body">
            <div className="filters">
                <div className='filter-title-icon'  onClick={() => {setShowFilters(!showFilters)}}>
                    <p className='filter-title'>Filters</p>
                    <img src={showFilters ? arrowUp : arrowDown} style={{display: windowWidth > 630 ? "none" : "block"}} alt="filter"/>
                </div>
                <div className='filters-div' style={{display: windowWidth > 630 ? "flex" : showFilters? "flex" : "none"}}>
                    <p className='tags-title'>Rating</p>
                    {displayRatings()}
                    
                    <p className='tags-title'>Tags</p>
                    {displayTags()}
                </div>
                
            </div>
            <div className="products-div">
                {products === null
                ?
                    <p>Loading..</p>
                :
                products.length === 0
                ?
                    <p>No products</p>
                :
                    <div>
                        <div className="products">
                            {
                            products.map(function(item, i){
                                return <ProductComponent 
                                    key={i} 
                                    name={item.name} 
                                    price={item.price} 
                                    brand={item.brand} 
                                    image={item.image_link}
                                    rating={item.rating}
                                    handleClick={() => handleOpenProduct(i)}
                                    addToCart={handleAddToCart}
                                    openQuick={handleQuickPreview}
                                    index={i}
                                />
                            })
                            }
                        </div>
                        {
                            products.length === allProducts.length ?
                                <div/>
                            :
                                <p className="show-more" onClick={showMore}>Show More</p>
                        }
                    </div>
                }
            </div>
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
