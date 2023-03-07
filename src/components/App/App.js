import React, { useState, useEffect } from "react";
import "./App.css";
// import { getUrls } from '../../apiCalls';
import UrlContainer from "../UrlContainer/UrlContainer";
import UrlForm from "../UrlForm/UrlForm";

const App = () => {
  const [urls, setUrls] = useState([]);
  const getUrls = async () => {
    const response = await fetch("http://localhost:3001/api/v1/urls");
    if (!response.ok) {
      throw new Error("Unable to fetch");
    }
    return response.json();
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await getUrls();
      console.log(data); // it works!
      return setUrls(data.urls);
    };
    fetchData();
  }, []);

  return (
    <main className="App">
      <header>
        <h1>URL Shortener</h1>
        <UrlForm />
      </header>

      <UrlContainer urls={urls} />
    </main>
  );
};

export default App;
