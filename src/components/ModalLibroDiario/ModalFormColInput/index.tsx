import React, { useEffect, useState, useContext } from 'react';
import '../styles.scss';
import {
	UseFormRegister,
	UseFormGetValues,
	UseFormStateReturn,
} from 'react-hook-form';
import axios from 'axios';
import SessionUserContext from '~/context/sessionUserContext';


interface IModalColForm {
	register: UseFormRegister<any>;
	getValues: UseFormGetValues<any>;
	formState: UseFormStateReturn<any>;
	registerName: number;
	removeLine: boolean;
	addFields: () => void;
	removeFields: (index: number) => void;
	lengthArray: number;
}

const ModalColForm = ({
	register,
	getValues,
	formState,
	registerName,
	removeLine,
	addFields,
	lengthArray,
	removeFields,
}: IModalColForm) => {
	const [hasDebeValue, setHasDebeValue] = useState(false);
	const [hasHaberValue, setHasHaberValue] = useState(false);
	const [accoutsUser, setAccoutsUser] = useState([]);
	const { sessionUser } = useContext(SessionUserContext);

	const loadData = async () => {
		axios.defaults.headers.common['Authorization'] = sessionUser.token;
		await axios.get(import.meta.env.VITE_LISTACOUNT)
			.then((res) => {
				setAccoutsUser(res.data.accounts);
			}).catch((err) => {
				console.log(err);
			});
	}

	const handleDebeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.value) {
			setHasDebeValue(true);
		} else {
			setHasDebeValue(false);
		}
	};

	const handleHaberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.value) {
			setHasHaberValue(true);
		} else {
			setHasHaberValue(false);
		}
	};

	useEffect(() => {
		setHasDebeValue(false);
		setHasHaberValue(false);
		loadData();
	}, [registerName]);

	return (
		<>
			<div className='librodiario__modal-form-col'>
				<label htmlFor='' className='librodiario__modal-label'>
					{/* <input
						type='text'
						placeholder='Nombre de cuenta'
						className='librodiario__modal-form-input'
						{...register(`nameAccount${registerName}`, {})}
					/> */}
					<select
						style={{
							width: '100%',
							padding: '1rem'
						}}
						defaultValue='select'
						{...register(`nameAccount${registerName}`, {})}
					>
						<option selected disabled value='0'>
							Selecciona una cuenta
						</option>
						{
							accoutsUser.map((item: any) => (
								<option value={item._id}>
									{item.name}
								</option>
							))
						}
					</select>
					{/* {`${formState.errors.nameAccount}${registerName}` && (
						<p className='input-error'>
							{formState.errors.nameAccount.message}
						</p>
					)} */}
				</label>
				<label htmlFor='' className='librodiario__modal-label'>
					<input
						type='text'
						placeholder='Debe'
						className='librodiario__modal-form-input'
						{...register(`debe${registerName}`, {
							pattern: {
								value: /^[0-9]+$/,
								message: 'Solo se permiten números.',
							},
							onChange: e => handleDebeChange(e),
						})}
						disabled={hasHaberValue}
					/>
					{/* {formState.errors.debe && (
						<p className='input-error'>{formState.errors.debe.message}</p>
					)} */}
				</label>
				<label htmlFor='' className='librodiario__modal-label'>
					<input
						type='text'
						placeholder='Haber'
						className='librodiario__modal-form-input'
						{...register(`haber${registerName}`, {
							pattern: {
								value: /^[0-9]+$/,
								message: 'Solo se permiten números',
							},
							onChange: e => handleHaberChange(e),
						})}
						disabled={hasDebeValue}
					/>
					{/* {formState.errors.haber && (
						<p className='input-error'>{formState.errors.haber.message}</p>
					)} */}
				</label>
				<div className='librodiario__options'>
					{registerName === lengthArray - 1 && (
						<a className='librodiario__modal-add-column' onClick={addFields}>
							+ Añadir más líneas
						</a>
					)}
					{registerName > 0 && (
						<a
							onClick={() => removeFields(registerName)}
							className='librodiario__modal-add-column'
						>
							+ Quitar esta línea
						</a>
					)}
				</div>
			</div>
		</>
	);
};

ModalColForm.defaultProps = {
	removeLine: true, // Valor por defecto para isHtml
};

export default ModalColForm;
