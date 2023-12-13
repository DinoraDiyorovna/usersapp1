import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";

export function SignIn() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validate()) {
      try {
        const response = await fetch(`http://localhost:8000/user/${username}`);

        if (!response.ok) {
          throw new Error(`Login failed due to: ${response.statusText}`);
        }

        const user = await response.json();

        if (!user || user.password !== password) {
          console.log("Invalid credentials");
        } else {
          navigate("/users");
        }
      } catch (err) {
        console.error("Error during login:", err.message);
        alert(err.message); 
      }
    }
  };

  const validate = () => {
    if (!username.trim() || !password.trim()) {
      alert("Please enter both username and password");
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
