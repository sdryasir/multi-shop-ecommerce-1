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
            state.cart.unshift({ ...productToAdd, quantity: 1 });
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
        increaseQty: (state, action) => {
            console.log(action.payload._id);
            let itemFound = state.cart.find(item => item._id === action.payload._id);
            itemFound.quantity = itemFound.quantity + 1;
        },
        decreaseQty: (state, action) => {
            let itemFound = state.cart.find(item => item._id === action.payload._id);
            itemFound.quantity = itemFound.quantity - 1;
        },
    },
})

export const { addToCart, removeFromCart, emptyCart, increaseQty, decreaseQty } = cartSlice.actions
export default cartSlice.reducer