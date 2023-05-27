import { createContext } from 'react';

interface UserContextValue {
    sessionUser: {
        fullName: string;
        email: string;
        token: string;
        diaryBook: string;
        userLoggued: boolean;
    };
    setSessionUser: (user: {
        fullName: string;
        email: string;
        token: string;
        diaryBook: string;
        userLoggued: boolean;
    }) => void;
}

const SessionUserContext = createContext<UserContextValue>({
    sessionUser: {
        fullName: "",
        email: "",
        token: "",
        diaryBook: "",
        userLoggued: false
    },
    setSessionUser: () => { }
});

export default SessionUserContext;