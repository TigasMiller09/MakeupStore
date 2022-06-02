export const getProducts = (tags, rating) => {
    //the rating search on the API is exclusive
    //if I want the rating to be between [4-5] it has to be ]3.9, 5.1[ for example

    if(rating == "all")
        return fetch("http://makeup-api.herokuapp.com/api/v1/products.json?product_tags=" + tags)


    const ratingMin = rating == 0 ? "" : ((rating/20)-0.1).toString()
    const ratingMax = ((rating/20)+1) == 5 ? "5.1" : ((rating/20)+1).toString()

    return fetch("http://makeup-api.herokuapp.com/api/v1/products.json?product_tags=" + tags + "&rating_greater_than=" + ratingMin + "&rating_less_than=" + ratingMax)
    
}

export const getSingleProduct = (id) => {
    return fetch("http://makeup-api.herokuapp.com/api/v1/products/" + id + ".json")
}

export const getRelatedProducts = (brand) => {
    return fetch("http://makeup-api.herokuapp.com/api/v1/products.json?brand=" + brand)
}
