import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import {IMember} from "../../models/member";

export interface MemberS  {
  members:Array<IMember> ,
  isMemberFetching: boolean,
  isError: boolean,
  isMemberDataAvailable: boolean
}

const initialState: MemberS = {
    members: [],
    isMemberFetching:false,
    isError: false,
    isMemberDataAvailable: false
}

export const Member = createSlice({
  name: 'member',
  initialState,
  reducers: {
      requestMembers(state) {
        state.isMemberFetching = true
      },
      loadMembers(state, action:PayloadAction<IMember[]>){
          state.isMemberFetching = false;
          state.isError = false;
          state.members = action.payload;
          state.isMemberDataAvailable = true;
      },
      failureMembers(state){
        state.isMemberFetching = false;
        state.isError = true;
      },
   

  },
})

export const {requestMembers,loadMembers,failureMembers} = Member.actions

export default Member.reducer