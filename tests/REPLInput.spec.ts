import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  // Go to the starting url before each test
  await page.goto("http://localhost:8000");
});

test("should render REPLInput component initially", async ({ page }) => {
  const replInput = await page.$(".repl-input");
  expect(replInput).toBeTruthy();
});

test("should update on input", async ({ page }) => {
  await page.fill("#root > div > div > div.repl-input > fieldset > input", "load_file test.csv");
  await page.click("#root > div > div > div.repl-input > button");
  const inputValue = await page.$eval("#root > div > div > div.repl-history > p > h4t",(el) => (el as HTMLInputElement).value
  );
  expect(inputValue).toBe("load_file test.csv");
});

test("should update history on submit", async ({ page }) => {
  await page.fill(".repl-input input", "load_file test.csv");
  await page.click(".repl-input button");
  const historyItem = await page.$eval(
    ".repl-input .history h4",
    (el) => el.textContent
  );
  expect(historyItem).toBe("load_file test.csv");
});

test("should search history on submit", async ({ page }) => {
  await page.fill(".repl-input input", "load_file test.csv");
  await page.click(".repl-input button");
  await page.fill(".repl-input input", "search");
  await page.click(".repl-input button");
  const historyItem = await page.$eval(
    ".repl-input .history h4",
    (el) => el.textContent
  );
  expect(historyItem).toBe("search");
});