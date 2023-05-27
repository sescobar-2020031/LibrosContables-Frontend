import React, { useState, useEffect, useContext } from 'react';
import './styles.scss';
import HeaderLibroDiario from '~/components/HeaderLibroPage';
import Modal from '~/components/Modal';
import ModalLibroDiario from '~/components/ModalLibroDiario';
import { SubmitHandler, useForm } from 'react-hook-form';
import axios from 'axios';
import SessionUserContext from '~/context/sessionUserContext';

export interface IModalLibroDFormPage {
	nameAccount: string;
	debe: number;
	haber: number;
}
const LibroDiario = () => {
	const [showModal, setShowModal] = useState<boolean>(false);
	const [dataSend, setDataSend] = useState({});
	const { sessionUser } = useContext(SessionUserContext)
	const loadData = async () => {
		axios.defaults.headers.common['Authorization'] = sessionUser.token;
		await axios.post(import.meta.env.VITE_GETDIARY, {idDiary: sessionUser.diaryBook})
			.then((res) => {
				setDataSend(res.data.accounts);
			}).catch((err) => {
				console.log(err);
			});
	}

	useEffect(() => {
		loadData();
		console.log(dataSend);
	}, [dataSend])

	const columns = [
		{
			name: 'Id',
			selector: (row: any) => row.id,
		},
		{
			name: 'Nombre',
			selector: (row: any) => row.title,
		},
	];

	// const data = accoutsUser.map((value: any, index) => {
	// 	return {
	// 		id: index,
	// 		title: value.name
	// 	}
	// });
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
		</>
	);
};

export default LibroDiario;
