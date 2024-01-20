import { createSlice } from '@reduxjs/toolkit';

const initialState = { 
  name:"",
  email:"",
  id:0,
 };

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    addUser: (state, action) => {
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.id = action.payload.id;
    },
    changeEmail: (state, action) => {
      state.email = action.payload;
    },
    changeName: (state, action) => {
      state.name = action.payload;
    },
    changeId: (state, action) => {
      state.id = action.payload;
    },
    resetUser: (state) => {
      state.name = "";
      state.email = "";
      state.id = 0;
    }

  },
});

export const { addUser, changeEmail, changeName, changeId, resetUser } = userSlice.actions;

export default userSlice.reducer;
