import React from 'react';
import '../styles.scss';
import {
	UseFormRegister,
	UseFormGetValues,
	UseFormStateReturn,
} from 'react-hook-form';
import { IModalLibroDFormPage } from '~/pages/LibroDiario';

interface IModalColForm {
	register: UseFormRegister<IModalLibroDFormPage>;
	getValues: UseFormGetValues<IModalLibroDFormPage>;
	formState: UseFormStateReturn<IModalLibroDFormPage>;
}

const ModalColForm = ({ register, getValues, formState }: IModalColForm) => {
	return (
		<>
			<div className='librodiario__modal-form-col'>
				<label htmlFor='' className='librodiario__modal-label'>
					<input
						type='text'
						placeholder='Nombre de cuenta'
						className='librodiario__modal-form-input'
						{...register('nameAccount', {
							required: {
								value: true,
								message: 'Este campo es requerido',
							},
						})}
					/>
					{formState.errors.nameAccount && (
						<p className='input-error'>
							{formState.errors.nameAccount.message}
						</p>
					)}
				</label>
				<label htmlFor='' className='librodiario__modal-label'>
					<input
						type='text'
						placeholder='Debe'
						className='librodiario__modal-form-input'
						{...register('debe', {
							required: {
								value: true,
								message: 'Este campo es requerido',
							},
							pattern: {
								value: /^[0-9]+$/,
								message: 'Solo se permiten números.',
							},
						})}
					/>
					{formState.errors.debe && (
						<p className='input-error'>{formState.errors.debe.message}</p>
					)}
				</label>
				<label htmlFor='' className='librodiario__modal-label'>
					<input
						type='text'
						placeholder='Haber'
						className='librodiario__modal-form-input'
						{...register('haber', {
							required: {
								value: true,
								message: 'Este campo es requerido',
							},
							pattern: {
								value: /^[0-9]+$/,
								message: 'Solo se permiten números',
							},
						})}
					/>
					{formState.errors.haber && (
						<p className='input-error'>{formState.errors.haber.message}</p>
					)}
				</label>
				<div className='librodiario__options'>
					<a className='librodiario__modal-add-column'> + Añadir más líneas</a>
					<a className='librodiario__modal-add-column'> + Quitar esta linea</a>
				</div>
			</div>
		</>
	);
};

export default ModalColForm;
