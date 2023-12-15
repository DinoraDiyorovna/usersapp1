import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { fireStore } from "../lib/firebase";
import { toast } from "react-toastify";

export function SignIn() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validate()) {
      try {
        const querySnapshot = await getDocs(collection(fireStore, "users"));
        let userFound = false;

        querySnapshot.forEach((doc) => {
          const userData = doc.data();
          if (
            username === userData.firstName &&
            password === userData.password
          ) {
            userFound = true;
          }
        });

        if (userFound) {
          toast(`Welcome ${username}`);
          navigate("/users");
        } else {
          alert("Failed to login. Please check your username and password.");
        }
      } catch (err) {
        console.error("Error during login:", err.message);
        toast(err.message);
      }
    }
  };

  const validate = () => {
    if (!username.trim() || !password.trim()) {
      toast("Please enter both username and password");
      return false;
    }
    return true;
  };

  return (
    <div className="container">
      <div className="input-block-back">
        <div className="input-block">
          <div className="logo">
            <img src="./img/logo.png" alt="Logo" />
            <h3>TurboSale.</h3>
          </div>
          <h2>Welcome back</h2>

          <div className="form">
            <form onSubmit={handleSubmit}>
              <div className="username">
                <label>Username</label>
                <input
                  type="text"
                  name="name"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className="password">
                <label>Password</label>
                <input
                  type="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <button className="submit-btn" type="submit">
                Sign in
              </button>
            </form>
          </div>

          <div className="sign-in-div">
            <p className="sign-in-p">
              Don't have an account?{" "}
              <NavLink to="/" className="sign-in-btn">
                Sign up
              </NavLink>
            </p>
          </div>
        </div>
      </div>
      <div className="blue-block">
        <img src="/img/statistic.png" alt="Statistic" />
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
