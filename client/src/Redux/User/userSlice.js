import{createSlice} from "@reduxjs/toolkit"
const initialState=
{
    currentUser:null,
    loading:false,
    error:null,
};

const userSlice=createSlice({
    name:"user",
    initialState,
    reducers:{
        signInStart:(state) =>{
            state.loading=true;
            state.error=null;
        },
        signInFailure:(state,action)=>
        {
            state.loading=false;
            state.error=action.payload;
            
        },
        signInSuccess:(state,action)=>
        {
            state.currentUser=action.payload;
            state.error=null;
            state.loading=false;
        }
    },
});
export const {signInFailure, signInStart, signInSuccess}=userSlice.actions;
export default userSlice.reducer;