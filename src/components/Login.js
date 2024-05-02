import { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../store/authSlice";

export default function Login() {
  const [enteredUsername, setEnteredUsername] = useState("");
  const [enteredPassword, setEnteredPassword] = useState("");
  const dispatch = useDispatch();

  const loginFunction = (userCredentials) => {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userCredentials),
    };

    fetch("http://localhost:5000/auth/login", requestOptions)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Response:", data);
        dispatch(login(data));
      })
      .catch((error) => {
        console.error("Error:", error.message);
      });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const userInfo = { username: enteredUsername, password: enteredPassword };

    console.log(userInfo);
    setEnteredPassword("");
    setEnteredUsername("");

    loginFunction(userInfo);

    ////perform Authetication using the Api

    // dispatch(login(userInfo));
  };

  return (
    <form className="form" onSubmit={submitHandler}>
      <h2>Login</h2>

      <div className="control-row">
        <div className="control no-margin">
          <label htmlFor="email">Username</label>
          <input
            id="username"
            type="text"
            name="username"
            placeholder="Enter Username"
            onChange={(event) => {
              setEnteredUsername(event.target.value);
            }}
            value={enteredUsername}
          />
        </div>

        <div className="control no-margin">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            name="password"
            placeholder="Enter Password"
            onChange={(event) => {
              setEnteredPassword(event.target.value);
            }}
            value={enteredPassword}
          />
        </div>

        <button type="submit" className="button">
          Login
        </button>
      </div>
    </form>
  );
}
