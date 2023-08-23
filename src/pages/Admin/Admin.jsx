import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import styles from "./Admin.module.css";
import supabase from "../../supabase/supabase";

function Admin() {
  // const [session, setSession] = useState(null);

  // // auth
  // useEffect(() => {
  //   supabase.auth.getSession().then(({ data: { session } }) => {
  //     setSession(session);
  //   });

  //   const {
  //     data: { subscription },
  //   } = supabase.auth.onAuthStateChange((_event, session) => {
  //     setSession(session);
  //   });

  //   return () => subscription.unsubscribe();
  // }, []);

  // return !session ? (
  //   <div className={styles.authContainer}>
  //     <div className={styles.auth}>
  //       <Auth
  //         supabaseClient={supabase}
  //         appearance={{ theme: ThemeSupa }}
  //         providers={false}
  //         showLinks={false}
  //       />
  //     </div>
  //   </div>
  // ) : (
  //   <>
  //     <Outlet supabase={supabase} />
  //   </>
  // );

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    const res = await fetch("http://localhost:3001/api/admin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
  };
  return (
    <>
      <input
        type="text"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <input
        type="text"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <button onClick={handleLogin}>Log In</button>
    </>
  );
}

export default Admin;
