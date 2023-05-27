import { useContext, Fragment, useEffect } from 'react';
import LoginRegister from "../../components/Login-Register/Login-Register";
import LoginRegisterContext from "../../context/loginRegisterContext";

function Register() {
    const { setLoginRegister } = useContext(LoginRegisterContext);
    useEffect(() => {
        setLoginRegister("Register")
    }, [])
    return (
        <Fragment>
            <LoginRegister />
        </Fragment>
    )
}

export default Register;
