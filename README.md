# Makeup Store Web Application

This project is a web application developed using React. The app communicates with the [Makeup API](https://makeup-api.herokuapp.com/) to get the products.

To run the project just do the following:
- npm install
- npm start

## Features
- Fetches products from the API
- Handles the different responses to the API calls (loading, error, etc)
- The main page includes general information about the products (image, name, brand, rating, price)
- Allows to filter products
  - The filters remain applied if the page is reloaded (saved on URL)
- The filters have custom styles (custom checkbox)
- Includes local pagination to prevent too much products to be shown at the same time
- Products' list is sorted by rating
- If click on product's image it opens a Modal with the product's quick preview
- If click on product it opens the individual product page
- The product's page contains detailed information about the product
- The product's page shows related products
- The layout is responsive

## API Limitations
- Doesn't allow for pagination
  - The requests don't allow a "limit" argument
- Doesn't allow to get the "no rating" products isolated
  -  If we want to get the products whose rating is null we have to get all the products
- When getting products with different tags it returns their interception/reunion (AND) instead of their addition (OR)
  - If I send a request with tags=[canadian, organic], instead of returning all the canadian products and all the organic products, it returns their interception (AND)

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
  <img src="https://github.com/TigasMiller09/MakeupStore/blob/master/screenshots/filters-mobile.png" alt="drawing" width="200"/>
  <img src="https://github.com/TigasMiller09/MakeupStore/blob/master/screenshots/nav-mobile.png" alt="drawing" width="200"/>
  <img src="https://github.com/TigasMiller09/MakeupStore/blob/master/screenshots/quickpreview-mobile.png" alt="drawing" width="200"/>
  <img src="https://github.com/TigasMiller09/MakeupStore/blob/master/screenshots/product-mobile.png" alt="drawing" width="200"/>
  <img src="https://github.com/TigasMiller09/MakeupStore/blob/master/screenshots/product2-mobile.png" alt="drawing" width="200"/>
  <img src="https://github.com/TigasMiller09/MakeupStore/blob/master/screenshots/relatedproducts-mobile.png" alt="drawing" width="200"/>
</div>
