import { useState, useEffect, useContext } from 'react';
import DataTable from 'react-data-table-component';
import axios from 'axios';
import SessionUserContext from '../../context/sessionUserContext';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

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
                <div style={{ marginTop: '2rem' }}>
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                        }}
                    >
                        <h2>{data.name}</h2>
                    </div>
                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            position: 'relative',
                            borderTop: '3px solid black',
                        }}
                    >
                        <div
                            style={{
                                width: '50%',
                                borderRight: '2px solid black',
                                padding: '8px',
                            }}
                        >
                            <ul
                                style={{
                                    listStyle: 'none',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'center',
                                    alignContent: 'center',                                
                                }}>
                                {
                                    data.debits.map((accountData) => {
                                        return (
                                            <li>#{accountData.numberDiaryBook} {convertNumbers(accountData.amount)}</li>
                                        )
                                    })
                                }
                            </ul>
                        </div>
                        <div
                            style={{
                                width: '50%',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                padding: '8px',
                            }}
                        >
                            <ul style={{
                                listStyle: 'none',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',
                            }}>
                                {
                                    data.credits.map((accountData) => {
                                        return (
                                            <li>#{accountData.numberDiaryBook} {convertNumbers(accountData.amount)}</li>
                                        )
                                    })
                                }
                            </ul>
                        </div>
                        <div
                            style={{
                                position: 'absolute',
                                top: '0',
                                left: '50%',
                                width: '2px',
                                height: '100%',
                                background: 'black',
                            }}
                        ></div>
                    </div>
                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            position: 'relative',
                            borderTop: '3px solid black',
                        }}
                    >
                        <div
                            style={{
                                width: '50%',
                                borderRight: '2px solid black',
                                padding: '8px',
                            }}
                        >
                            <ul style={{
                                listStyle: 'none',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',
                            }}>
                                <li>
                                    {
                                        data.fullDebits ?
                                            convertNumbers(data.fullDebits)
                                            : null
                                    }
                                </li>
                                {
                                    data.balance.position == 'Debit' ?
                                        <li>
                                            {
                                                convertNumbers(data.balance.account)
                                            }
                                        </li>
                                        : 0.00
                                }
                            </ul>
                        </div>
                        <div
                            style={{
                                width: '50%',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                padding: '8px',
                            }}
                        >
                            <ul style={{
                                listStyle: 'none'
                            }}>
                                <li>
                                    {
                                        data.fullCredits ?
                                            convertNumbers(data.fullCredits)
                                            : 0.00
                                    }
                                </li>
                                {
                                    data.balance.position == 'Credit' ?
                                        <li>
                                            {
                                                convertNumbers(data.balance.account)
                                            }
                                        </li>
                                        : null
                                }
                            </ul>
                        </div>
                        <div
                            style={{
                                position: 'absolute',
                                top: '0',
                                left: '50%',
                                width: '2px',
                                height: '100%',
                                background: 'black',
                            }}
                        ></div>
                    </div>
                    <div
                        style={{
                            display: 'flex',
                            marginBottom: '1px',
                            alignItems: 'center',
                            justifyContent: 'center',
                            position: 'relative',
                            borderTop: '3px solid black',
                        }}
                    ></div>
                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            position: 'relative',
                            borderTop: '3px solid black',
                        }}
                    >
                        <div
                            style={{
                                width: '50%',
                                borderRight: '2px solid black',
                                padding: '8px',
                            }}
                        >
                            <ul style={{
                                listStyle: 'none'
                            }}>
                                <li>{
                                    data.fullCredits > data.fullDebits ?
                                        convertNumbers(data.fullCredits)
                                        : convertNumbers(data.fullDebits)
                                }</li>
                            </ul>
                        </div>
                        <div
                            style={{
                                width: '50%',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                padding: '8px',
                            }}
                        >
                            <ul style={{
                                listStyle: 'none'
                            }}>
                                <li>{
                                    data.fullCredits > data.fullDebits ?
                                        convertNumbers(data.fullCredits)
                                        : convertNumbers(data.fullDebits)
                                }</li>
                            </ul>
                        </div>
                        <div
                            style={{
                                position: 'absolute',
                                top: '0',
                                left: '50%',
                                width: '2px',
                                height: '100%',
                                background: 'black',
                            }}
                        ></div>
                    </div>
                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            position: 'relative',
                            borderTop: '3px solid black',
                        }}
                    ></div>
                    <div
                        style={{
                            display: 'flex',
                            marginTop: '1px',
                            alignItems: 'center',
                            justifyContent: 'center',
                            position: 'relative',
                            borderTop: '3px solid black',
                        }}
                    ></div>
                </div>
            )
        })
    );
};

export default GeneralLedger;