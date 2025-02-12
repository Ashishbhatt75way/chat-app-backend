
import { Document } from 'mongoose';

interface User {
        name: string;
        email: string;
        active?: boolean;
        role: "USER" | "ADMIN";
        password: string
}

export interface IUser extends User, Document { }



