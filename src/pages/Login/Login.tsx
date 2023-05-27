import { useContext, Fragment, useEffect } from 'react';
import LoginRegister from "../../components/Login-Register/Login-Register";
import LoginRegisterContext from "../../context/loginRegisterContext";

function Login() {
    const { setLoginRegister } = useContext(LoginRegisterContext); ``
    useEffect(() => {
        setLoginRegister("Login")
    }, [])

    return (
        <Fragment>
            <LoginRegister />
        </Fragment>
    )
}

export default Login;
