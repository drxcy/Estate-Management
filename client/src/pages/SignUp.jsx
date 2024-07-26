import { useState } from "react";
import { Link,useNavigate} from "react-router-dom";

export default function SignUp() {
  const [formdata, setformdata] = useState({});
  const navigate =useNavigate();
  const submitHandler = async (e) => {
    e.preventdefault();
    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formdata),
      });
      const data = await res.json();
      if(data.success==false){
        alert(data.message);
      }
      if(data.success){
        navigate('/Sign-in');
      }
      
    } catch (error) {
      alert(error.message);
    }
  };

  const changeHandler = (e) => {
    setformdata({ ...formdata, [e.target.id]: e.target.value });
  };

  return (
    <div className="w-max-lg mx-auto p-3">
      <h1 className="text-3xl text-center font-semibold my-7">Sign Up</h1>
      <form className="flex flex-col gap-4" onChange={submitHandler}>
        <input
          type="text"
          placeholder="username"
          id="username"
          onChange={changeHandler}
          className="rounded-lg border p-3"
        />
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
          type="Submit"
          className="bg-blue-900 text-white p-3 font-semibold rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
        >
          Sign Up
        </button>
      </form>
      <div className="flex space-x-1 mt-5 font-semibold">
        <p className="text-left">Already have an account?</p>{" "}
        <Link to="Sign-in">
          <span className="text-blue-900 hover:text-blue-700">Login</span>
        </Link>
      </div>
    </div>
  );
}
