import { Schema, model, Types, Document } from 'mongoose';
import Store from './Store'; // Import the Store model
import bcrypt from 'bcrypt';

interface IUser extends Document {
    _id: Types.ObjectId;
    username: string;
    email: string;
    password: string;
    address: string;
    phone: string;
    userType: 'Seller' | 'Buyer' | 'Admin';
    storeId: Types.ObjectId; // Reference to the Store model
    comparePassword(candidatePassword: string): Promise<boolean>;
}

const userSchema = new Schema<IUser>({
    username: { type: String, required: true }, // Removed unique: true
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    address: { type: String, required: true },
    phone: { type: String, required: true },
    userType: { type: String, required: true, enum: ['Seller', 'Buyer', 'Admin'] },
    storeId: { type: Schema.Types.ObjectId, ref: 'Store' },
});


userSchema.pre<IUser>('save', async function (next) {
    if (!this.isModified('password')) {
        return next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});
userSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {
    return bcrypt.compare(candidatePassword, this.password);
};

const User = model<IUser>('User', userSchema);
export { User, IUser };