
import { type IUser } from "./user.dto";
import UserSchema from "./user.schema";
import createHttpError from "http-errors";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

/**
 * Creates a new user in the database.
 * 
 * @param {IUser} data - The user data to be added to the database.
 * @returns {Promise<IUser>} - The created user document.
 */

export const createUser = async (data: IUser) => {

    const { email } = data;
    const user = await UserSchema.findOne({ email });
    if (user) {
        throw new createHttpError.BadRequest("User already exists");
    }

    const result = await UserSchema.create({ ...data, active: true });
    return result;
};

/**
 * Updates an existing user in the database.
 * 
 * @param {string} id - The ID of the user to update.
 * @param {IUser} data - The user data to update.
 * @returns {Promise<IUser | null>} - The updated user document if it exists, otherwise null.
 */
export const updateUser = async (id: string, data: IUser): Promise<IUser | null> => {

    const { email } = data;
    const user = await UserSchema.findOne({ email });
    
    if (!user) {
        throw new createHttpError.BadRequest("User does not exist");
    }

    const result = await UserSchema.findOneAndUpdate({ _id: id }, data, {
        new: true,
    });

    return result;
};


/**
 * Edits an existing user in the database.
 * 
 * @param {string} id - The ID of the user to edit.
 * @param {Partial<IUser>} data - The user data to be updated.
 * @returns {Promise<IUser | null>} - The edited user document if it exists, otherwise null.
 * 
 * The function will also hash the password before updating the user document if a password is provided.
 * It also checks if the new email already exists in the database and throws a bad request error if so.
 */
export const editUser = async (id: string, data: Partial<IUser>): Promise<IUser | null> => {

    const { email } = data;
    const user = await UserSchema.findOne({ email });

    if (!user) {
        throw new createHttpError.BadRequest("User does not exist");
    }

    if (data.password) {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(data.password, salt);
        data.password = hashedPassword;
    }

    if (data.email) {
        const emailExists = await UserSchema.findOne({ email: data.email });
        if (emailExists) {
            throw new createHttpError.BadRequest("Email already exists");
        }
    }

    const result = await UserSchema.findOneAndUpdate({ _id: id }, data);
    return result;
};


/**
 * Deletes a user from the database by ID.
 * 
 * @param {string} id - The ID of the user to be deleted.
 * @returns {Promise<DeleteResult>} - The result of the deletion operation.
 */
export const deleteUser = async (id: string) => {
    const result = await UserSchema.deleteOne({ _id: id });
    return result;
};

/**
 * Fetches a user by their ID.
 * 
 * @param {string} id - The ID of the user to retrieve.
 * @returns {Promise<IUser | null>} - The user document if found, otherwise null.
 */
export const getUserById = async (id: string): Promise<IUser | null> => {
    const result = await UserSchema.findById(id).lean();
    return result;
};

/**
 * Fetches all users from the database.
 * 
 * @returns {Promise<IUser[]>} - A list of user documents.
 */
export const getAllUser = async () => {
    const result = await UserSchema.find({}).lean();
    return result;
};

/**
 * Fetches a user by their email address.
 * 
 * @param {string} email - The email address of the user to retrieve.
 * @returns {Promise<IUser | null>} - The user document if found, otherwise null.
 */
export const getUserByEmail = async (email: string) => {
    const result = await UserSchema.findOne({ email }).lean();
    return result;
}

/**
 * Adds a new member to a user.
 *
 * @param {string} id - The ID of the user to add the member to.
 * @param {Partial<IUser>} data - The member data to be added.
 * @returns {Promise<IUser | null>} - The updated user document if found, otherwise null.
 */
export const addMembers = async (id: string, data: Partial<IUser>): Promise<IUser | null> => {
    const result = await UserSchema.findOneAndUpdate({ _id: id }, { $push: { members: data } });
    return result;
}
