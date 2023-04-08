import { configureStore } from '@reduxjs/toolkit'
import AccountSlice from './AccountSlice'
import ItemSlice from './ItemSlice'



export default configureStore({
    reducer: {

        user: AccountSlice,
        items: ItemSlice
    }
    
  })