import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import {IEmployee} from "../../models/employee";
import {sortObjectByProperty  } from "../../utility/utility";

export interface EmployeeS  {
  employees:Array<IEmployee> ,
  employeeCount:number,
  isEmployeesLoaded: boolean
}

export interface SortEmployees {
  employees:Array<IEmployee> ,
  type:string, 
  order: boolean
}

const initialState: EmployeeS = {
   employees: [],
   employeeCount: 0,
   isEmployeesLoaded:false
}


export const Employees = createSlice({
  name: 'member',
  initialState,
  reducers: {
      loadEmployees(state, action:PayloadAction<IEmployee[]>){
          state.employees = action.payload;
          state.employeeCount = action.payload.length;
          state.isEmployeesLoaded = true;
      },
      
  },
})

export const {loadEmployees} = Employees.actions

export default Employees.reducer