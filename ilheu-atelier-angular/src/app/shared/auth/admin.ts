export interface Admin {
    admin_id?: number;
    name: string;
    email: string;
    password: string;
    confirm_password?: string;
    username: string;
    token?: string;
    exp?: number;
}