import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { addDoc, collection } from "firebase/firestore";
import { fireStore } from "../lib/firebase";
import { toast } from "react-toastify";
export function SignUp() {
  const [firstName, firstNameChange] = useState("");
  const [email, emailChange] = useState("");
  const [password, passwordChange] = useState("");
  const [confirmPassword, confirmPasswordChange] = useState("");

  const usenavigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validate()) {
      try {
        const docRef = await addDoc(collection(fireStore, "users"), {
          firstName: firstName,
          password: password,
          email: email,
          confirmPassword: confirmPassword,
        });

        console.log("Document written with ID: ", docRef.id);
        toast("Registered successfully");
        usenavigate("/sign-in");
      } catch (e) {
        console.error("Error adding document: ", e.message);
        toast("Failed to register");
      }
    }
  };
  const validate = () => {
    let result = true;
    if (firstName === "" || firstName === null) {
      result = false;
      toast("Please enter your name");
    }
    if (email === "" || email === null) {
      result = false;
      toast("Please enter your email");
    }
    if (password === "" || password === null) {
      result = false;
      toast("Please enter your password");
    }
    if (confirmPassword === "" || confirmPassword === null) {
      result = false;
      toast("Please confirm your passsword");
    }
    return result;
  };

  return (
    <div className="container">
      <div className="input-block-back">
        <div className="input-block">
          <div className="logo">
            <img src="./img/logo.png" alt="Logo" />
            <h3>TurboSale.</h3>
          </div>
          <h2>Create Account</h2>
          <div className="form">
            <form onSubmit={handleSubmit}>
              <div className="name">
                <label>Your Username</label>
                <input
                  type="text"
                  name="name"
                  value={firstName}
                  onChange={(e) => firstNameChange(e.target.value)}
                />
              </div>
              <div className="email">
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => emailChange(e.target.value)}
                />
              </div>
              <div className="password">
                <label>Password</label>
                <input
                  type="password"
                  name="password"
                  value={password}
                  onChange={(e) => passwordChange(e.target.value)}
                />
              </div>
              <div className="confirm-password">
                <label>Confirm Password</label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => confirmPasswordChange(e.target.value)}
                />
              </div>
              <button className="submit-btn" type="submit">
                Sign Up
              </button>
            </form>
          </div>
          <p className="policy">
            By clicking Sign Up, you agree to our Terms,{" "}
            <span className="span">Data Policy</span> and{" "}
            <span className="span">Cookie Policy</span>.
          </p>
          <div className="sign-in-div">
            <p className="sign-in-p">
              Already have an account?{" "}
              <NavLink to="/sign-in" className="sign-in-btn">
                Sign in
              </NavLink>
            </p>
          </div>
        </div>
      </div>
      <div className="blue-block">
        <img src="./img/statistic.png" alt="Statistic" />
        <div className="blue-block-text">
          <h3>Connect and manage with your team!</h3>
          <p>
            Aziest Jordan is one of the biggest superstars to have emerged from
            the professional designer in the world.
          </p>
        </div>
      </div>
    </div>
  );
}
