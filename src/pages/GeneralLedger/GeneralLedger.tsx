import { useState, useEffect, useContext } from 'react';
import DataTable from 'react-data-table-component';
import axios from 'axios';
import SessionUserContext from '../../context/sessionUserContext';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import './style.scss'

const MySwal = withReactContent(Swal);

const GeneralLedger = () => {
    const convertNumbers = number => {
        const convertedNumber = number.toLocaleString('es-GT', {
            style: 'currency',
            currency: 'GTQ',
        });

        return convertedNumber;
    };
    const { sessionUser } = useContext(SessionUserContext);
    const [accoutsUser, setAccoutsUser] = useState<any>([]);
    const [credit, setCredit] = useState(0);
    const [debit, setDebit] = useState(0);

    const [dataSend, setDataSend] = useState({
        name: '',
    });

    const loadData = async () => {
        axios.defaults.headers.common['Authorization'] = sessionUser.token;
        await axios
            .post(import.meta.env.VITE_MAYOR, {
                idDiary: sessionUser.diaryBook,
            })
            .then(data => {
                //console.log(data.data.generalLedger);
                console.log(data.data.generalLedger.itemLedger);
                setDebit(data.data.generalLedger.fullDebit);
                setCredit(data.data.generalLedger.fullCredit);
                setAccoutsUser(data.data.generalLedger.itemLedger);
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

    return (
        accoutsUser.map((data) => {
            return (
                <div className="flex-container_padre">
                    <div className="card">
                        <div className="container">
                            <div className='center text_title'>
                                {data.name}
                            </div>
                            <div className="line"></div>
                            <div className="flex-container">
                                <div className="flex-item item-left">{
                                    data.debits.map((accountData) => {
                                        return (
                                            <div className='diplay_flex'>
                                                <p>#{accountData.numberDiaryBook}</p>
                                                <p className='center'>{convertNumbers(accountData.amount)}</p>
                                            </div>
                                        )
                                    })
                                }</div>
                                <div className="flex-item">{
                                    data.credits.map((accountData) => {
                                        return (
                                            <div className='diplay_flex'>
                                                <p className='center'>{convertNumbers(accountData.amount)}</p>
                                                <p>#{accountData.numberDiaryBook}</p>
                                            </div>

                                        )
                                    })
                                }</div>
                            </div>
                            <div className="line"></div>
                            <div className="flex-container">
                                <div className="flex-item item-left">
                                    <p className='center'>
                                        {
                                            data.fullDebits ?
                                                convertNumbers(data.fullDebits)
                                                : null
                                        }
                                    </p>
                                    {
                                        data.balance.position == 'Debit' ?
                                            <p className='center'>
                                                {
                                                    convertNumbers(data.balance.account)
                                                }
                                            </p>
                                            : ' '
                                    }
                                </div>
                                <div className="flex-item">
                                    <p className='center'>
                                        {
                                            data.fullCredits ?
                                                convertNumbers(data.fullCredits)
                                                : null
                                        }
                                    </p>
                                    {
                                        data.balance.position == 'Credit' ?
                                            <p className='center'>
                                                {
                                                    convertNumbers(data.balance.account)
                                                }
                                            </p>
                                            : ' '
                                    }
                                </div>
                            </div>
                            <div className="line"></div>
                            <div className="line" style={{ marginTop: '2px' }}></div>
                            <div className="flex-container">
                                <div className="flex-item item-left center">
                                    {
                                        data.fullCredits > data.fullDebits ?
                                            convertNumbers(data.fullCredits)
                                            : convertNumbers(data.fullDebits)
                                    }
                                </div>
                                <div className="flex-item center">
                                    {
                                        data.fullCredits > data.fullDebits ?
                                            convertNumbers(data.fullCredits)
                                            : convertNumbers(data.fullDebits)
                                    }
                                </div>
                            </div>
                            <div className="line"></div>
                            <div className="line" style={{ marginTop: '2px' }}></div>
                        </div>
                    </div>
                </div>
            )
        })
    );
};

export default GeneralLedger;