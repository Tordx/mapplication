import { configureStore } from '@reduxjs/toolkit'
import AccountSlice from './AccountSlice'



export default configureStore({
    reducer: {

        login: AccountSlice
    }
    
  })