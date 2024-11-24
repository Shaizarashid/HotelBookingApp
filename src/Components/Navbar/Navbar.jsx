import React, { useContext, useState, useRef } from 'react'
import './Navbar.css'
import logo from '../Assets/logo.png'
import cart_icon from '../Assets/cart_icon.png'
import { Link } from 'react-router-dom'
import nav_dropdown from '../Assets/dropdown_icon.png'
import { ShopContext } from '../../Context/ShopContext'
export const Navbar = () => {
const [menu, setMenu] = useState("home");

  const{getTotalCartItems} = useContext(ShopContext);
  const menuRef = useRef();

  const dropdown_toggle = (e) =>{
    menuRef.current.classList.toggle('nav-menu-visible');
    e.target.classList.toggle('open');
  }

  return (
    <div className='navbar'>
       <div className="nav-logo">
        <img src={logo} alt="" />
        <p>MAXPACE</p>
       </div>
       <img className = 'nav-dropdown' onClick = {dropdown_toggle}src={nav_dropdown} alt = ""/>
       <ul ref = {menuRef} className="nav-menu">
        <li onClick={()=> {setMenu("shop")}}><Link style={{textDecoration:'none'}} to='/'>Shop</Link>{menu==="shop"?<hr/>:<></>}</li>
        <li onClick={()=> {setMenu("mens")}}><Link style={{textDecoration:'none'}} to='/mens'>Men</Link>{menu==="mens"?<hr/>:<></>}</li>
        <li onClick={()=> {setMenu("womens")}}><Link style={{textDecoration:'none'}} to='/womens'>Women</Link>{menu==="womens"?<hr/>:<></>}</li>
        <li onClick={()=> {setMenu("kids")}}><Link style={{textDecoration:'none'}} to='/kids'>Kids</Link> {menu==="kids"?<hr/>:<></>}</li>
        <li onClick={()=> {setMenu("accessories")}}><Link style={{textDecoration:'none'}} to='/accessories'>Accessories</Link>{menu==="accessories"?<hr/>:<></>}</li>
       </ul>
       <div className="nav-login-cart">
        <Link to='/login'><button>Login</button></Link>
        <Link to='/cart'><img src={cart_icon} alt="" /></Link>
        <div className="nav-cart-count">{getTotalCartItems()}</div>
       </div>
    </div>
  )
}


// import React, { useContext, useState, useRef } from 'react'
// import './Navbar.css'
// import logo from '../Assets/logo.png'
// import cart_icon from '../Assets/cart_icon.png'
// import { Link } from 'react-router-dom'
// import nav_dropdown from '../Assets/dropdown_icon.png'
// import { ShopContext } from '../../Context/ShopContext'

// export const Navbar = () => {
//   const [menu, setMenu] = useState("home");
//   const [darkMode, setDarkMode] = useState(false); // State to track dark mode

//   const { getTotalCartItems } = useContext(ShopContext);
//   const menuRef = useRef();

//   const dropdown_toggle = (e) => {
//     menuRef.current.classList.toggle('nav-menu-visible');
//     e.target.classList.toggle('open');
//   }

//   const toggleDarkMode = () => {
//     setDarkMode(!darkMode);
//     // Toggle dark mode classes on body element
//     document.body.classList.toggle('dark-mode');
//   };

//   return (
//     <div className={`navbar ${darkMode ? 'dark-mode' : ''}`}> {/* Apply dark mode class */}
//       <div className="nav-logo">
//         <img src={logo} alt="" />
//         <p>MAXPACE</p>
//       </div>
//       <img className='nav-dropdown' onClick={dropdown_toggle} src={nav_dropdown} alt="" />
//       <ul ref={menuRef} className="nav-menu">
//         <li onClick={() => { setMenu("shop") }}><Link style={{ textDecoration: 'none' }} to='/'>Shop</Link>{menu === "shop" ? <hr /> : <></>}</li>
//         <li onClick={() => { setMenu("mens") }}><Link style={{ textDecoration: 'none' }} to='/mens'>Men</Link>{menu === "mens" ? <hr /> : <></>}</li>
//         <li onClick={() => { setMenu("womens") }}><Link style={{ textDecoration: 'none' }} to='/womens'>Women</Link>{menu === "womens" ? <hr /> : <></>}</li>
//         <li onClick={() => { setMenu("kids") }}><Link style={{ textDecoration: 'none' }} to='/kids'>Kids</Link> {menu === "kids" ? <hr /> : <></>}</li>
//         <li onClick={() => { setMenu("accessories") }}><Link style={{ textDecoration: 'none' }} to='/accessories'>Accessories</Link>{menu === "accessories" ? <hr /> : <></>}</li>
//       </ul>
//       <div className="nav-login-cart">
//         <Link to='/login'><button>Login</button></Link>
//         <Link to='/cart'><img src={cart_icon} alt="" /></Link>
//         <div className="nav-cart-count">{getTotalCartItems()}</div>
//       </div>
//       {/* Dark mode button */}
//       <button onClick={toggleDarkMode}>{darkMode ? 'Light Mode' : 'Dark Mode'}</button>
//     </div>
//   )
// }
