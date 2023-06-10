import { createSlice, createAsyncThunk  } from '@reduxjs/toolkit';

export const fetchBoxToysData = createAsyncThunk(
    'boxToys/fetchBoxToysData',
    async () => {
      const response = await fetch('http://localhost:5000/products?offset=0&limit=30');
      const data = await response.json();
      return data;
    }
  );

export const boxToysSlice = createSlice({
    name: 'boxToys',
    initialState: {
        data: [],
        status: 'idle',
        error: null,
      },
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(fetchBoxToysData.pending, (state) => {
            state.status = 'loading';
        })
        .addCase(fetchBoxToysData.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.data = action.payload;
        })
        .addCase(fetchBoxToysData.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.error.message;
        });
    },    
});

export default boxToysSlice.reducer;