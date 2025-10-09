import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { TypeGateway } from "@/types";
import type { RootState } from "../store";

type InitialState = {
  types: TypeGateway[] | null;
};

const initialState: InitialState = {
  types: null,
};

const socketTypeSlice = createSlice({
  name: `socket-types`,
  initialState,
  reducers: {
    addTypes: (state, action: PayloadAction<TypeGateway[]>) => {
      state.types = action.payload;
    },
    cleanTypes: (state) => {
      state.types = null;
    },
  },
});

export const { addTypes, cleanTypes } = socketTypeSlice.actions;
export const socketType = (state: RootState) => {
  const { types } = state.socketTypes;
  return { types };
};
export default socketTypeSlice.reducer;
