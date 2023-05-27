import { createContext } from 'react';

interface UserContextValue {
    sessionUser: {
        fullName: string;
        email: string;
        token: string;
        userLoggued: boolean;
    };
    setSessionUser: (user: {
        fullName: string;
        email: string;
        token: string;
        userLoggued: boolean;
    }) => void;
}

const SessionUserContext = createContext<UserContextValue>({
    sessionUser: {
        fullName: "",
        email: "",
        token: "",
        userLoggued: false
    },
    setSessionUser: () => { }
});

export default SessionUserContext;