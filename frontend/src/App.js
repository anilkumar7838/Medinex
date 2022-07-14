import React, { useEffect } from "react";
import "./App.css";
import dataStore from "./dataStore";

import axios from "axios";
import Cookies from "js-cookie";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { loadUser } from "./actions/userAction";
import ProtectedRoute from "./components/Route/protectedRoute";

import Loginpage from "./components/User/Loginpage.js";

import Home from "./components/Home/Home";
import About from "./components/About/about";
import Notification from "./components/Notification/Notification";
import AddMedicine from "./components/AddMedicine/AddMedicine";

import ResetPassword from "./components/User/ResetPassword";
import ForgotPassword from "./components/User/ForgotPassword";
import UpdatePassword from "./components/User/UpdatePassword";

import Register from "./components/User/Register";
import Animation1 from "./components/utils/Animation/animation1";
import { useState } from "react";
import Contact from "./components/ContactUs/contact";

function App() {

  const [toggle,setToggle]=useState(true);

  const publicVapidKey =
    "BFQDJ92ih1ovDk0wIBgGKr5TS4zLwBmXkNZU-B_CeS8W9v1D966aFFwyQpxlgNvOZGudUmrkP2_ISYygWPVpk78";

  // Check for service worker
  if ("serviceWorker" in navigator) {
    send().catch((err) => console.error(err));
  }

  // Register SW, Register Push, Send Push
  async function send() {
    // Register Service Worker
    // console.log("Registering service worker...");
    const register = await navigator.serviceWorker.register("./worker.js", {
      scope: "/",
    });
    // console.log("Service Worker Registered...");

    // Register Push
    console.log("Registering Push...");
    const subscription = await register.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(publicVapidKey),
    });
    console.log("Push Registered...");

    // Send Push Notification
    console.log("Sending Push...");
    await axios.post("/subscribe", {
      body: subscription,
      headers: {
        "content-type": "application/json",
      },
    });
    console.log("Push Sent...");
  }

  function urlBase64ToUint8Array(base64String) {
    const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
    const base64 = (base64String + padding)
      .replace(/\-/g, "+")
      .replace(/_/g, "/");

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  }

  useEffect(() => {
    const user = Cookies.get("token");
    // console.log(user);
    if (user) {
      axios.defaults.headers.common.Authorization = `Bearer ${user}`;
    }
    dataStore.dispatch(loadUser());
  }, [toggle]);
  return (
    <Router>
      <Routes>
        {toggle ? (<>
            <Route path="/" element={<Animation1 />} />
            {
            setTimeout(() => {
              setToggle(false);
            }, 3000)
            }
        </>
        ) : (
          <Route path="/" element={<Home />} />
          )}
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Loginpage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/password/forgot" element={<ForgotPassword />} />
        <Route path="/password/reset/:token" element={<ResetPassword />} />
        <Route
          path="/notify"
          element={
            <ProtectedRoute>
              <Notification />
            </ProtectedRoute>
          }
        />
        <Route
          path="/medicines"
          element={
            <ProtectedRoute>
              <AddMedicine />
            </ProtectedRoute>
          }
        />
        <Route
          path="/password/update"
          element={
            <ProtectedRoute>
              <UpdatePassword />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
