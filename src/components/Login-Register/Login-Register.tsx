import { useContext, Fragment, useState } from 'react';
import LoginRegisterContext from '../../context/loginRegisterContext';
import SessionUserContext from '../../context/sessionUserContext';
import Registrate from '../../assets/images/img.svg';
import Loggued from '../../assets/images/register.svg';
import axios from 'axios';
import './style.scss';
import DialogContext from '../../context/DialogContex';
import ModalResponse from '../ModalResponse/ModalResponse';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

const LoginRegister = () => {
	const { loginRegister, setLoginRegister } = useContext(LoginRegisterContext);
	const { setSessionUser } = useContext(SessionUserContext);
	const { setOpen } = useContext(DialogContext);
	const [registerUser, setRegisterUser] = useState({
		fullName: '',
		email: '',
		password: '',
	});

	const register = async (event: any) => {
		event.preventDefault();
		await axios
			.post(import.meta.env.VITE_REGISTER, registerUser)
			.then(res => {
				MySwal.fire({
					title: 'Success',
					text: 'Alert successful',
					icon: 'success',
					confirmButtonText: 'OK',
				});
				setRegisterUser({
					fullName: '',
					email: '',
					password: '',
				});
			})
			.catch(err => {
				MySwal.fire({
					title: 'Error',
					text:
						err.response.data.message != null
							? err.response.data.message
							: err.response.data,
					icon: 'error',
					confirmButtonText: 'OK',
				});
				setRegisterUser({
					fullName: '',
					email: '',
					password: '',
				});
			});
	};

	const [loginUser, setLoginUser] = useState({
		email: '',
		password: '',
	});

	const login = async (event: any) => {
		event.preventDefault();
		await axios
			.post(import.meta.env.VITE_LOGIN, loginUser)
			.then(res => {
				MySwal.fire({
					title: 'Exito.',
					text: 'Logueo exitoso.',
					icon: 'success',
					confirmButtonText: 'OK',
				});
				const data = {
					fullName: res.data.user.fullName,
					email: res.data.user.email,
					token: res.data.token,
					diaryBook: res.data.diaryBookExist._id,
					userLoggued: true,
				};
				setTimeout(() => {
					setSessionUser(data);
				}, 5000);
			})
			.catch(err => {
				MySwal.fire({
					title: 'Error',
					text:
						err.response.data.message != null
							? err.response.data.message
							: err.response.data,
					icon: 'error',
					confirmButtonText: 'OK',
				});
			});
	};

	return (
		<Fragment>
			<ModalResponse />
			<div
				className={
					loginRegister == 'Register'
						? 'login-container sign-up-mode'
						: 'login-container'
				}
			>
				<div className='login-forms-container'>
					<div className='signin-signup'>
						<form onSubmit={login} className='sign-in-form'>
							<h2 className='login-title'>Inicia Sesión</h2>
							<div className='input-field'>
								<i className='fas fa-user'></i>
								<input
									type='text'
									placeholder='Correo'
									onChange={e =>
										setLoginUser(preUser => ({
											...preUser,
											email: e.target.value,
										}))
									}
								/>
							</div>
							<div className='input-field'>
								<i className='fas fa-lock'></i>
								<input
									type='password'
									placeholder='Contraseña'
									onChange={e =>
										setLoginUser(preUser => ({
											...preUser,
											password: e.target.value,
										}))
									}
								/>
							</div>
							<input
								type='submit'
								value='Ingresar'
								className='login-btn solid'
							/>
						</form>
						<form onSubmit={register} className='sign-up-form'>
							<h2 className='login-title'>Registrate</h2>
							<div className='input-field'>
								<i className='fas fa-user'></i>
								<input
									type='text'
									placeholder='Usuario'
									onChange={e =>
										setRegisterUser(preRegister => ({
											...preRegister,
											fullName: e.target.value,
										}))
									}
								/>
							</div>
							<div className='input-field'>
								<i className='fas fa-envelope'></i>
								<input
									type='email'
									placeholder='Correo'
									onChange={e =>
										setRegisterUser(preRegister => ({
											...preRegister,
											email: e.target.value,
										}))
									}
								/>
							</div>
							<div className='input-field'>
								<i className='fas fa-lock'></i>
								<input
									type='password'
									placeholder='Contraseña'
									onChange={e =>
										setRegisterUser(preRegister => ({
											...preRegister,
											password: e.target.value,
										}))
									}
								/>
							</div>
							<input type='submit' className='login-btn' value='Registrate' />
						</form>
					</div>
				</div>

				<div className='panels-container'>
					<div className='panel left-panel'>
						<div className='login-content'>
							<h3>Nuevo Aqui ?</h3>
							<p>
								Registrate y empieza a llevar una mejor contabilidad de tu
								negocio!!
							</p>
							<button
								className='login-btn transparent'
								id='sign-up-btn'
								onClick={() => setLoginRegister('Register')}
							>
								Registrate
							</button>
						</div>
						<img src={Registrate} className='image' alt='' />
					</div>
					<div className='panel right-panel'>
						<div className='login-content'>
							<h3>Uno de Nostros ?</h3>
							<p>
								Ingresa a nuetra web y empieza a obtener mejores resultados!!.
							</p>
							<button
								className='login-btn transparent'
								id='sign-in-btn'
								onClick={() => setLoginRegister('Login')}
							>
								Inicia Sesión
							</button>
						</div>
						<img src={Loggued} className='image' alt='' />
					</div>
				</div>
			</div>
		</Fragment>
	);
};

export default LoginRegister;
