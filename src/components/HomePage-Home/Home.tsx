import BannerBackground from '../../assets/images/home-banner-background.png'
import BannerImage from '../../assets/images/home-banner-image.png'
import { FiArrowRight } from "react-icons/fi";
import './style.scss'
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate();
    return (
        <div className="home-container">
            <div className="home-banner-container">
                <div className="home-bannerImage-container">
                    <img src={BannerBackground} alt="" />
                </div>
                <div className="home-text-section">
                    <h1 className="primary-heading">
                        Registra tus finanzas fácilmente
                    </h1>
                    <p className="primary-text">
                        Nuestra plataforma te permite llevar un registro detallado de tus finanzas de manera sencilla y eficiente
                    </p>
                    <button onClick={()=>{navigate("/register")}} className="secondary-button">
                        Registrate <FiArrowRight />
                    </button>
                </div>
                <div className="home-image-section">
                    <img src={BannerImage} alt="" />
                </div>
            </div>
        </div>
    )
}

export default Home;