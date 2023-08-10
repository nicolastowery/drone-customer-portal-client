import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import styles from "./Admin.module.css";
import supabase from "../../supabase/supabase";

function Admin() {
  const [session, setSession] = useState(null);

  // auth
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  return !session ? (
    <div className={styles.authContainer}>
      <div className={styles.auth}>
        <Auth
          supabaseClient={supabase}
          appearance={{ theme: ThemeSupa }}
          providers={false}
          showLinks={false}
        />
      </div>
    </div>
  ) : (
    <>
      <Outlet supabase={supabase} />
    </>
  );
}

export default Admin;
