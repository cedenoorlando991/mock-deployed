# Mock-ocedeno-lweng1
## Project Detail：
### Project Name: 
- Mock
### Team members and contributions: 
- Orlando Cedeno: CSlogin: ocedeno
- Luyi Weng: CSlogin: lweng1
- Contributions: we split the task equally. Orlando did user story 1 and testing of load, view, and mode changing. Louise did user story 2,3,4 and testing of search
    -Estimated time: 12h
### Link to repo: 
- https://github.com/cs0320-f23/mock-ocedeno-lweng1.git
## Design choices
   Our REPLInput file handles all methods related to the command by front-end users. Within REPLInput, we created functions to handle different commands when the submit function is clicked. The user could load_file, view, and search for specific value for a given column name or column index. In additon to that, we also implement modes with "brief" and "verbose" for users to choose. REPLHistory class map and maintain the history of command input by users. The REPL class set the history for both REPLInput and REPLhistory. The App class create the highest level component for front-end user. 

   Specifically, we used the mockingCSVData class to mock the csv data for testing. Mocking data allows us to isolate the component or function being tested from external dependencies.Also, Mmocked data is consistent, which means every time a test is run, it uses the same data, leading to predictable results. If real data were used, any changes to that data could affect the test outcome.

## Errors/Bugs
N/A

## Tests
We contains several tests in our testing suite. 
- "Should render REPLInput component initially" is a test to check if REPLInput component is rendered initiall
- "History should update on input" is a test to check if history updates on input
- "Mode should update correctly" is a test to check if mode updates correctly
- "Load two files consecutively" is a test to check if the loaded content will be updated
- "Search should return column not existed" is a test to search a column name which doesn't exist in the csv file
- "Search should return empty result" is a test to test searching an empty file
- "Handle only one column" is a test to check the functionality of our commands if the csv file only has one column
- "Search multiple files" is a test to check if our search command can search through multiple files

## How to
- Run the test: type npx playwright test, it will give you all results of the testing suite. 
- Run the program: Type npm start into the terminal. It will give you a link. Click on that link. You will be directed to a page. To use our command, you can type in your commands in the input box. For changing modes, you type "mode" plus the mode you want to choose. For loading, you can type "load_file" plus your file. For view, you just need to type "view". For searching, type in "search" + column name/column index + value which you want to search. 