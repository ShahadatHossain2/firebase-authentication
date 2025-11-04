import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  updateProfile,
} from "firebase/auth";
import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router";
import { auth } from "../../firebase.init";

const EmailSignUp = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    const name = e.target.name.value;
    const photo = e.target.photoUrl.value;
    const isChecked = e.target.terms.checked;

    console.log("Clicked");

    setErrorMessage("");
    setSuccess(false);

    if (!isChecked) {
      setErrorMessage("Please accept our terms and conditions");
      return;
    }
    if (password.length < 6) {
      setErrorMessage("Password must have 6 characters or more!!");
    }
    if (!/[a-z]/.test(password)) {
      setErrorMessage("Password must have at least one lowercase letter");
    }
    if (!/[A-Z]/.test(password)) {
      setErrorMessage("Password must have at least one Uppercase letter");
    }
    if (!/[0-9]/.test(password)) {
      setErrorMessage("Password must have at least one Number");
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {
        console.log(result);
        sendEmailVerification(auth.currentUser).then(() => {
          setSuccess(true);
          alert("Verification Email sent!! Please check!!");
        });
        const profile = {
          displayName: name,
          photoURL: photo,
        };

        updateProfile(auth.currentUser, profile)
          .then(() => {
            console.log("Profile updated");
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div className="card bg-base-100 w-full mx-auto my-10 max-w-sm shrink-0 shadow-2xl">
      <div className="card-body">
        <h3 className="text-2xl font-bold text-center">Sign Up Now!</h3>
        <form onSubmit={handleSubmit} className="fieldset">
          <label className="label">Name</label>
          <input
            name="name"
            type="text"
            className="input"
            placeholder="Your Name"
            required
          />
          <label className="label">Photo URL</label>
          <input
            name="photoUrl"
            type="text"
            className="input"
            placeholder="Photo URL"
            required
          />
          <label className="label">Email</label>
          <input
            name="email"
            type="email"
            className="input"
            placeholder="Email"
            required
          />
          <label className="label">Password</label>
          <div className="relative">
            <input
              name="password"
              type={`${showPassword ? "text" : "password"}`}
              className="input"
              placeholder="Password"
            />
            <button
              onClick={() => setShowPassword(!showPassword)}
              type="button"
              className="btn btn-xs absolute top-2 right-6"
            >
              {showPassword ? <FaEye></FaEye> : <FaEyeSlash></FaEyeSlash>}
            </button>
          </div>

          <label className="label">
            <input type="checkbox" name="terms" className="checkbox" />
            Accept Terms & Conditions
          </label>
          <div>
            <p>
              Already have an account?{" "}
              <Link
                to="/emailSignIn"
                className="text-blue-500 underline font-bold"
              >
                SingIn
              </Link>
            </p>
          </div>
          <p className="text-red-500 my-1">{errorMessage}</p>
          {success && (
            <p className="text-green-500">Account Successfully Created!!</p>
          )}
          <button className="btn btn-neutral mt-4">Sign Up</button>
        </form>
      </div>
    </div>
  );
};

export default EmailSignUp;
