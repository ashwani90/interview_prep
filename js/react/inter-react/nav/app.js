import React from "react";
import Navbar from "./components/Navbar/Navbar";

export default function App() {
  return (
    <>
      <Navbar />
      <main style={{ padding: "20px" }}>
        <section id="home"><h1>Home</h1></section>
        <section id="about" style={{ height: "100vh" }}><h1>About</h1></section>
        <section id="services" style={{ height: "100vh" }}><h1>Services</h1></section>
        <section id="contact" style={{ height: "100vh" }}><h1>Contact</h1></section>
      </main>
    </>
  );
}
