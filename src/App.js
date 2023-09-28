import { useCallback, useEffect, useState, useRef } from "react";
import '../src/App.css'

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");
  
  let passwordRef = useRef(null)
  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

    if (numberAllowed) str += "0123456789";
    if (charAllowed) str += "!@#$%^&*()_-+={}[]|:;<>,.?/~";

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
      //  console.log(pass)
    }


    setPassword(pass);
  }, [length, numberAllowed, charAllowed, setPassword]);

  const copyToClipboard = () =>{
    passwordRef.current.select()
    window.navigator.clipboard.writeText(password)
  }

  useEffect(() => {
      passwordGenerator()
  }, [length, numberAllowed, charAllowed, setPassword])

  return (
    <>
      <div className=" gradient w-full max-w-md mx-auto shadow-md rounded-lg px-4 my-8 text-white border">
        <h1 className="text-black text-center my-3 pt-2 font-serif ">Password Generator</h1>
        <div className="flex shadow rounded-lg overflow-hidden mb-4">
          <input
            type="text"
            value={password}
            name=""
            id=""
            className="outline-none w-full py-1 px-3 text-green-900"
            placeholder="Password"
            readOnly
            ref={passwordRef}
          />
          <button className="outline-none bg-blue-600 text-white shrink-0 py-0.5 px-3" onClick={copyToClipboard}>
            Copy
          </button>
        </div>
        <div className="flex text-sm gap-x-7">
          <div className="flex items-center gap-x-1 mb-5">
            <input
              type="range"
              min={8}
              max={100}
              value={length}
              onChange={(e) => {
                setLength(e.target.value);
              }}
              className="cursor-pointer"
            />
            <label htmlFor="">Length: {length} </label>
          </div>
          <div className="flex items-center gap-x-1 mb-5">
            <input
              type="checkbox"
              id="checkAllowed"
              defaultChecked={numberAllowed}
              onChange={() => {
                setNumberAllowed((prev) => !prev);
              }}
            />
            <label htmlFor="">Number {numberAllowed} </label>
          </div>
          <div className="flex items-center gap-x-1 mb-5">
            <input
              type="checkbox"
              id="checkAllowed"
              defaultChecked={charAllowed}
              onChange={() => {
                setCharAllowed((prev) => !prev)
              }}
            />
            <label htmlFor=""> Character</label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
