"use client";
import React, { useState } from "react";
import { signIn } from 'next-auth/react';
import { Toaster, toast } from "react-hot-toast";


const SignInPage = () => {
  const [email, setEmail] = useState("sandun.suntws@gmail.com");
  const [password, setPassword] = useState("");

  
  const signInUser = async () => {
    try {
        const result = await signIn("credentials", {
            email: email,
            password:password,
            redirect: true,
            callbackUrl: "/admin",
          })
      
      if (!result) {
        toast.error('Something went wrong!')
      }
    } catch (err) {
        toast.error('Something went wrong!')
      console.log(err);
    }
  };

  
  return (
    <> <Toaster/>
    <div>
    
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

        <button onClick={signInUser} >
          SUBMIT
        </button>
     

      
    </div></>
  );
};

export default SignInPage;
