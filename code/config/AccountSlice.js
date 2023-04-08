import { createSlice } from '@reduxjs/toolkit'

 export const Account = createSlice({
   name: 'Account',
   initialState: {
    useraccount: [],
    userview: [],
   },
   reducers: {
      setUserAccount: (state , action ) => {
        state.useraccount = action.payload
        console.log(action)
        console.log('action')
 
      },
      setUserView: (state , action ) => {
        state.userview = action.payload
        console.log(action)
        console.log('action')
 
      },
  }
 })
 
 // Action creators are generated for each case reducer function
 export const {setUserAccount, setUserView} = Account.actions
 
 export default Account.reducer