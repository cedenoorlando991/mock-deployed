import "../styles/main.css";
import { Dispatch, ReactElement, SetStateAction, useState } from "react";
import { ControlledInput } from "./ControlledInput";
import { mockingCSVData } from "../mocking/mockingCSVData";


interface REPLInputProps {
  // TODO: Fill this with desired props... Maybe something to keep track of the submitted commands
  // CHANGED
  history: ReactElement[];
  setHistory: Dispatch<SetStateAction<ReactElement[]>>;

 // csvData: string[][];
  //setCSVData: Dispatch<SetStateAction<string[][]>>;
}

let path = "";
// You can use a custom interface or explicit fields or both! An alternative to the current function header might be:
// REPLInput(history: string[], setHistory: Dispatch<SetStateAction<string[]>>)
export function REPLInput(props: REPLInputProps) {
  // Remember: let React manage state in your webapp.
  // Manages the contents of the input box
  const [message,setMessage] = useState<string>("Enter a command:")
  const [commandString, setCommandString] = useState<string>("");
  const [mode,setMode] = useState<string>("brief");
  // Manages the current amount of times the button is clicked
  const [count, setCount] = useState<number>(0);
  const [filepath, setFilepath] = useState<string>("");
  //const [csvData, setCSVData] = useState<string[][]>();

  const json = new mockingCSVData();
function showCSVData(data: string[][]) {
  if (!data || data.length === 0) {
    return <p>No data to display.</p>;
  }
    return (
      <table style={{ margin: "auto" }}>
        <thead>
          <tr>
            {data[0].map((header) => (
              <th key={header}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.slice(1).map((row, index) => (
            <tr key={index}>
              {row.map((cell, cellIndex) => (
                <td key={cellIndex}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    );
  } 
  


  // This function is triggered when the button is clicked.
  function handleSubmit(commandString: string) {
    if (commandString.includes('mode')){
        const words = commandString.split(" ");
        if (words.length > 1 && (words[1] === "brief" || words[1] === "verbose")) {
          setMessage("Mode set to: " + words[1] + "!");
          setMode(words[1]);
        } else {
          setMessage("Invalid mode. Please enter 'brief' or 'verbose'.");
        }
        return;
    }
    props.setHistory([...props.history, <h4>{commandString}</h4>]);
    if (commandString.includes("load_file")) {
      setCommandString("load_file");
      path = commandString.slice(10);
      setFilepath(path); //might have to check if filepath was correct before setting message
      setMessage("Data Loaded Successfully!");
      if (mode === 'verbose'){
          props.setHistory([
            ...props.history,
            <h4>Command: load_file</h4>,
            <p>Output: Data Loaded Successfully!</p>,
          ]);
      }
     
      console.log(path);
    }
    if (commandString.includes("view")) {
      if (path) {
        setCommandString("view");
        const data = json.mockedView(path);
        console.log(data);
        if (data) {
          setMessage("Data View Success!")
          const table = showCSVData(data);
          if (mode === 'verbose'){
           props.setHistory([
             ...props.history,
             <h4>Command: {commandString}</h4>,
             <div>Output: {table}</div>,
           ]);
          }else{
            props.setHistory([...props.history, table])
          }

        }
      }
    }
    setCommandString("");
  }
  /**
   * We suggest breaking down this component into smaller components, think about the individual pieces
   * of the REPL and how they connect to each other...
   */
  return (
    <div className="repl-input">
      {/* This is a comment within the JSX. Notice that it's a TypeScript comment wrapped in
            braces, so that React knows it should be interpreted as TypeScript */}
      {/* I opted to use this HTML tag; you don't need to. It structures multiple input fields
            into a single unit, which makes it easier for screenreaders to navigate. */}
      <fieldset>
        <legend>{message}</legend>
        <ControlledInput
          value={commandString}
          setValue={setCommandString}
          ariaLabel={"Command input"}
        />
      </fieldset>
      {/* TODO: Currently this button just counts up, can we make it push the contents of the input box to the history?*/}
      <button onClick={() => handleSubmit(commandString)}>
        Submitted {count} times
      </button>
    </div>
  );
}


