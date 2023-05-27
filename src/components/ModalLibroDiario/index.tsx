import React, { useState } from 'react';
import ModalColForm from './ModalFormColInput';
import { SubmitHandler, useForm } from 'react-hook-form';
import { IModalLibroDFormPage } from '~/pages/LibroDiario';

interface InputTypes {
	nameAccount: string;
	debe: string;
	haber: string;
	removeLine?: boolean;
}

const ModalLibroDiario = () => {
	const { register, handleSubmit, getValues, reset, control, formState } =
		useForm<any>({
			mode: 'onChange',
		});

	const [campos, setCampos] = useState<InputTypes[]>([
		{ nameAccount: '', debe: '', haber: '', removeLine: false },
	]);

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
		console.log(data);
	};

	return (
		<>
			<div className='librodiario__modal'>
				<span className='librodiario__modal-title'>
					Cree un nuevo registro para libro de diario
				</span>
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
