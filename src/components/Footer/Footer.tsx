import { BsTwitter } from "react-icons/bs";
import { SiLinkedin } from "react-icons/si";
import { BsYoutube } from "react-icons/bs";
import { FaFacebookF } from "react-icons/fa";
import './style.scss'

const Footer = () => {
    return (
        <div className="footer-wrapper">
            <div className="footer-section-one">
                <div className="footer-title">
                    <h1>Bookify</h1>
                </div>
                <div className="footer-icons">
                    <BsTwitter />
                    <SiLinkedin />
                    <BsYoutube />
                    <FaFacebookF />
                </div>
            </div>
            <div className="footer-section-two">
                <div className="footer-section-columns">
                    <span>Inicio</span>
                    <span>Nosotros</span>
                    <span>Inicia Sesión</span>
                    <span>Registrate</span>
                </div>
                <div className="footer-section-columns">
                    <span>Samuel Escobar</span>
                    <span>Samuel Escobar</span>
                    <span>Samuel Escobar</span>
                    <span>Samuel Escobar</span>
                </div>
                <div className="footer-section-columns">
                    <span>Terminos y Condiciones</span>
                    <span>Politica de privacidad</span>
                </div>
            </div>
        </div>
    );
};

export default Footer;
