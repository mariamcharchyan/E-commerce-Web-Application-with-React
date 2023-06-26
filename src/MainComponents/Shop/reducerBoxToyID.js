import { createSlice, createAsyncThunk  } from '@reduxjs/toolkit';

export const fetchBoxToyDataID = createAsyncThunk(
    'boxToys/fetchBoxToyDataID',
    async (id) => {
      const response = await fetch(`http://localhost:5000/product/${id}`);
      const data = await response.json();
      return data;
    }
);

export const boxToyIDSlice = createSlice({
    name: 'boxToyID',
    initialState: {
        data: [],
        status: 'idle',
        error: null,
      },
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(fetchBoxToyDataID.pending, (state) => {
            state.status = 'loading';
        })
        .addCase(fetchBoxToyDataID.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.data = action.payload;
        })
        .addCase(fetchBoxToyDataID.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.error.message;
        });
    },    
});

export default boxToyIDSlice.reducer;