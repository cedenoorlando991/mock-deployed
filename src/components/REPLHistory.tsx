import { ReactElement } from 'react';
import '../styles/main.css';

/**
 * This is the interface for the history of REPL's props
 */
interface REPLHistoryProps{
    history: ReactElement[]
}

/**
 * This is the method to map the history with specific index
 */
export function REPLHistory(props : REPLHistoryProps) {
    return (
        <div className="repl-history">
            {/* This is where command history will go */}
            {/* Go through all the pushed commands and use the .map() function! */}
            {props.history.map((command, index) => <div>{command}</div>)}
        </div>
    );
}