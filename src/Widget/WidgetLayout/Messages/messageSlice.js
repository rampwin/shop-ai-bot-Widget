import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// export const fetchBotResponse = createAsyncThunk(
//   "messages/fetchBotResponse",
//   async (payload, thunkAPI) => {
//     const response = await getBotResponse(payload);
//     console.log("bot response", response);
//     await new Promise((r) => setTimeout(r, 1000));
//     return response;
//   }
// );

const initialState = {
  messages: [],
  botTyping: false,
  userTyping: true,
  userTypingPlaceholder: "Type your message here...",
  userGreeted: false,
};
export const messagesSlice = createSlice({
  name: "messages",
  initialState,
  reducers: {
    addMessage: (state, action) => {
      if (action.payload.sender === "USER") {
        state.messages = state.messages.map((message) => {
          if (message.type === "custom") {
            if (message.text) {
              message = {
                text: message.text,
                sender: "BOT",
                type: "text",
                ts: message.ts,
              };
            }
          }
          if (message.type === "buttons") {
            message.quick_replies = [];
          }
          return message;
        });
      }
      if (
        state.messages[state.messages.length - 1]?.text ===
          action.payload?.text &&
        action.payload?.sender === "BOT"
      )
        return;
      state.messages.push(action.payload);
    },
    resetMessageState: () => {
      return initialState;
    },
    removeAllMessages: (state) => {
      state.messages = [];
    },
    disableButtons: (state, action) => {
      const index = action.payload;
      state.messages[index].callback = false;
    },
    toggleUserTyping: (state, action) => {
      state.userTyping = action.payload;
    },
    toggleBotTyping: (state, action) => {
      state.botTyping = action.payload;
      state.userTypingPlaceholder = action.payload
        ? "Please wait for bot response..."
        : "Type your message here...";
    },
    setUserTypingPlaceholder: (state, action) => {
      state.userTypingPlaceholder = action.payload;
    },
    setUserGreeted: (state, action) => {
      state.userGreeted = action.payload;
    },
  },
  // extraReducers: (builder) => {
  //   builder.addCase(fetchBotResponse.fulfilled, (state, action) => {
  //     if (action.payload.botMessage === null) return;
  //     state.botTyping = false;
  //     state.userTyping = true;
  //     state.userTypingPlaceholder = "Type your message here...";
  //     const messages = action.payload;
  //     let messageArr = [];
  //     messageArr.push(messages);
  //     if (messageArr.length > 0) {
  //       for (let index = 0; index < messageArr.length; index += 1) {
  //         const message = messageArr[index];
  //         // messageType: text
  //         if (message?.botMessage) {
  //           state.messages.push({
  //             text: message.botMessage,
  //             sender: "BOT",
  //             type: "text",
  //             ts: new Date(),
  //           });
  //         }

  //         // messageType: image
  //         if (message?.image) {
  //           state.messages.push({
  //             src: message.image,
  //             sender: "BOT",
  //             type: "image",
  //             ts: new Date(),
  //           });
  //         }

  //         // messageType: buttons
  //         if (message?.buttons) {
  //           if (message.buttons.length > 0) {
  //             state.messages.push({
  //               buttons: message.buttons,
  //               sender: "BOT",
  //               type: "buttons",
  //               ts: new Date(),
  //               callback: true,
  //             });
  //           }
  //         }
  //       }
  //     } else {
  //       state.messages.push({
  //         text: "Unfortunately, I'm having some problem 😅. I would appreciate it if you could try again later",
  //         sender: "BOT",
  //         type: "text",
  //         ts: new Date(),
  //       });
  //     }
  //   });
  // },
});

export const {
  addMessage,
  removeAllMessages,
  toggleBotTyping,
  toggleUserTyping,
  setUserTypingPlaceholder,
  setUserGreeted,
  resetMessageState,
  disableButtons,
} = messagesSlice.actions;

export default messagesSlice.reducer;
