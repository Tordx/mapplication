import { createSlice } from '@reduxjs/toolkit'

 export const Account = createSlice({
   name: 'Account',
   initialState: {
    useraccount: [],
   },
   reducers: {
      setUserAccount: (state , action ) => {
        state.useraccount = action.payload
        console.log(action)
        console.log('action')
 
      },
  }
 })
 
 // Action creators are generated for each case reducer function
 export const {setUserAccount} = Account.actions
 
 export default Account.reducer