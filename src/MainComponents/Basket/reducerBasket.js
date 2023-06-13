import { createSlice, createAsyncThunk  } from '@reduxjs/toolkit';


export const fetchBasket = createAsyncThunk(
    'basket/fetchBasket',
    async (userId) => {
      const response = await fetch(`http://localhost:5000/basketItems/${userId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${localStorage.getItem('token')}`,
        }
      });
      const data = await response.json();
      return data;
    }
);
// const basketData = useSelector((state) => state.basket.data);
// console.log(basketData);

// let totalPrice = 0;
// let quantity = 0;
// basketData?.forEach((item) => {
//     totalPrice += item.quantity * item.productData.price;
//     quantity += item.quantity;
// });
export const basketSlice = createSlice({
    name: 'basket',
    initialState: {
        data: [],
        totalProducts: 0,
        totalAmount: 0,
        status: 'idle',
        error: null,
      },
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(fetchBasket.pending, (state) => {
            state.status = 'loading';
            // state.data = null;
            state.error =  null;
            state.totalAmount = 0;
            state.totalProducts = 0;
        })
        .addCase(fetchBasket.fulfilled, (state, action) => {
            const data = action.payload;
            state.status = 'succeeded';
            state.data = data;
            state.error =  null;
            if(data.length > 0){
              data.forEach((item) => {
                state.totalAmount += item.quantity * item.productData.price;
                state.totalProducts += item.quantity;
            });
            }
        })
        .addCase(fetchBasket.rejected, (state, action) => {
            state.status = 'failed';
            state.data = null;
            state.error = action.error.message;
        });
    },    
});

export default basketSlice.reducer;