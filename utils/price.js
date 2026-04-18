// utils/price.js
export function calculateTotal(items, discountRate = 0) {
    if (!items || items.length === 0) return 0;
    const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    return subtotal * (1 - discountRate);
}
