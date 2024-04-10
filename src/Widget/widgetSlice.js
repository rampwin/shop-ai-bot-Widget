import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  toggleWidget: false,
  channel_id: null,
};

export const widgetSlice = createSlice({
  name: "widget",
  initialState,
  reducers: {
    setToggleWidget: (state, action) => {
      state.toggleWidget = action.payload;
    },
    setUserId: (state, action) => {
      state.channel_id = action.payload;
    },
  },
});

export const { setToggleWidget, setUserId } = widgetSlice.actions;

export default widgetSlice.reducer;
