import React, { useEffect } from "react";
import NavBar from "../Navbar";
import "./MessagesPage.css";

function MessagesPage() {
  useEffect( async () => {
    const res = await fetch('/api/messages');
    const messages = await res.json();
    console.log(messages);
  }, [])

  return (
    <NavBar />

  )
}

export default MessagesPage;
