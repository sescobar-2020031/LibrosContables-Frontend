import React, { useState, useEffect, useContext } from 'react';
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
moment.locale('es');

export interface IModalLibroDFormPage {
	nameAccount: string;
	debe: number;
	haber: number;
}
const LibroDiario = () => {
	const [showModal, setShowModal] = useState<boolean>(false);
	const [dataSend, setDataSend] = useState([]);
	const [cargarData, setCargarData] = useState([]);
	const { sessionUser } = useContext(SessionUserContext);

	const loadData = async () => {
		axios.defaults.headers.common['Authorization'] = sessionUser.token;
		await axios
			.post(import.meta.env.VITE_GETDIARY, { idDiary: sessionUser.diaryBook })
			.then(res => {
				setDataSend(res.data.diary.accountItems);
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
					<ModalLibroDiario setShowModal={setShowModal} />
				</Modal>
			}
			<Stack direction='row' spacing={2}>
				<TextField
					label='Fecha'
					variant='outlined'
					disabled
					size='small'
					style={textFieldStyles}
				/>
				<TextField
					label='Descripción'
					variant='outlined'
					disabled
					size='small'
					style={textFieldStyles}
				/>
				<TextField
					label='Cuenta'
					disabled
					variant='outlined'
					size='small'
					style={textFieldStyles}
				/>
				<TextField
					label='Debe'
					disabled
					variant='outlined'
					size='small'
					style={textFieldStyles}
				/>
				<TextField
					label='Haber'
					disabled
					variant='outlined'
					size='small'
					style={textFieldStyles}
				/>
			</Stack>
			{dataSend.map((data: any, index: number) => {
				return (
					<>
						<Stack direction='row' spacing={2}>
							<TextField
								key={index}
								hiddenLabel
								disabled
								id='filled-hidden-label-small'
								defaultValue='Small'
								variant='filled'
								value={moment(data.date).format('MMMM Do YYYY, h:mm:ss a')}
								size='small'
								style={textFieldStyles}
							/>
							<TextField
								hiddenLabel
								disabled
								id='filled-hidden-label-small'
								defaultValue='Small'
								variant='filled'
								value={data.description}
								size='small'
								style={textFieldStyles}
							/>
							{data.accounts.map((data, index: number) => {
								return (
									<>
										<TextField
											key={index}
											hiddenLabel
											disabled
											id='filled-hidden-label-small'
											defaultValue='Small'
											variant='filled'
											value={data.account.name}
											size='small'
											style={textFieldStyles}
										/>
										<TextField
											hiddenLabel
											disabled
											id='filled-hidden-label-small'
											defaultValue='Small'
											placeholder='Debe'
											variant='filled'
											value={data.position == 'Debit' ? data.amount : 0}
											size='small'
											style={textFieldStyles}
										/>
										<TextField
											hiddenLabel
											disabled
											id='filled-hidden-label-small'
											defaultValue='Small'
											variant='filled'
											placeholder='Debe'
											value={data.position == 'Credit' ? data.amount : 0}
											size='small'
											style={textFieldStyles}
										/>
									</>
								);
							})}
						</Stack>
					</>
				);
			})}
		</>
	);
};

export default LibroDiario;
