import React, { useState, useContext, Dispatch, SetStateAction } from 'react';
import ModalColForm from './ModalFormColInput';
import { SubmitHandler, useForm } from 'react-hook-form';
import { IModalLibroDFormPage } from '~/pages/LibroDiario';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import axios from 'axios';

import SessionUserContext from '../../context/sessionUserContext';

interface InputTypes {
	nameAccount: string;
	debe: string;
	haber: string;
	removeLine?: boolean;
}

interface IHeaderLibroDiario {
	setShowModal: Dispatch<SetStateAction<boolean>>;
}

const ModalLibroDiario = ({ setShowModal }: IHeaderLibroDiario) => {
	const { register, handleSubmit, getValues, reset, control, formState } =
		useForm<any>({
			mode: 'onChange',
		});

	const { sessionUser } = useContext(SessionUserContext);

	const [campos, setCampos] = useState<InputTypes[]>([
		{ nameAccount: '', debe: '', haber: '', removeLine: false },
	]);

	const [description, setDescription] = useState('')

	const addFields = () => {
		let newfield = { nameAccount: '', debe: '', haber: '' };

		setCampos([...campos, newfield]);
	};

	const removeFields = (index: number) => {
		let data = [...campos];
		data.splice(index, 1);
		setCampos(data);
	};

	const onSubmit: SubmitHandler<any> = async data => {
		const filteredData = Object.entries(data).reduce((obj, [key, value]) => {
			if (value !== '') {
				obj[key] = value;
			}
			return obj;
		}, {});
		console.log(
			'🚀 ~ file: index.tsx:39 ~ ModalLibroDiario ~ filteredData:',
			filteredData
		);
		type OutputObject = {
			account: string;
			position: string;
			amount: number;
		};
		console.log(data);
		var output: OutputObject[] = [];
		let accounts = Object.keys(data).filter(key => key.startsWith('nameAccount')).length;
		for (let i = 0; i < accounts; i++) {
			let account = data[`nameAccount${i}`];
			let position = data[`debe${i}`] ? 'Debit' : 'Credit';
			let amount = data[`debe${i}`] || data[`haber${i}`];
			output.push({ account, position, amount });
		}
		const request = {
			accounts: output,
			description: description,
			idDiary: sessionUser.diaryBook
		}

		axios.defaults.headers.common['Authorization'] = sessionUser.token;
		await axios.post(import.meta.env.VITE_ADDITEMACCOUNT, request)
			.then((res) => {
				console.log(res);
			}).catch((err) => {
				console.log(err);
			});

		setShowModal(false);
	};

	return (
		<>
			<div className='librodiario__modal'>
				<span className='librodiario__modal-title'>
					Libro diario
				</span>
				<FormControl fullWidth className='formControl' >
					<InputLabel htmlFor="outlined-adornment-amount">Descripcion</InputLabel>
					<OutlinedInput
						id="outlined-adornment-amount"
						startAdornment={<InputAdornment position="start"></InputAdornment>}
						label="Amount"
						onChange={e => setDescription(e.target.value)}
					/>
				</FormControl>
				<div className='librodiario__container-form'>
					<form
						action=''
						className='librodiario__modal-form'
						onSubmit={handleSubmit(onSubmit)}
					>
						{campos.map((object: InputTypes, index: number) => (
							<ModalColForm
								register={register}
								getValues={getValues}
								formState={formState}
								registerName={index}
								addFields={addFields}
								removeLine={object?.removeLine}
								lengthArray={campos.length}
								removeFields={removeFields}
							/>
						))}
						<input type='submit' value='Guardar' />
					</form>
				</div>
			</div>
		</>
	);
};

export default ModalLibroDiario;
