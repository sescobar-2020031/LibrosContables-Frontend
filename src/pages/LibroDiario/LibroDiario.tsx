import React, { useState, useEffect, useContext, Fragment } from 'react';
import './styles.scss';
import HeaderLibroDiario from '~/components/HeaderLibroPage';
import Modal from '~/components/Modal';
import ModalLibroDiario from '~/components/ModalLibroDiario';
import { SubmitHandler, useForm } from 'react-hook-form';
import axios from 'axios';
import SessionUserContext from '~/context/sessionUserContext';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import moment from 'moment';
import { Grid } from '@mui/material';
import { Typography } from '@mui/material';
moment.locale('es');

export interface IModalLibroDFormPage {
	nameAccount: string;
	debe: number;
	haber: number;
}
const LibroDiario = () => {
	const [showModal, setShowModal] = useState<boolean>(false);
	const [dataSend, setDataSend] = useState<any>([]);
	const [cargarData, setCargarData] = useState<boolean>(false);
	const { sessionUser } = useContext(SessionUserContext);

	const loadData = async () => {
		axios.defaults.headers.common['Authorization'] = sessionUser.token;
		await axios
			.post(import.meta.env.VITE_GETDIARY, { idDiary: sessionUser.diaryBook })
			.then(res => {
				setDataSend(res.data.ExistDiary);
			})
			.catch(err => {
				console.log(err);
			});
	};

	const textFieldStyles = {
		margin: '0.2rem',
		backgroundColor: 'white',
		borderRadius: '0.5rem',
		border: '1px solid #ccc',
		padding: '0.5rem',
	};

	useEffect(() => {
		loadData();
	}, [cargarData]);

	return (
		<>
			<div className='librodiario__dashboard'>
				<HeaderLibroDiario setShowModal={setShowModal} />
			</div>
			{
				<Modal
					closeModal={() => setShowModal(false)}
					show={showModal}
					width={900}
				>
					<ModalLibroDiario cargarData={cargarData} setShowModal={setShowModal} setCargarData={setCargarData} />
				</Modal>
			}
			<Grid gap='2.5rem' className='table' container>
				{
					dataSend.map((data, index) => {
						return (
							<Grid key={index} container
								spacing={2}
								sx={{
									'--Grid-borderWidth': '1px',
									borderTop: '#8972d5 solid',
									borderLeft: '#8972d5 solid',
									borderColor: 'divider',
									'& > div': {
										borderRight: '#8972d5 solid',
										borderBottom: '#8972d5 solid',
										borderColor: 'divider',
									},
									display: 'flex',
									justifyContent: 'center',
									alignItems: 'center',
									borderRadius: '10px',
								}}>
								<Grid fontWeight="bold" display='flex' justifyContent='center' item xs={4}>
									P#{data.numberItem}
								</Grid>
								<Grid fontWeight="bold" display='flex' justifyContent='center' item xs={4}>
									{moment(data.date).format('DD-MM-YYYY')}
								</Grid>
								<Grid display='flex' justifyContent='center' item xs={4}>
									-
								</Grid>
								{/** CUENTAS */}
								{
									data.accounts.map((dataAccount, index) => {
										return (
											<Fragment key={index}>
												<Grid display='flex' justifyContent='center' item xs={4}>
													{dataAccount.account.name}
												</Grid>
												{
													dataAccount.position == 'Debit' ?
														<>
															<Grid display='flex' item xs={4}>
																Q.
																<Typography width='100%' display='flex' justifyContent='end' variant="body1">
																	{dataAccount.amount.toFixed(2)}
																</Typography>
															</Grid>
															<Grid display='flex' justifyContent='center' item xs={4}>
																-
															</Grid>
														</>
														:
														<>
															<Grid display='flex' justifyContent='center' item xs={4}>
																-
															</Grid>
															<Grid display='flex' item xs={4}>
																Q.
																<Typography width='100%' display='flex' justifyContent='end' variant="body1">
																	{dataAccount.amount.toFixed(2)}
																</Typography>
															</Grid>
														</>
												}
											</Fragment>
										)
									})
								}
								{/** Total */}
								<Grid display='flex' className='totales' item xs={4}>
									<Grid sx={{
										'--Grid-borderWidth': '1px',
										borderTop: '#8972d5 solid',
										borderBottom: '#8972d5 solid',
										borderColor: 'divider',
										'& > div': {
											borderBottom: '#8972d5 solid',
											borderColor: 'divider',
										},
										width: '100%',
									}}>
										<Typography fontWeight="bold" display='flex'>
											R//
											<Typography noWrap fontWeight="bold" width='100%' display='flex' justifyContent='start' variant="body1">
												{data.description}
											</Typography>
										</Typography>
									</Grid>
								</Grid>
								<Grid display='flex' className='totales' item xs={4}>
									<Grid sx={{
										'--Grid-borderWidth': '1px',
										borderTop: '#8972d5 solid',
										borderBottom: '#8972d5 solid',
										borderColor: 'divider',
										'& > div': {
											borderBottom: '#8972d5 solid',
											borderColor: 'divider',
										},
										width: '100%',
									}}>
										<Typography fontWeight="bold" display='flex'>
											Q.
											<Typography fontWeight="bold" width='100%' display='flex' justifyContent='end' variant="body1">
												{data.fullDebit.toFixed(2)}
											</Typography>
										</Typography>
									</Grid>
								</Grid>
								<Grid display='flex' className='totales' item xs={4}>
									<Grid sx={{
										'--Grid-borderWidth': '1px',
										borderTop: '#8972d5 solid',
										borderBottom: '#8972d5 solid',
										borderColor: 'divider',
										'& > div': {
											borderBottom: '#8972d5 solid',
											borderColor: 'divider',
										},
										width: '100%',
									}}>
										<Typography fontWeight="bold" display='flex'>
											Q.
											<Typography fontWeight="bold" width='100%' display='flex' justifyContent='end' variant="body1">
												{data.fullCredit.toFixed(2)}
											</Typography>
										</Typography>
									</Grid>
								</Grid>
							</Grid>
						)
					})
				}
			</Grid>
		</>
	);
};

export default LibroDiario;
