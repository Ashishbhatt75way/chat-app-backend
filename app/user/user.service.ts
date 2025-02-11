
import { type IUser } from "./user.dto";
import UserSchema from "./user.schema";
import createHttpError from "http-errors";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export const createUser = async (data: IUser) => {
    const result = await UserSchema.create({ ...data, active: true });
    return result;
};

export const updateUser = async (id: string, data: IUser) => {
    const result = await UserSchema.findOneAndUpdate({ _id: id }, data, {
        new: true,
    });
    return result;
};

export const editUser = async (id: string, data: Partial<IUser>) => {
    const result = await UserSchema.findOneAndUpdate({ _id: id }, data);
    return result;
};


export const deleteUser = async (id: string) => {
    const result = await UserSchema.deleteOne({ _id: id });
    return result;
};


export const getUserById = async (id: string) => {
    const result = await UserSchema.findById(id).lean();
    return result;
};


export const getAllUser = async () => {
    const result = await UserSchema.find({}).lean();
    return result;
};


export const getUserByEmail = async (email: string) => {
    const result = await UserSchema.findOne({ email }).lean();
    return result;
}

export const addMembers = async (id: string, data: Partial<IUser>) => {
    const result = await UserSchema.findOneAndUpdate({ _id: id }, { $push: { members: data } });
    return result;
}

export const login = async (data: Partial<IUser>) => {
    
        const { email, password } = data;
    
        if (!email || !password) {
          throw createHttpError(400, "Email and password are required");
        }
    
        const user = await UserSchema.findOne({ email });
        if (!user) {
          throw createHttpError(401, "Invalid email or password");
        }
    
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
          throw createHttpError(401, "Invalid email or password");
        }
    
        const accessToken = jwt.sign(
          { id: user._id, role: user.role },
          process.env.JWT_SECRET!,
          { expiresIn: "15m" }
        );
    
        const refreshToken = jwt.sign(
          { id: user._id, role: user.role },
          process.env.JWT_SECRET!,
          { expiresIn: "1d" }
        );
    

        const result = {
            id: user._id,
            role: user.role,
            accessToken,
            refreshToken
        }
    
    return result;
}