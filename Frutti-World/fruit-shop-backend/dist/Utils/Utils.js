"use strict";
// utils/Utils.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateTotalAmount = void 0;
// Calculate total amount based on products array
// export const calculateTotalAmounts = (products: Array<{ price: number, quantity: number }>): number => {
//     return products.reduce((total, product) => {
//         return total + (product.price * product.quantity);
//     }, 0);
// };
// Helper function to calculate TotalAmount
const calculateTotalAmount = (products) => {
    return products.reduce((total, product) => total + product.quantity * product.price, 0);
};
exports.calculateTotalAmount = calculateTotalAmount;
