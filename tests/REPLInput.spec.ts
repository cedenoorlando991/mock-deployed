// Importing necessary modules
import { test, expect } from "@playwright/test";

// Setting up the test environment before each test
test.beforeEach(async ({ page }) => {
  // Go to the starting url before each test
  await page.goto("http://localhost:8000");
});

/*Test to check if REPLInput component is rendered initially*/
test("should render REPLInput component initially", async ({ page }) => {
  const replInput = await page.$("#root > div > div > div.repl-input");
  expect(replInput).toBeTruthy();
});


/*Test to check if history updates on input*/
test("history should update on input", async ({ page }) => {
  // load the file
  await page.fill(
    "#root > div > div > div.repl-input > fieldset > input",
    "load_file people.csv"
  );
  await page.click("#root > div > div > div.repl-input > button");
  // Check if the message is updated correctly
  const messageValue = await page.$eval( 
    "#root > div > div > div.repl-input > fieldset > legend",
    (el) => (el as HTMLLegendElement).textContent
  );
  expect(messageValue).toBe("Data Loaded Successfully!");
  // Check if the history is updated correctly
  const historyList = await page.$eval(
    "#root > div > div > div.repl-history > div > h4",
    (el) => (el as HTMLHeadingElement).textContent
  );
  expect(historyList).toBe("load_file people.csv");
  //view the file
  await page.fill(
    "#root > div > div > div.repl-input > fieldset > input",
    "view"
  );
  await page.click("#root > div > div > div.repl-input > button");
  // Check if the history is updated correctly with the new command
  const newHistoryList = await page.$eval(
    "#root > div > div > div.repl-history > div:nth-child(2) > table > tbody > tr:nth-child(1) > td:nth-child(1)",
    (el) => (el as HTMLTableCellElement).textContent
  );
  expect(newHistoryList).toBe("Abby");
});


/* Test to check if mode updates correctly*/
test("mode should update correctly", async ({ page }) => {
  // Set mode to brief
  await page.fill(
    "#root > div > div > div.repl-input > fieldset > input",
    "mode brief"
  );
  await page.click("#root > div > div > div.repl-input > button");
  // Check if the mode message is updated correctly
  let modeMessage = await page.$eval( 
    "#root > div > div > div.repl-input > fieldset > legend",
    (el) => (el as HTMLLegendElement).textContent
  );
  expect(modeMessage).toBe("Mode set to: brief!");

  // Set mode to verbose
  await page.fill(
    "#root > div > div > div.repl-input > fieldset > input",
    "mode verbose"
  );
  await page.click("#root > div > div > div.repl-input > button");
  // Check if the mode message is updated correctly
  modeMessage = await page.$eval( 
    "#root > div > div > div.repl-input > fieldset > legend",
    (el) => (el as HTMLLegendElement).textContent
  );
  expect(modeMessage).toBe("Mode set to: verbose!");

  // Set mode to an invalid value
  await page.fill(
    "#root > div > div > div.repl-input > fieldset > input",
    "mode invalid"
  );
  await page.click("#root > div > div > div.repl-input > button");
  // Check if the mode message is updated correctly
  modeMessage = await page.$eval( 
    "#root > div > div > div.repl-input > fieldset > legend",
    (el) => (el as HTMLLegendElement).textContent
  );
  expect(modeMessage).toBe("Invalid mode. Please enter 'brief' or 'verbose'.");
});


/*test load two files consecutively*/
test("load two files consecutively", async ({ page }) => {
  // Load the first file
  await page.fill(
    "#root > div > div > div.repl-input > fieldset > input",
    "load_file people.csv"
  );
  await page.click("#root > div > div > div.repl-input > button");

  // Load the second file
  await page.fill(
    "#root > div > div > div.repl-input > fieldset > input",
    "load_file week_plan.csv"
  );
  await page.click("#root > div > div > div.repl-input > button");

  // Use the view command to check the second file
  await page.fill(
    "#root > div > div > div.repl-input > fieldset > input",
    "view"
  );
  await page.click("#root > div > div > div.repl-input > button");

  // Check if the data from the second file is displayed correctly
  const newHistoryList = await page.$eval(
    "#root > div > div > div.repl-history > div:nth-child(3) > table > tbody > tr:nth-child(1) > td:nth-child(1)",
    (el) => (el as HTMLTableCellElement).textContent
  );
  expect(newHistoryList).toBe("Monday");
});


