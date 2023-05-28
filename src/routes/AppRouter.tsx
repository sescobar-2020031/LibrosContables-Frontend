import { useEffect, useState } from 'react';

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Header from '../components/Header/Header';
import LandingPage from '../pages/LandingPage/LandingPage';
import AboutUsPage from '../pages/AboutUs/AboutUsPage';
import Login from '../pages/Login/Login';
import Register from '../pages/Register/Register';
import SessionUserContext from '../context/sessionUserContext';
import LoginRegisterContext from '../context/loginRegisterContext';
import DialogContext from '../context/DialogContex';
import AES from 'crypto-js/aes';
import Utf8 from 'crypto-js/enc-utf8';
import SideNav from '../components/SideNav/SideNav';
import Home from '../pages/Home/Home';
import LibroDiario from '../pages/LibroDiario/LibroDiario';
import BalanceSaldos from '~/pages/balanceSaldos/BalanceSaldos';

export const AppRouter = () => {
	const [loginRegister, setLoginRegister] = useState('');
	const [cacheSession] = useState(sessionStorage.getItem('identity'));
	const [sessionUser, setSessionUser] = useState({
		fullName: cacheSession
			? JSON.parse(
					AES.decrypt(cacheSession, import.meta.env.VITE_IDENTITY_KEY).toString(
						Utf8
					)
			  ).fullName
			: '',
		email: cacheSession
			? JSON.parse(
					AES.decrypt(cacheSession, import.meta.env.VITE_IDENTITY_KEY).toString(
						Utf8
					)
			  ).email
			: '',
		token: cacheSession
			? JSON.parse(
					AES.decrypt(cacheSession, import.meta.env.VITE_IDENTITY_KEY).toString(
						Utf8
					)
			  ).token
			: '',
		diaryBook: cacheSession
			? JSON.parse(
					AES.decrypt(cacheSession, import.meta.env.VITE_IDENTITY_KEY).toString(
						Utf8
					)
			  ).diaryBook
			: '',
		userLoggued: cacheSession
			? JSON.parse(
					AES.decrypt(cacheSession, import.meta.env.VITE_IDENTITY_KEY).toString(
						Utf8
					)
			  ).userLoggued
			: '',
	});

	useEffect(() => {
		if (sessionUser.userLoggued) {
			sessionStorage.setItem(
				'identity',
				AES.encrypt(
					JSON.stringify(sessionUser),
					import.meta.env.VITE_IDENTITY_KEY
				).toString()
			);
		}
	}, [sessionUser]);

	const [open, setOpen] = useState(false);

	return (
		<>
			<LoginRegisterContext.Provider
				value={{ loginRegister, setLoginRegister }}
			>
				<SessionUserContext.Provider value={{ sessionUser, setSessionUser }}>
					<DialogContext.Provider value={{ open, setOpen }}>
						<BrowserRouter>
							{!sessionUser.userLoggued ? <Header /> : null}
							{!sessionUser.userLoggued ? (
								<Routes>
									<Route path='/home' element={<LandingPage />} />
									<Route path='/aboutUs' element={<AboutUsPage />} />
									<Route path='/login' element={<Login />} />
									<Route path='/register' element={<Register />} />
									<Route path='/' element={<Navigate to='/home' replace />} />
									<Route path='*' element={<Navigate to='/home' replace />} />
								</Routes>
							) : (
								<Routes>
									<Route path='/dashboard' element={<SideNav />}>
										<Route path='home' element={<Home />} />
										<Route path='libroDiario' element={<LibroDiario />} />
										<Route path='libroMayor' element={<LibroDiario />} />
										<Route path='balanceSaldos' element={<BalanceSaldos />} />
										<Route path='estadoFinanciero' element={<LibroDiario />} />
										<Route path='balanceGeneral' element={<LibroDiario />} />
									</Route>
									<Route
										path='/'
										element={<Navigate to='/dashboard/home' replace />}
									/>
									<Route
										path='*'
										element={<Navigate to='/dashboard/home' replace />}
									/>
								</Routes>
							)}
						</BrowserRouter>
					</DialogContext.Provider>
				</SessionUserContext.Provider>
			</LoginRegisterContext.Provider>
		</>
	);
};
