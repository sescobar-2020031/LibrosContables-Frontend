import { useState, useEffect, useContext } from 'react';
import DataTable from 'react-data-table-component';
import axios from 'axios';
import SessionUserContext from '../../context/sessionUserContext';
import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditIcon from '@mui/icons-material/Edit';

const MySwal = withReactContent(Swal);

const Home = () => {
	const [selectedRowId, setSelectedRowId] = useState<any>(null);
	const [selectedRowName, setSelectedRowName] = useState('');

	const customStyles = {
		table: {
			style: {
				border: '1px solid #e0e0e0',
			},
		},
		headCells: {
			style: {
				fontWeight: 'bold',
				backgroundColor: '#f5f5f5',
				borderBottom: '1px solid #e0e0e0',
			},
		},
		cells: {
			style: {
				fontSize: '15px',
			},
		},
	};

	const [accoutsUser, setAccoutsUser] = useState([]);
	const [dataSend, setDataSend] = useState({
		name: '',
	});
	const { sessionUser } = useContext(SessionUserContext);
	const [openEdit, setOpenEdit] = React.useState(false);

	const [open, setOpen] = React.useState(false);

	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	const handleOpenEdit = () => setOpenEdit(true);
	const handleCloseEdit = () => setOpenEdit(false);

	const handleOpenDelete = () => {
		MySwal.fire({
			title:
				'¿Estas seguro? La cuenta ' +
				selectedRowName +
				' se borrara permanentemente.',
			text: 'No podras revertir esta accion.',
			icon: 'warning',
			showCancelButton: true,
			confirmButtonText: 'Si, eliminar',
			cancelButtonText: 'Cancelar',
		}).then(result => {
			if (result.isConfirmed) {
				eliminar();
			}
		});
	};

	const agregar = async () => {
		axios.defaults.headers.common['Authorization'] = sessionUser.token;
		await axios
			.post(import.meta.env.VITE_ADDACOUNT, dataSend)
			.then(data => {
				setDataSend({ name: '' });
				MySwal.fire({
					title: 'Exito',
					text: data.data.message,
					icon: 'success',
					confirmButtonText: 'OK',
				});
				loadData();
				handleClose();
			})
			.catch(err => {
				setDataSend({ name: '' });
				MySwal.fire({
					title: 'Error',
					text:
						err.response.data.message != null
							? err.response.data.message
							: err.response.data,
					icon: 'error',
					confirmButtonText: 'OK',
				});
			});
	};

	const eliminar = async () => {
		axios.defaults.headers.common['Authorization'] = sessionUser.token;
		await axios
			.post(import.meta.env.VITE_DELETEACCOUNT, { id: selectedRowId })
			.then(data => {
				loadData();
				MySwal.fire({
					title: 'Exito',
					text: data.data.message,
					icon: 'success',
					confirmButtonText: 'OK',
				});
				loadData();
				handleClose();
			})
			.catch(err => {
				MySwal.fire({
					title: 'Error',
					text:
						err.response.data.message != null
							? err.response.data.message
							: err.response.data,
					icon: 'error',
					confirmButtonText: 'OK',
				});
			});
	};

	const modificar = async () => {
		axios.defaults.headers.common['Authorization'] = sessionUser.token;
		await axios
			.post(import.meta.env.VITE_EDITACCOUNT, {
				id: selectedRowId,
				name: selectedRowName,
			})
			.then(data => {
				loadData();
				MySwal.fire({
					title: 'Exito',
					text: data.data.message,
					icon: 'success',
					confirmButtonText: 'OK',
				});
				loadData();
				handleCloseEdit();
			})
			.catch(err => {
				MySwal.fire({
					title: 'Error',
					text:
						err.response.data.message != null
							? err.response.data.message
							: err.response.data,
					icon: 'error',
					confirmButtonText: 'OK',
				});
			});
	};

	const loadData = async () => {
		axios.defaults.headers.common['Authorization'] = sessionUser.token;
		await axios
			.get(import.meta.env.VITE_LISTACOUNT)
			.then(res => {
				setAccoutsUser(res.data.accounts);
			})
			.catch(err => {
				MySwal.fire({
					title: 'Error',
					text:
						err.response.data.message != null
							? err.response.data.message
							: err.response.data,
					icon: 'error',
					confirmButtonText: 'OK',
				});
			});
	};

	useEffect(() => {
		loadData();
	}, [dataSend]);

	const columns = [
		{
			name: 'ID',
			selector: (row: any) => row.id,
		},
		{
			name: 'NOMBRE DE CUENTA',
			selector: (row: any) => row.title,
		},
	];

	const data = accoutsUser.map((value: any, index) => {
		return {
			id: index,
			title: value.name,
			identifier: value._id,
		};
	});

	const handleInputChange = e => {
		setDataSend(preUser => ({
			...preUser,
			name: e.target.value,
		}));
	};

	const alerts = (text, type) => {
		Swal.fire({
			inputValue: selectedRowName,
			title: text,
			inputAttributes: {
				placeholder: 'Nombre de la cuenta'
			  },
			input: 'text',
			confirmButtonText: 'Guardar',
			showCancelButton: true,
			showLoaderOnConfirm: true,
			cancelButtonColor: '#F26D6D',
			inputValidator: value => {
				if (!value) {
					return 'El campo no puede estar vacio.';
				}
			},
		}).then(result => {
			if (result.isConfirmed) {
				const { value } = result;
				setDataSend(preUser => ({
					...preUser,
					name: value,
				}));

				if (type == 'add') {
					agregar();
				} else {
					modificar();
				}
			}
		});
	};

	const isInputValid = dataSend.name.trim() !== '';
	const isInputValidEdit = selectedRowName !== '';

	return (
		<>
			<div className='librodiario__header'>
				<span
					className='librodiario__title'
					style={{ fontFamily: 'sans-serif' }}
				>
					Agregar cuentas
				</span>
				<button
					className='librodiario__button-add'
					style={{
						backgroundColor: 'green',
						display: selectedRowId == undefined ? 'none' : 'flex',
					}}
					onClick={() => {
						alerts('Ingrese el nuevo nombre de la cuenta.', 'edit');
					}}
				>
					<EditIcon />
				</button>
				<button
					className='librodiario__button-add'
					style={{
						backgroundColor: 'red',
						display: selectedRowId == undefined ? 'none' : 'flex',
					}}
					onClick={handleOpenDelete}
				>
					<DeleteOutlineIcon />
				</button>
				<button
					className='librodiario__button-add'
					onClick={() => {
						alerts('Ingrese el nombre de la cuenta.', 'add');
					}}
				>
					+
				</button>
			</div>
			<DataTable
				selectableRows
				selectableRowsSingle
				customStyles={customStyles}
				pagination
				columns={columns}
				data={data}
				onSelectedRowsChange={({ selectedRows }) => {
					setSelectedRowName(selectedRows[0]?.title);
					setSelectedRowId(selectedRows[0]?.identifier);
					console.log(selectedRows[0]?.identifier);
				}}
			/>
		</>
	);
};

export default Home;
