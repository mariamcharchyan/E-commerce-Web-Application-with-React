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

export const basketSlice = createSlice({
    name: 'basket',
    initialState: {
        data: [],
        status: 'idle',
        error: null,
      },
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(fetchBasket.pending, (state) => {
            state.status = 'loading';
            state.data = null;
            state.error =  null;
        })
        .addCase(fetchBasket.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.data = action.payload;
            state.error =  null;
        })
        .addCase(fetchBasket.rejected, (state, action) => {
            state.status = 'failed';
            state.data = null;
            state.error = action.error.message;
        });
    },    
});

export default basketSlice.reducer;