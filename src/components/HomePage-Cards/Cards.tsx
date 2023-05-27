import { MenuData } from './Data'
import AboutBackground from "../../assets/images/about-background.png";
import './style.scss'

const Cards = () => {
    return (
        <div className="work-section-wrapper">
            <div className="about-background-image-container">
                <img src={AboutBackground} alt="" />
            </div>
            <div className="work-section-top">
                <p className="primary-subheading">Libros Contables</p>
                <h1 className="primary-heading-card">Nuestros libros Contables</h1>
                <p className="primary-text">
                    Nuestra plataforma de contabilidad en línea te permite crear y gestionar
                    fácilmente tus libros contables. ¡Mantén tus cuentas al día con nuestra ayuda!”
                </p>
            </div>
            <div className="work-section-bottom">
                {MenuData.map((data) => (
                    <div className="work-section-info" key={data.title}>
                        <div className="info-boxes-img-container">
                            <img src={data.image} alt="" />
                        </div>
                        <h2 className='title-card'>{data.title}</h2>
                        <p className='paragraph-card'>{data.text}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Cards;