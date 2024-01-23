import { useCallback, useEffect, useRef, useState } from "react";

function App() {

  const [length,setLength] = useState(8);
  const [isNumberRequired,setIsNumberRequired] = useState(false);
  const [isCharacterRequired, setIsCharacterRequired] = useState(false);
  const [password, setPassword] = useState("");
  const [copy,setCopy] = useState(false);

  // useRef hook...
  const passwordRef = useRef(null);
  const copyButtonRef = useRef(null);



  const passwordGenerator = useCallback(() => {
    setCopy(false);
    copyButtonRef.current.style="backgroung-color:blue";
    let pass = "";
    let charString = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if(isNumberRequired) charString += "0123456789";
    if(isCharacterRequired) charString += "+=()*&^%$#@!~`{}[]?<>,./|_-";


    for(let i = 0; i<length; i++) {
      let randomCharIndex = Math.floor((Math.random() * charString.length) + 1);

      pass += charString.charAt(randomCharIndex);
    }

    setPassword(pass);

  }, [length,isNumberRequired,isCharacterRequired]);

  const copyPasswordToClipboard = useCallback(() => {
    setCopy(true);
    copyButtonRef.current.style="background-color:green;"
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password);
  },[password]);
  
  useEffect(passwordGenerator,[length,isNumberRequired,isCharacterRequired]);
  
  return(
    <>
      <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-2 py-3 my-8 bg-gray-800 text-orange-500">
        <h1 className="text-3xl mb-2 text-center text-white">Password Generator</h1>
        <div className="flex shadow rounded-lg overflow-hidden mb-4">
          <input type="text"
            value={password}
            className="outline-none w-full py-1 px-3"
            placeholder="Password"
            readOnly
            ref={passwordRef}
          />
          <button 
            onClick={copyPasswordToClipboard}
            ref={copyButtonRef}
            className='outline-none bg-blue-700 text-white px-3 py-1 shrink-0 text-center'>
              {!copy? "Copy" : "Copied"}
          </button>
        </div>

        <div className="flex text-sm gap-x-3">
          <div className="flex items-center gap-x-1">
            <input 
              type="range" 
              min={6}
              max={100}
              value={length}
              className="cursor-pointer"
              onChange={(e)=> {setLength(e.target.value)}}
            />
            <label>length: {length}</label>
          </div>

          <div className="flex items-center gap-x-0.5">
            <input type="checkbox" 
              value={isNumberRequired}
              className="cursor-pointer"
              onChange={() => {setIsNumberRequired((prev)=>!prev)}}
            />
            <label>include Number</label>
          </div>

          <div className="flex item-center gap-x-0.5">
            <input type="checkbox"
              value={isCharacterRequired}
              className="cursor-pointer"
              onChange={()=> {setIsCharacterRequired((prev)=>!prev)}}
            />
            <label> Character</label>
          </div>

        </div>

      </div>
    </>
  )
}

export default App;