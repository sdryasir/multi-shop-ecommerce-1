import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    cart: []
}

const cartSlice = createSlice({
    name: 'cartSlice',
    initialState,
    reducers: {
        addToCart(state, action) {
            const productToAdd = action.payload;
            const existingProduct = state.cart.find(product => product._id === productToAdd._id);

            if (existingProduct) {
                existingProduct.quantity += 1;
            } else {
                state.cart.unshift({ ...productToAdd, quantity: 1 });
            }
        },
        removeFromCart(state, action) {
            const productToRemove = action.payload;
            const existingProduct = state.cart.find(product => product._id === productToRemove._id);

            if (existingProduct) {
                if (existingProduct.quantity > 1) {
                    existingProduct.quantity -= 1;
                } else {

                    state.cart = state.cart.filter(product => product._id !== productToRemove._id);
                }
            }
        },
        emptyCart(state, action) {
            state.cart = action.payload;
        },
    },
})

export const { addToCart, removeFromCart, emptyCart } = cartSlice.actions
export default cartSlice.reducer