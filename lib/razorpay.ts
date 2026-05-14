// TODO: Wire real Razorpay SDK when payment is implemented
console.warn('[Singara] razorpay.ts is a stub — wire real SDK before going live')

export async function createOrder(amount: number, currency = 'INR') {
  return { id: 'mock_order', amount, currency }
}
