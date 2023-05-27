import React from 'react';
import ModalColForm from './ModalFormColInput';
import { useForm } from 'react-hook-form';
import { IModalLibroDFormPage } from '~/pages/LibroDiario';

const ModalLibroDiario = () => {
	const { register, handleSubmit, getValues, reset, formState } =
		useForm<IModalLibroDFormPage>({
			mode: 'onChange',
		});
	return (
		<>
			<div className='librodiario__modal'>
				<span className='librodiario__modal-title'>
					Cree un nuevo registro para libro de diario
				</span>
				<div className='librodiario__container-form'>
					<form action='' className='librodiario__modal-form'>
						<ModalColForm
							register={register}
							getValues={getValues}
							formState={formState}
						/>
					</form>
				</div>
			</div>
		</>
	);
};

export default ModalLibroDiario;
