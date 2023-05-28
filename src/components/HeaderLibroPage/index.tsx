import React, { Dispatch, SetStateAction } from 'react';
import './styles.scss';


interface IHeaderLibroDiario {
	setShowModal: Dispatch<SetStateAction<boolean>>;
}

const HeaderLibroDiario = ({ setShowModal }: IHeaderLibroDiario) => {
	return (
		<>
			<div className='librodiario__header'>
				<span className='librodiario__title'>Libro diario</span>
				<button
					className='librodiario__button-add'
					onClick={() => setShowModal(true)}
				>
					+
				</button>
			</div>
		</>
	);
};

export default HeaderLibroDiario;
