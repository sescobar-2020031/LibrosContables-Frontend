import './style.scss'
import { MenuData } from './Data'
import { useState } from 'react'
import { Link } from 'react-router-dom';

const Header = () => {
    const [clicked, setClicked] = useState(false);

    const handleClick = (e: any) => {
        e.preventDefault();
        setClicked(!clicked)
    }

    return (
        <nav className="NavbarItems">
            <h1 className='logo'><i className="fa-solid fa-book-open-reader iconHeader"></i>Bookify</h1>
            <div className="menu-icons">
                <i className={clicked ? "fas fa-times" : "fas fa-bars"} onClick={(e) => handleClick(e)}></i>
            </div>
            <ul className={clicked ? "nav-menu active" : "nav-menu"}>
                {
                    MenuData.map((menu, index) => {
                        return (
                            <li key={index}><Link to={menu.url} className={menu.cName}><i className={`${menu.icon} iconItems`}></i>{menu.title}</Link></li>
                        )
                    })
                }
            </ul>
        </nav>
    )
}

export default Header;