"use client";
import { createUserWithEmailAndPassword, signOut } from "firebase/auth";
import React, { useState } from "react";
import { auth } from "../../../../firebase";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signOutUser = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.log(error);
    }
  };
  const signUp = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user = userCredential.user;
    } catch (err) {
      const errCode = err.errCode;
      const errMessage = err.message;
      console.log(err);
    }
  };

  const handleforms = (e) => {
    e.preventDefault();
    signUp();
  };
  return (
    <div>
      <form onSubmit={handleforms}>
        <input
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="SUBMIT" value={"SIGN UP"}>
          SUBMIT
        </button>
      </form>

      <button onClick={signOutUser}>SignOut</button>
    </div>
  );
};

export default SignUp;
