export interface UserSession {
    name: String,
    surname: String,
    email: String,
    password: String
}

export interface HeadersProps {
    logged: boolean;
    setLogged: (value: boolean) => void;
}