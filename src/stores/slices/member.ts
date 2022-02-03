import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import {IMember} from "../../models/member";

export interface MemberS  {
  members:Array<IMember> ,
  isFetching: boolean,
  isError: boolean,
  isMemberDataAvailable: boolean
}

const initialState: MemberS = {
    members: [],
    isFetching:false,
    isError: false,
    isMemberDataAvailable: false
}

export const Member = createSlice({
  name: 'member',
  initialState,
  reducers: {
      requestMembers(state) {
        state.isFetching = true
      },
      loadMembers(state, action:PayloadAction<IMember[]>){
          state.isFetching = false;
          state.isError = false;
          state.members = action.payload;
          state.isMemberDataAvailable = true;
      },
      failureMembers(state){
        state.isFetching = false;
        state.isError = true;
      },
   

  },
})

export const {requestMembers,loadMembers,failureMembers} = Member.actions

export default Member.reducer