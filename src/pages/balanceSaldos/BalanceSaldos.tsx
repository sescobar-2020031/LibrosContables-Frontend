import { useState, useEffect, useContext } from 'react';
import DataTable from 'react-data-table-component';
import axios from 'axios';
import SessionUserContext from '../../context/sessionUserContext';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

const BalanceSaldos = () => {
	const convertNumbers = number => {
		const convertedNumber = number.toLocaleString('es-GT', {
			style: 'currency',
			currency: 'GTQ',
		});

		return convertedNumber;
	};

	const { sessionUser } = useContext(SessionUserContext);
	const [credit, setCredit] = useState(0);
	const [debit, setDebit] = useState(0);

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

	const loadData = async () => {
		axios.defaults.headers.common['Authorization'] = sessionUser.token;
		await axios
			.post(import.meta.env.VITE_GETBALANCE, {
				idDiary: sessionUser.diaryBook,
			})
			.then(data => {
				setDebit(data.data.balance.fullDebit);
				setCredit(data.data.balance.fullCredit);
				setAccoutsUser(data.data.balance.accountItem);
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
		console.log('Hola me ejecute');
		loadData();
	});

	const columns = [
		{
			name: 'ID',
			selector: (row: any) => (row.id != null ? row.id : row.firstTitle),
		},
		{
			name: 'NOMBRE DE CUENTA',
			selector: (row: any) => (row.title != null ? row.title : row.secondTitle),
		},
		{
			name: 'DEBE',
			selector: (row: any) => {
				if (row.position == 'Debit') {
					return convertNumbers(row.amount);
				} else if (row.debit != null) {
					return convertNumbers(debit);
				} else {
					return '';
				}
			},
		},
		{
			name: 'HABER',
			selector: (row: any) => {
				if (row.position == 'Credit') {
					return convertNumbers(row.amount);
				} else if (row.credit != null) {
					return convertNumbers(credit);
				} else {
					return '';
				}
			},
		},
	];

	const data = accoutsUser.map((value: any, index) => {
		return {
			id: index,
			title: value.name,
			amount: value.account.amount,
			position: value.account.position,
		};
	});

	const emptyRow = {
		firstTitle: 'SUMA DE SALDOS',
		secondTitle: 'TOTALES',
		credit,
		debit,
	};

	const dataWithEmptyRow = [...data, emptyRow];

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
				columns={columns}
				data={dataWithEmptyRow}
			/>
		</>
	);
};

export default BalanceSaldos;
