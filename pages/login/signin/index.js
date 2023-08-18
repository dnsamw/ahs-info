"use client";
import React, { useState } from "react";
import { signIn } from "next-auth/react";
import { Toaster, toast } from "react-hot-toast";
import styles from "../../../src/app/page.module.css";
import variables from "../../../src/styles/variables.module.scss";
import adminCss from "../../../src/styles/admin.module.scss";
import Image from "next/image";

const SignInPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signInUser = async () => {
    try {
      const result = await signIn("credentials", {
        email: email,
        password: password,
        redirect: true,
        callbackUrl: "/admin",
      });

      if (!result) {
        toast.success("Login Succesfull!");
      }
    } catch (err) {
      toast.error("Something went wrong!");
      console.log(err);
    }
  };

  return (
    <>
      {" "}
      <Toaster />
      <div className={variables.gradient}></div>
      <main className={styles.main}>
        <div className={variables.ahsLogo}>
          <Image src="/ahs_logo.png" width={350} height={75} alt="AHS Logo" />
          <p>
            Assessment of Cardiovascular Risk Factor Levels of Vegetarians and
            Non-Vegetarians
          </p>
        </div>
        <div className={adminCss.loginContainer}>
          <input
            type="email"
            name="email"
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button className={adminCss.btn} onClick={signInUser}>
            SUBMIT
          </button>
        </div>
      </main>
    </>
  );
};

export default SignInPage;
