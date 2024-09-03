import mongoose from 'mongoose';

const paymentSchema = new mongoose.Schema({
    PaymentID: {
        type: String,
        required: true,
        unique: true
    },
    PaymentDate: {
        type: Date,
        default: Date.now
    },
    Amount: {
        type: Number,
        required: true
    },
    OrderID: {
        type: String, // Change this from ObjectId to String
        required: true
    }
});

const Payment = mongoose.model('Payment', paymentSchema);

export default Payment;