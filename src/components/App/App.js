import React, { useState, useEffect } from "react";
import "./App.css";
// import { getUrls } from '../../apiCalls';
import UrlContainer from "../UrlContainer/UrlContainer";
import UrlForm from "../UrlForm/UrlForm";

const App = () => {
  const [urls, setUrls] = useState([]);
  const [hasError, setError] = useState("");
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

  //function to add newURL

  const addNewUrl = (newUrl) => {
    console.log(newUrl);
    fetch("http://localhost:3001/api/v1/urls", {
      method: "POST",
      body: JSON.stringify(newUrl),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((response) => {
        if (response.message) {
          throw new Error(response.message);
        } else {
          return response;
        }
      })
      .then((response) => setUrls([response, ...urls]))
      .catch((error) => setError(error));
  };
  return (
    <main className="App">
      <header>
        <h1>URL Shortener</h1>
        <UrlForm addNewUrl={addNewUrl} />
      </header>

      <UrlContainer urls={urls} />
    </main>
  );
};

export default App;
