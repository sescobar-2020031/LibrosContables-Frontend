import { useState, useEffect, useContext } from 'react'
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

const Home = () => {
    const [accoutsUser, setAccoutsUser] = useState([]);
    const [dataSend, setDataSend] = useState({
        name: ''
    });
    const { sessionUser } = useContext(SessionUserContext);
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const agregar = async () => {
        axios.defaults.headers.common['Authorization'] = sessionUser.token;
        await axios.post(import.meta.env.VITE_ADDACOUNT, dataSend)
            .then(() => {
                loadData();
                handleClose();
            }).catch((err) => {
                console.log(err);
            });
    }

    const loadData = async () => {
        axios.defaults.headers.common['Authorization'] = sessionUser.token;
        await axios.get(import.meta.env.VITE_LISTACOUNT)
            .then((res) => {
                setAccoutsUser(res.data.accounts);
            }).catch((err) => {
                console.log(err);
            });
    }

    useEffect(() => {
        loadData();
    }, [dataSend])

    const columns = [
        {
            name: 'Id',
            selector: (row: any) => row.id,
        },
        {
            name: 'Nombre',
            selector: (row: any) => row.title,
        },
    ];

    const data = accoutsUser.map((value: any, index) => {
        return {
            id: index,
            title: value.name
        }
    });

    return (
        <>
            <div className='librodiario__header'>
                <span className='librodiario__title'>Agregar cuentas</span>
                <button
                    className='librodiario__button-add'
                    onClick={handleOpen}
                >
                    +
                </button>
            </div>
            <DataTable
                columns={columns}
                data={data}
            />
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Agregar Cuenta"}
                </DialogTitle>
                <Box sx={{ pl: 10, pr: 10, pt: 3, pb: 3 }}>
                    <FormControl fullWidth >
                        <InputLabel htmlFor="outlined-adornment-amount">Nombre</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-amount"
                            startAdornment={<InputAdornment position="start"></InputAdornment>}
                            label="Amount"
                            onChange={e => setDataSend((preUser) => ({
                                ...preUser,
                                name: e.target.value
                            }))}
                        />
                    </FormControl>
                </Box>
                <DialogActions>
                    <Button onClick={handleClose}>Cerrar</Button>
                    <Button onClick={agregar} autoFocus>
                        Guardar
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default Home;
