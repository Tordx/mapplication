import { createSlice } from '@reduxjs/toolkit'

 export const Account = createSlice({
   name: 'account',
   initialState: {
      email: [],
      password: [],
      coordinates: [],
   },
   reducers: {
      setEmail: (state , action ) => {
        state.email = action.payload
        console.log(action)
        console.log('action')
      },
      setPassword: (state , action ) => {
        state.password = action.payload
        console.log(action)
        console.log('action')
      },
      setCoordinates: (state , action ) => {
        state.coordinates = action.payload
        console.log(action)
        console.log('action')
      },
 
   }
 })
 
 // Action creators are generated for each case reducer function
 export const {setEmail, setPassword, setCoordinates} = Account.actions
 
 export default Account.reducer