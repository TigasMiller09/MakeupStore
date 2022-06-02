# Getting Started with Create React App

This project is a web application developed using React. The app communicates with the [Makeup API](https://makeup-api.herokuapp.com/) to get the products.

## Features
- Fecthes products from the API
- Handles the different responses to the API call (loading, error, etc)
- Allows to filter products
  - The filters keep being applied if the page is reloaded (URL)
- Includes pagination to prevent too much products shown att the same time
- Products list includes general information (image, name, brand, rating, price)
- Products list is sorted by rating
- If click on product image opens Modal with quick preview
- If clicks product opens product page
- Product page contains detailed information
- Product page shows related products
- Responsive

## API Limitations
- Doesn't allow for pagination
  - The requests don't allow a "limit" argument
- Doesn't allow to get the "no rating" products
  -  If we want to get the products which rating is null we have to get all the products
- When getting products with different tags it returns their INTERCEPTION instead of their ADDITION
  - If I send a request with tags=[canadian, sugar free], instead of returning all the canadian products and all the sugar free products, it returns their interception

## Photos

### Desktop

<div style="display: flex, flex-direction: row, flex-wrap:wrap">
  <img src="https://github.com/TigasMiller09/MakeupStore/blob/master/screenshots/products-desktop.png" alt="drawing" width="500"/>
  <img src="https://github.com/TigasMiller09/MakeupStore/blob/master/screenshots/pagination-desktop.png" alt="drawing" width="500"/>
  <img src="https://github.com/TigasMiller09/MakeupStore/blob/master/screenshots/quickpreview-desktop.png" alt="drawing" width="500"/>
  <img src="https://github.com/TigasMiller09/MakeupStore/blob/master/screenshots/product-desktop.png" alt="drawing" width="500"/>
</div>

### Mobile

<div style="display: flex, flex-direction: row, flex-wrap:wrap">
  <img src="https://github.com/TigasMiller09/MakeupStore/blob/master/screenshots/products-mobile.png" alt="drawing" width="200"/>
  <img src="https://github.com/TigasMiller09/MakeupStore/blob/master/screenshots/products-mobile.png" alt="drawing" width="200"/>
  <img src="https://github.com/TigasMiller09/MakeupStore/blob/master/screenshots/filters-mobile.png" alt="drawing" width="200"/>
  <img src="https://github.com/TigasMiller09/MakeupStore/blob/master/screenshots/nav-mobile.png" alt="drawing" width="200"/>
  <img src="https://github.com/TigasMiller09/MakeupStore/blob/master/screenshots/quickpreview-mobile.png" alt="drawing" width="200"/>
  <img src="https://github.com/TigasMiller09/MakeupStore/blob/master/screenshots/product-mobile.png" alt="drawing" width="200"/>
  <img src="https://github.com/TigasMiller09/MakeupStore/blob/master/screenshots/product2-mobile.png" alt="drawing" width="200"/>
  <img src="https://github.com/TigasMiller09/MakeupStore/blob/master/screenshots/relatedproducts-mobile.png" alt="drawing" width="200"/>
</div>
