import { createSlice } from "@reduxjs/toolkit";

// Başlangıç durumu (initial state)
const initialState = {
  chatId: null,
  user: null,
  isCurrentUserBlocked: false,
  isReceiverBlocked: false,
};

// Slice oluşturma
export const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    changeChat: (state, action) => {
      const { chatId, user, currentUser } = action.payload;

      // Current User Blocked?
      if (user.blocked.includes(currentUser.id)) {
        state.chatId = chatId;
        state.user = null;
        state.isCurrentUserBlocked = true;
        state.isReceiverBlocked = false;
      }
      // Receiver Blocked?
      else if (currentUser.blocked.includes(user.id)) {
        state.chatId = chatId;
        state.user = user;
        state.isCurrentUserBlocked = false;
        state.isReceiverBlocked = true;
      } else {
        state.chatId = chatId;
        state.user = user;
        state.isCurrentUserBlocked = false;
        state.isReceiverBlocked = false;
      }
    },
    changeBlock: (state) => {
      state.isReceiverBlocked = !state.isReceiverBlocked;
    },
    resetChat: (state) => {
      state.chatId = null;
      state.user = null;
      state.isCurrentUserBlocked = false;
      state.isReceiverBlocked = false;
    },
  },
});

// Reducer ve actions'ı export etme
export const { changeChat, changeBlock, resetChat } = chatSlice.actions;
export default chatSlice.reducer;
