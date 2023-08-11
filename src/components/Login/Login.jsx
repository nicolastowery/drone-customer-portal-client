import { useState } from "react";

function Login({ setToken }) {
  const [password, setPassword] = useState("");
  const handleLogin = async (password) => {
    try {
      const res = await fetch("http://localhost:3001/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Set the content type header
        },
        body: JSON.stringify({ password }), // Send the password in a JSON object
      });

      if (res.ok) {
        const data = await res.json();
        const { token } = data;
        localStorage.setItem("token", token);
        setToken(token);
        console.log("token saved!");
      } else {
        console.error("Error signing in:", res.status);
      }
    } catch (error) {
      console.error("Error signing in:", error);
    }
  };
  return (
    <>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={() => handleLogin(password)}>Log In</button>
    </>
  );
}

export default Login;
