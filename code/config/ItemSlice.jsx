import { createSlice } from '@reduxjs/toolkit'

 export const Item = createSlice({
   name: 'Item',
   initialState: {
    item: [],
   },
   reducers: {
      setItem: (state , action ) => {
        state.item = action.payload
        console.log(action)
        console.log('action')
      },
 
   }
 })
 
 // Action creators are generated for each case reducer function
 export const {setItem } = Item.actions
 
 export default Item.reducer