/*test search a column name which doesn't exist in the csv file*/
test("search should return column not existed", async ({ page }) => {
  //load the file
  await page.fill(
    "#root > div > div > div.repl-input > fieldset > input",
    "load_file week_plan.csv");
  await page.click("#root > div > div > div.repl-input > button");

  //view the file
  await page.fill(
    "#root > div > div > div.repl-input > fieldset > input",
    "view"
  );
  await page.click("#root > div > div > div.repl-input > button");

  //search column not existed
  await page.fill(
    "#root > div > div > div.repl-input > fieldset > input",
    "search name Abby"
  );
  await page.click("#root > div > div > div.repl-input > button");

  const message = await page.$eval(
    "#root > div > div > div.repl-input > fieldset > legend",
    (el) => (el as HTMLLegendElement).textContent
  );
  expect(message).toBe("Column not found.");
});



/*Test searching an empty file*/
test("search should return empty result", async ({ page }) => {
  //search column not existed
  await page.fill(
    "#root > div > div > div.repl-input > fieldset > input",
    "load_file empty.csv"
  );
  await page.click("#root > div > div > div.repl-input > button");

  await page.fill(
    "#root > div > div > div.repl-input > fieldset > input",
    "search name Abby");

  await page.click("#root > div > div > div.repl-input > button");

  const message = await page.$eval(
    "#root > div > div > div.repl-input > fieldset > legend",
    (el) => (el as HTMLLegendElement).textContent
  );
  expect(message).toBe("Data Loaded Successfully!");
  //it can only load without search
});


/*Test load, view, search through csv file with one column*/
test("handle only one column ", async ({ page }) => {
  // Fill the input field with a command to load a file with only one column and click the button
  await page.fill(
    "#root > div > div > div.repl-input > fieldset > input",
    "load_file one_column.csv"
  );
  await page.click("#root > div > div > div.repl-input > button");

  // Use the view command to check the loaded file
  await page.fill(
    "#root > div > div > div.repl-input > fieldset > input",
    "view"
  );
  await page.click("#root > div > div > div.repl-input > button");

   await page.fill(
     "#root > div > div > div.repl-input > fieldset > input",
     "search 0 hello"
   );
   await page.click("#root > div > div > div.repl-input > button");

   const message = await page.$eval(
     "#root > div > div > div.repl-input > fieldset > legend",
     (el) => (el as HTMLLegendElement).textContent
   );
   expect(message).toBe("Search completed successfully!");

  const newHistoryList2 = await page.$eval(
    "#root > div > div > div.repl-history > div:last-child > table > tbody > tr:nth-child(1) > td:nth-child(1)",
    (el) => (el as HTMLTableCellElement).textContent
  );
  expect(newHistoryList2).toBe("hello");
});


/*Test search through 2 csv files*/
test("search multiple files", async ({ page }) => {
  //load the filem1
  await page.fill(
    "#root > div > div > div.repl-input > fieldset > input",
    "load_file week_plan.csv"
  );
  await page.click("#root > div > div > div.repl-input > button");

  //view the file1
  await page.fill(
    "#root > div > div > div.repl-input > fieldset > input",
    "view"
  );
  await page.click("#root > div > div > div.repl-input > button");

  //search column1
  await page.fill(
    "#root > div > div > div.repl-input > fieldset > input",
    "search Day Monday"
  );
  await page.click("#root > div > div > div.repl-input > button");

  const message = await page.$eval(
    "#root > div > div > div.repl-input > fieldset > legend",
    (el) => (el as HTMLLegendElement).textContent
  );
  expect(message).toBe("Search completed successfully!");

  const newHistoryList = await page.$eval(
    "#root > div > div > div.repl-history > div:nth-child(2) > table > tbody > tr:nth-child(1) > td:nth-child(1)",
    (el) => (el as HTMLTableCellElement).textContent
  );
  expect(newHistoryList).toBe("Monday");

  //load the file2
  await page.fill(
    "#root > div > div > div.repl-input > fieldset > input",
    "load_file people.csv"
  );
  await page.click("#root > div > div > div.repl-input > button");

  //view the file2
  await page.fill(
    "#root > div > div > div.repl-input > fieldset > input",
    "view"
  );
  await page.click("#root > div > div > div.repl-input > button");

  //search column2
  await page.fill(
    "#root > div > div > div.repl-input > fieldset > input",
    "search name Abby"
  );
  await page.click("#root > div > div > div.repl-input > button");

  const message2 = await page.$eval(
    "#root > div > div > div.repl-input > fieldset > legend",
    (el) => (el as HTMLLegendElement).textContent
  );
  expect(message2).toBe("Search completed successfully!");

  const newHistoryList2 = await page.$eval(
    "#root > div > div > div.repl-history > div:last-child > table > tbody > tr:nth-child(1) > td:nth-child(1)",
    (el) => (el as HTMLTableCellElement).textContent
  );
  expect(newHistoryList2).toBe("Abby");
});
