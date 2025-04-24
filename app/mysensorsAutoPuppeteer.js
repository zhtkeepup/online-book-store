

// import { JSDOM } from "jsdom";

// const { window } = new JSDOM('');

// import * as ss from "./mysensors";

// const dom = new JSDOM(`<!DOCTYPE html><p>Hello world</p> <ss.Sensors ></ss.Sensors> `);




import { launch } from 'puppeteer';

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

(async () => {
  const browser = await launch();
  const page = await browser.newPage();
  await page.goto('http://localhost:3000/');
  // await page.screenshot({path: 'example.png'});

  // await browser.close();

  await sleep(360*24*3600*1000);
})();