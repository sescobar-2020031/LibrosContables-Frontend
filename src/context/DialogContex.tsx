import { createContext, Dispatch, SetStateAction } from 'react';

const DialogContext = createContext({
    open: false,
    setOpen: (() => { }) as Dispatch<SetStateAction<boolean>>
});

export default DialogContext;