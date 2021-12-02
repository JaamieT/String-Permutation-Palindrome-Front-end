import './App.css';
import { useEffect, useState } from 'react';
import TypeWriter from 'typewriter-effect';

function App() {
  const trueString = "True";
  const falseString = "False";
  const notSetString = "Not Set";
  const errorString = "Error";
  const [input, setInput] = useState("");
  const [resultState, setResultState] = useState(notSetString);
  const [typeWriterRender, setTypeWriterRender] = useState();
  const apiUrl = "https://7k0azfv6yb.execute-api.eu-west-2.amazonaws.com/staging";

  const options = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: input
  }

  async function SubmitText(){
    try{
      var response = await fetch(apiUrl, options);
      HandleResponse(await response.text());
    }
    catch(error){
      console.log(error);
      setResultState(errorString);
    }
    
  }

  function HandleResponse(result){
    if(result === trueString){
      setResultState(true);
    }
    else if(result === falseString){
      setResultState(false);
    }
    else{
      //If response isn't true or false, something probably
      //went wrong
      setResultState(result);

    }
  }

  return (
    <>
      <div className="App">
        <header className="App-header" 
        style={resultState === true ? {backgroundColor: "green"} 
          : resultState === false ? {backgroundColor: "red"}
          : {}}>
        <TypeWriter
        options={{
          autoStart: true,
          deleteSpeed: 30,
          delay: 35
        }}
          onInit={(typewriter) =>{
            typewriter.typeString('Does your string...')
            .pauseFor(1000)
            .deleteChars(14)
            .pauseFor(500)
            .typeString('a permutation of your string contain a palindrome?')
            .start();
        }}
      />
      <div id="form-container">
        <input type="text" placeholder="Your string..." value={input} onChange={x => setInput(x.target.value)}/>
        <button id="submit-button" onClick={SubmitText}>Submit</button>
      </div>
      <div>
        {resultState === true ? "YES"
         : resultState === false ? "NO"
         : resultState === notSetString  ? ""
         : "WHO KNOWS?"}
      </div>
        </header>
      </div>
    </>
  );
}

export default App;
