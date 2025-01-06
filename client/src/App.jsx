import { useEffect, useRef, useState } from "react";

import services from "./services/veraAI";
import logo from "./assets/revv-10.jpg"
import "./App.css";

// that's it...
// the simple stuff can reside in the backend... we just fetch it...
// nice and easy...
const greetingsArr = [
  "Hi, I'm VeraAI. Enter any number in words and I will magically turn it into digits.",
  "Hi. I'm VeraAI. I'm here to help you convert words to digits",
];

function App() {
  // now let's try to get data from backend
  let [baseString, setBaseString] = useState("");
  let [greetings, setGreeting] = useState("");
  let [posn, setPosn] = useState(0);
  let [inputVal, setInputVal] = useState("");
  let [loading, setLoading] = useState(false);
  let inputEl = useRef(null);

  // This is just for simple animation....
  let greetingTimeout = setTimeout(() => {
    if (greetings == baseString) {
      clearTimeout(greetingTimeout);
    } else {
      setPosn(posn + 1);
      setGreeting(baseString.substring(0, posn));
    }
  }, 25);

  const handleChange = (event) => {
    setInputVal(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // make request to the backend...
    setLoading(true);

    services
      .computeVal({
        sentence: inputVal,
      })
      .then((e) => {
        // console.log(e); // makes sense?
        let val = e.val;
        if (val) {
          setBaseString(`${inputVal} in digits is ${val}`);
          setGreeting("");
          setPosn(0);
          setInputVal("");
          setLoading(false);
        } else {
          setBaseString(`Sorry, I can't understand your statement`);
          setGreeting("");
          setPosn(0);
          setInputVal("");
          setLoading(false);
        }
      });
  };

  useEffect(() => {
    setBaseString(
      greetingsArr[Math.floor(Math.random() * greetingsArr.length)]
    );
    inputEl.current.focus();
  }, []);

  return (
    <main>
      <div className="chat">
        <img src={logo} alt="v-img" />
        <h1>{greetings}</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            className={`input is-large`}
            placeholder="one hundred and five"
            value={inputVal}
            onChange={handleChange}
            ref={inputEl}
          />
          <button
            className={`button is-warning ${loading ? "is-loading" : ""}`}
          >
            Convert
          </button>
        </form>
        <div className="footerx">
          <p>A very basic full-stack web application</p>
          <div className="code-info">
            <p>tsolawoyin</p>
            <p>|</p>
            <p>Apera Veronica</p>
            <p>|</p>
            <p>
              <a href="https://github.com/tsolawoyin/VeraAI">source</a>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}

export default App;
