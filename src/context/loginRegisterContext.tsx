import { createContext, Dispatch, SetStateAction } from 'react';

const LoginRegisterContext = createContext({
    loginRegister: "",
    setLoginRegister: (() => { }) as Dispatch<SetStateAction<string>>
});

export default LoginRegisterContext;