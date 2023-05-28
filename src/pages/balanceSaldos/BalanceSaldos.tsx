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

const BalanceSaldos = () => {
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

	return (
		<>
			<div
				style={{ display: 'flex', justifyContent: 'center' }}
				className='librodiario__header'
			>
				<span
					className='librodiario__title'
					style={{ fontFamily: 'sans-serif' }}
				>
					Balance de saldos
				</span>
			</div>
			<DataTable
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

export default BalanceSaldos;
