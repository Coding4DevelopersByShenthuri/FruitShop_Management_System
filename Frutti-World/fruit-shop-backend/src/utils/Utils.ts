// utils/Utils.ts

// Calculate total amount based on products array
// export const calculateTotalAmounts = (products: Array<{ price: number, quantity: number }>): number => {
//     return products.reduce((total, product) => {
//         return total + (product.price * product.quantity);
//     }, 0);
// };

// Helper function to calculate TotalAmount
export const calculateTotalAmount = (products: { name: string, quantity: number, price: number }[]) => {
    return products.reduce((total, product) => total + product.quantity * product.price, 0);
};