import { useEffect, useState } from "react";

import services from "./services/veraAI";

import "./App.css";


// that's it...
// the simple stuff can reside in the backend... we just fetch it...
// nice and easy...

function App() {
  // now let's try to get data from backend
  let [baseString, setBaseString] = useState("");
  let [greetings, setGreeting] = useState("");
  let [posn, setPosn] = useState(0);
  let [inputVal, setInputVal] = useState("");
  let [loading, setLoading] = useState(false);

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
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    // make request to the backend...
    setLoading(true);

    services.computeVal({
      sentence: inputVal
    }).then(e => {
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
    })
  }

  useEffect(() => {
    services.getGreetings().then(e => {
      // set greetings to one sha....
      setBaseString(e[Math.floor(Math.random() * e.length)]);
    });
  }, []);

  return (
    <main>
      <div>
        <h1>{greetings}</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            className={`input is-large ${loading ? "is-loading" : ""}`}
            placeholder="one hundred and five"
            value={inputVal}
            onChange={handleChange}
          />
          <button className="button is-warning">Convert</button>
        </form>
      </div>
    </main>
  );
}

export default App;