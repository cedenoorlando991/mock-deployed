import { test, expect } from "@playwright/test";
import exp from "constants";

test.beforeEach(async ({ page }) => {
  // Go to the starting url before each test
  await page.goto("http://localhost:8000");
});

test("should render REPLInput component initially", async ({ page }) => {
  const replInput = await page.$("#root > div > div > div.repl-input");
  expect(replInput).toBeTruthy();
});

test("history should update on input", async ({ page }) => {
  await page.fill(
    "#root > div > div > div.repl-input > fieldset > input",
    "load_file people.csv"
  );
  await page.click("#root > div > div > div.repl-input > button");
  const messageValue = await page.$eval(
    "#root > div > div > div.repl-input > fieldset > legend",
    (el) => (el as HTMLLegendElement).textContent
  );
  expect(messageValue).toBe("Data Loaded Successfully!");

  const historyList = await page.$eval(
    "#root > div > div > div.repl-history > div > p",
    (el) => (el as HTMLParagraphElement).textContent
  );
  expect(historyList).toBe("Data Loaded Successfully!");

  await page.fill(
    "#root > div > div > div.repl-input > fieldset > input",
    "view"
  );
  await page.click("#root > div > div > div.repl-input > button");
  const newHistoryList = await page.$eval(
    "#root > div > div > div.repl-history > div:nth-child(2) > table > tbody > tr:nth-child(1) > td:nth-child(1)",
    (el) => (el as HTMLTableCellElement).textContent
  );
  expect(newHistoryList).toBe("Abby");
});
