import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import axios from 'axios'

const url = 'https://course-api.com/react-useReducer-cart-project';

const initialState = {
  cartItems: [],
  amount: 0,
  total: 0,
  isLoading: true,
};


export const getCartItems = createAsyncThunk('cart/getCartItems', async(thunkAPI) => {
  //return fetch(url).then(resp => resp.json()).catch(err => console.log(err))
  //othing

  try {
    const res = await axios(url)
    return res.data
  } catch (error) {
    thunkAPI.rejectWithValue('something went wrong');
  }

})

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    clearCart: (state) => {
      state.cartItems = [];
    },
    removeItem: (state, action) => {
      state.cartItems = state.cartItems.filter((item) => item.id !== action.payload)
    },
    increaseAmount: (state, { payload }) => {
      const { id } = payload
      const cartItem = state.cartItems.find((item) => item.id === id)
      cartItem.amount = cartItem.amount + 1;
    },
    decreaseAmount: (state, { payload }) => {
      const { id } = payload
      const cartItem = state.cartItems.find((item) => item.id === id)
      cartItem.amount = cartItem.amount - 1;
    },
    calTotals: (state) => {
      let amount = 0;
      let total = 0;
      state.cartItems.forEach((item) => {
        amount += item.amount;
        total += item.amount * item.price;
      });
      state.amount = amount;
      state.total = total;
    },
  },

  extraReducers : (builder)=>{
    builder.addCase(getCartItems.pending,(state) => {
      state.isLoading = true;
    })
    .addCase(getCartItems.fulfilled,(state, action) => {
      state.isLoading = false;
      state.cartItems = action.payload;
    })
    .addCase(getCartItems.rejected,(state) => {
      state.isLoading = false
    })
  }
  // extraReducers: {
  //   [getCartItems.pending]: (state) => {
  //     state.isLoading = true;
  //   },
  //   [getCartItems.fulfilled]: (state, action) => {
  //     state.isLoading = false;
  //     state.cartItems = action.payload;
  //   },
  //   [getCartItems.rejected]: (state) => {
  //     state.isLoading = false
  //   }
  // }
});

export const { clearCart, removeItem, increaseAmount, decreaseAmount, calTotals } = cartSlice.actions;

export default cartSlice.reducer;