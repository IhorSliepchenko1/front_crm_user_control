import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";

type InitialState = {
  taskId: string | null;
  projectId: string | null;
};

const initialState: InitialState = {
  taskId: null,
  projectId: null,
};

const socketTypeSlice = createSlice({
  name: `socket-types`,
  initialState,
  reducers: {
    addTypes: (state, action: PayloadAction<InitialState>) => {
      state.taskId = action.payload.taskId;
      state.projectId = action.payload.projectId;
    },
    cleanTypes: (state) => {
      state.taskId = null;
      state.projectId = null;
    },
  },
});

export const { addTypes, cleanTypes } = socketTypeSlice.actions;
export const socketType = (state: RootState) => {
  const { taskId, projectId } = state.socketTypes;
  return { taskId, projectId };
};
export default socketTypeSlice.reducer;
