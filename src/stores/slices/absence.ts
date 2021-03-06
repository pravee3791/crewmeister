import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import {IAbsence} from "../../models/absences";

export interface AbsenceS  {
  absences:Array<IAbsence> ,
  isAbsenteesFetching: boolean,
  isError: boolean,
  isAbsenteeDataAvailable: boolean

}

const initialState: AbsenceS = {
    absences: [],
    isAbsenteesFetching:false,
    isError: false,
    isAbsenteeDataAvailable:false
}

export const Absence = createSlice({
  name: 'absence',
  initialState,
  reducers: {
      requestAbsence(state) {
        state.isAbsenteesFetching = true
      },
      loadAbsence(state, action:PayloadAction<IAbsence[]>){
          state.isAbsenteesFetching = false;
          state.isError = false;
          state.absences = action.payload;
          state.isAbsenteeDataAvailable = true;
      },
      failureAbsence(state){
        state.isAbsenteesFetching = false;
        state.isError = true;
      },
      // setAbsenteeDataAvailableStatus(state, action:PayloadAction<boolean>){
      //   state.isAbsenteeDataAvailable = action.payload;
      // }

  },
})

export const {requestAbsence,loadAbsence,failureAbsence } = Absence.actions

export default Absence.reducer