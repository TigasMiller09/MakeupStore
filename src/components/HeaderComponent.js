import {useState, useEffect} from 'react'

import './HeaderComponent.css';
import cart from "../assets/cart.png"
import cartWhite from "../assets/cartWhite.png"
import logo from "../assets/logo.png"
import menu from "../assets/menu.png"

function HeaderComponent() {
  const [menuShown, setMenuShown] = useState(window.innerWidth > 630 ? true : false)
  const [windowWidth, setWindowWidth] = useState(window.innerWidth)

  useEffect(() => {
    window.addEventListener('resize', updateWidth);
  }, [])

  const updateWidth = () => {
    setWindowWidth(window.innerWidth)
  }

  return (
    <header className="header">
        <div className="logo-div">
            <div>
              <img className="logo" src={logo} alt="logo"/>
              <p className="brand-name">MakeupHub</p>
            </div>
            <div className='menu-icon' onClick={() => {setMenuShown(!menuShown)}}>
              <img src={menu} alt="menu"/>
            </div>
        </div>
        <nav className="nav" style={{display: windowWidth > 630 ? "flex" : menuShown ? "flex" : "none"}}>
            <a href="/products" className="nav-item">Products</a>
            <a href="#" className="nav-item">About</a>
            <a href="#" className="nav-item">Blog</a>
            <a href="#" className="nav-item">Contact</a>
            <div className="cart-div">
              <img className="cart-icon" src={windowWidth > 630 ? cart : cartWhite} alt="cart"/>
            </div>
        </nav>
    </header>
  );
}

export default HeaderComponent;
