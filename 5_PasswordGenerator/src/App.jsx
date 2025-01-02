import { useCallback, useEffect, useRef, useState } from "react";

function App() {
  const [length, setLenght] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");

  //useRef
  const passwordRef = useRef(null)

  //Passsword Generator function
  const passwordGeberator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numberAllowed) str += "0123456789";
    if (charAllowed) str += "!@#$%^&*()_+-={}[]|:;<>,.?/";
    for (let i = 1; i<= length; i++) {
      let char = Math.floor(Math.random() * str.length);
      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [length, numberAllowed, charAllowed, setPassword]);

  //copyPassword to clipboard
  const copyPasswordToClipboard = useCallback(()=>{
    passwordRef.current?.select()
    // passwordRef.current?.setSelectionRange(0,9)
    window.navigator.clipboard.writeText(password)
  },[password])

  useEffect(()=>{
    passwordGeberator()
  },[length,numberAllowed,charAllowed,passwordGeberator])
  
  return (
    <div className="bg-gray-900 w-full h-screen p-10">
      <div className="w-full  bg-gray-700 max-w-md mx-auto shadow-md rounded-lg px-4 my-8 py-3 text-orange-50">
        <h1 className="text-2xl text-center my-3">Password Generator</h1>
        <div className="flex shadow rounded-lg overflow-hidden mb-4 ">
          <input
            type="text"
            value={password}
            className="outline-none w-full py-1 px-3 text-lg text-orange-800"
            placeholder="Password"
            readOnly ref={passwordRef}
          />
          <button className="bg-green-600 outline-none px-3 py-0.5 shrink-0 active:bg-green-700" onClick={copyPasswordToClipboard}>
            Copy
          </button>
        </div>
        <div className="flex text-sm gap-x-2">
          <div className="flex items-center gap-x-1">
            <input
              type="range"
              min={8}
              max={20}
              value={length}
              onChange={(e) => setLenght(e.target.value)}
              className="cursor-pointer"
            />
            <label className="text-orange-500">Length: {length}</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={numberAllowed}
              id="numberInput"
              onChange={() => setNumberAllowed((prev) => !prev)}
              className="cursor-pointer"
            />
            <label className="text-orange-500">Numbers: {numberAllowed}</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={charAllowed}
              id="characterInput"
              onChange={() => setCharAllowed((prev) => !prev)}
              className="cursor-pointer"
            />
            <label className="text-orange-500">Characters: {charAllowed}</label>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
