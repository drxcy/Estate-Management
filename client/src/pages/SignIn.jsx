import { useState } from "react";
import { Link,useNavigate} from "react-router-dom";
import { signInFailure,signInStart,signInSuccess } from "../Redux/User/userSlice";
import { useDispatch,useSelector } from "react-redux";
export default function SignIn() {
  const [formdata, setformdata] = useState({});
  const navigate =useNavigate();
  const dispatch =useDispatch();
  const {loading,error} =useSelector((state=>state.user))
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      dispatch(signInStart());
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formdata),
      });
      const data = await res.json();
      if(data.success==false){
        dispatch(signInFailure(data.message));
        return;
      }
      dispatch(signInSuccess(data));
        navigate('/');
      
      
    } catch (error) {
      dispatch(signInFailure(error.message));
    }
  };

  const changeHandler = async (e) => {
    setformdata({ ...formdata, [e.target.id]: e.target.value });
  };

  return (
    <div className="w-max-lg mx-auto p-3">
      <h1 className="text-3xl text-center font-semibold my-7">Sign In</h1>
      <form className="flex flex-col gap-4" onChange={submitHandler}>
        
        <input
          type="email"
          placeholder="email"
          id="email"
          onChange={changeHandler}
          className="rounded-lg border p-3"
        />
        <input
          type="password"
          placeholder="password"
          id="password"
          onChange={changeHandler}
          className="rounded-lg border p-3"
        />
        <button
        disabled={loading}
          type="Submit"
          className="bg-blue-900 text-white p-3 font-semibold rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
        >
         {loading ? "Loading..." :"Sign In"}
        </button>
      </form>
      <div className="flex space-x-1 mt-5 font-semibold">
        <p className="text-left">Dont have an account?</p>{" "}
        <Link to="/Sign-up">
          <span className="text-blue-900 hover:text-blue-700">Sign Up</span>
        </Link>
      </div>
      {error && <p className='text-red-500 mt-5'>{error}</p>}
    </div>
  );
}

