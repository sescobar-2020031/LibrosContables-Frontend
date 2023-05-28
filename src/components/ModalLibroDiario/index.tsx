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
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);
import SessionUserContext from '../../context/sessionUserContext';

interface InputTypes {
	nameAccount: string;
	debe: string;
	haber: string;
	removeLine?: boolean;
}

let invalid = false;

interface IHeaderLibroDiario {
	setShowModal: Dispatch<SetStateAction<boolean>>;
	cargarData: boolean;
	setCargarData: Dispatch<SetStateAction<boolean>>;
}

const ModalLibroDiario = ({ setShowModal, cargarData, setCargarData }: IHeaderLibroDiario) => {
	const { register, handleSubmit, getValues, reset, control, formState } =
		useForm<any>({
			mode: 'onChange',
		});

	const { sessionUser } = useContext(SessionUserContext);

	const [campos, setCampos] = useState<InputTypes[]>([
		{ nameAccount: '', debe: '', haber: '', removeLine: false },
	]);

	const [description, setDescription] = useState('');

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
		type OutputObject = {
			account: string;
			position: string;
			amount: number;
		};
		var output: OutputObject[] = [];
		let accounts = Object.keys(data).filter(key =>
			key.startsWith('nameAccount')
		).length;
		for (let i = 0; i < accounts; i++) {
			let account = data[`nameAccount${i}`];
			let position = data[`debe${i}`] ? 'Debit' : 'Credit';
			let amount = data[`debe${i}`] || data[`haber${i}`];
			output.push({ account, position, amount });
		}
		const request = {
			accounts: output,
			description: description,
			idDiary: sessionUser.diaryBook,
		};

		console.log(request.accounts);

		const creditSum = request.accounts.reduce((sum, account) => {
			if (account.position === 'Credit') {
				return sum + +account.amount;
			}
			return sum;
		}, 0);

		console.log(creditSum);

		const debitSum = request.accounts.reduce((sum, account) => {
			if (account.position === 'Debit') {
				return sum + +account.amount;
			}
			return sum;
		}, 0);

		console.log(debitSum);

		const isEqual = creditSum === debitSum;

		if (!isEqual) {
			MySwal.fire({
                icon: 'error',
                title: 'Error',
                text:
                    'Tu partida no cuadra 😔',
            });
            invalid = true;
            return;
		}

		axios.defaults.headers.common['Authorization'] = sessionUser.token;
		await axios
			.post(import.meta.env.VITE_ADDITEMACCOUNT, request)
			.then(res => {
				MySwal.fire({
					icon: 'success',
					title: 'Exito',
					text: res.data.message,
					confirmButtonText: 'OK',
				});
				setShowModal(false);
				setCargarData(!cargarData);
			})
			.catch(err => {
				console.log(err)
				MySwal.fire({
					title: 'Error',
					text: err.response.data.message,
					icon: 'error',
					confirmButtonText: 'OK',
				});
			});
	};

	return (
		<>
			<div className='librodiario__modal'>
				<span style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem' }} className='librodiario__modal-title'>Añade una partida</span>
				<label htmlFor='' className='librodiario__modal-label'>
					<input
						type='text'
						placeholder='Descripcion'
						className='librodiario__modal-form-input'
						onChange={(e) => setDescription(e.target.value)}
						required
					/>
					{/* {formState.errors.debe && (
						<p className='input-error'>{formState.errors.debe.message}</p>
					)} */}
				</label>
				<div className='librodiario__container-form'>
					<form
						action=''
						className='librodiario__modal-form'
						onSubmit={handleSubmit(onSubmit)}
					>
						{campos.map((object: InputTypes, index: number) => (
							<ModalColForm
								key={index}
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
						<input disabled={!formState.isValid} className={!formState.isValid ? 'disabled' : 'send'} type='submit' value='Guardar' />
					</form>
				</div>
			</div>
		</>
	);
};

export default ModalLibroDiario;
