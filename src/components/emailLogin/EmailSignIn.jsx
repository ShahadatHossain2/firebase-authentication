import {
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
} from "firebase/auth";
import React, { useRef, useState } from "react";
import { auth } from "../../firebase.init";

const EmailSignIn = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const emailRef = useRef();
  const handleSubmit = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    console.log(email, password);
    setErrorMessage("");
    setSuccess(false);
    signInWithEmailAndPassword(auth, email, password)
      .then((result) => {
        if (!result.user.emailVerified) {
          alert("Please verify your email!!");
        } else {
          setSuccess(true);
        }
      })
      .catch((error) => {
        setErrorMessage(error.message);
        console.log(error);
      });
  };

  const handleUpdatePassword = () => {
    const email = emailRef.current.value;
    sendPasswordResetEmail(auth, email)
      .then(() => alert("Password Reset Link Send to your email!!"))
      .catch((error) => setErrorMessage(error.message));
  };
  return (
    <div className="card bg-base-100 w-full mx-auto my-10 max-w-sm shrink-0 shadow-2xl">
      <div className="card-body">
        <h3 className="text-2xl font-bold text-center">Sign In Now!</h3>
        <form onSubmit={handleSubmit} className="fieldset">
          <label className="label">Email</label>
          <input
            name="email"
            ref={emailRef}
            type="email"
            className="input"
            placeholder="Email"
            required
          />
          <label className="label">Password</label>
          <input
            name="password"
            type="password"
            className="input"
            placeholder="Password"
          />
          <div onClick={handleUpdatePassword}>
            <a className="link link-hover">Forget Password?</a>
          </div>
          <button className="btn btn-neutral mt-4">Login</button>
          <p className="text-red-500">{errorMessage}</p>
          {success && <p className="text-green-500">Logged in Successfully</p>}
        </form>
      </div>
    </div>
  );
};

export default EmailSignIn;
