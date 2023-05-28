import { BsTwitter } from 'react-icons/bs';
import { SiLinkedin } from 'react-icons/si';
import { BsYoutube } from 'react-icons/bs';
import { FaFacebookF } from 'react-icons/fa';
import './style.scss';
import { useNavigate } from 'react-router-dom';

const Footer = () => {
	const navigate = useNavigate();

	return (
		<div className='footer-wrapper'>
			<div className='footer-section-one'>
				<div className='footer-title'>
					<h1>Bookify</h1>
				</div>
				<div className='footer-icons'>
					<BsTwitter />
					<SiLinkedin />
					<BsYoutube />
					<FaFacebookF />
				</div>
			</div>
			<div className='footer-section-two'>
				<div className='footer-section-columns'>
					<span
						onClick={() => {
							navigate('/home');
						}}
					>
						Inicio
					</span>
					<span
						onClick={() => {
							navigate('/aboutUs');
						}}
					>
						Nosotros
					</span>
					<span
						onClick={() => {
							navigate('/login');
						}}
					>
						Inicia Sesión
					</span>
					<span
						onClick={() => {
							navigate('/register');
						}}
					>
						Registrate
					</span>
				</div>
				<div className='footer-section-columns'>
					<span>Samuel Escobar</span>
					<span>Samuel Escobar</span>
					<span>Samuel Escobar</span>
					<span>Samuel Escobar</span>
				</div>
				<div className='footer-section-columns'>
					<span>Terminos y Condiciones</span>
					<span>Politica de privacidad</span>
				</div>
			</div>
		</div>
	);
};

export default Footer;
