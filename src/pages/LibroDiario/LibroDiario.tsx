import React, { useState } from 'react';
import './styles.scss';
import HeaderLibroDiario from '~/components/HeaderLibroPage';
import Modal from '~/components/Modal';
import ModalLibroDiario from '~/components/ModalLibroDiario';
import { SubmitHandler, useForm } from 'react-hook-form';

export interface IModalLibroDFormPage {
	nameAccount: string;
	debe: number;
	haber: number;
}
const LibroDiario = () => {
	const [showModal, setShowModal] = useState<boolean>(false);
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
					<ModalLibroDiario />
				</Modal>
			}
		</>
	);
};

export default LibroDiario;
