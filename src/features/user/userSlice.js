import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../lib/firebase";

// Başlangıç durumu (initial state)
const initialState = {
  currentUser: null,
  isLoading: true,
  error: null,
};

// Kullanıcı bilgilerini almak için async thunk
export const fetchUserInfo = createAsyncThunk(
  "user/fetchUserInfo",
  async (uid, { rejectWithValue }) => {
    try {
      if (!uid) {
        return null;
      }
      const docRef = doc(db, "users", uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        return docSnap.data();
      } else {
        return null;
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// User slice
export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserInfo.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchUserInfo.fulfilled, (state, action) => {
        state.currentUser = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchUserInfo.rejected, (state, action) => {
        state.currentUser = null;
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default userSlice.reducer;
