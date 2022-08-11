import puppeteer from "puppeteer";
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  name: string;
};

const handler = async (req: NextApiRequest, res: NextApiResponse<any>) => {
  try {
    const id = req.query.id;
    const url = `https://vnexpress.net/${id}.html`;
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: "networkidle2", timeout: 0 });
    const grabParagraph = await page.evaluate(() => {
      const title = document.querySelector("h1.title-detail");
      const description = document.querySelector("p.description");
      document.querySelectorAll("img").forEach((item) => {
        item.src = item.dataset.src || "";
      });
      const html = document.querySelector("article.fck_detail");

      return {
        title: title?.textContent,
        description: description?.textContent,
        html: html?.innerHTML,
      };
    });
    await browser.close();
    res.status(200).json({ success: true, data: grabParagraph });
  } catch (err) {
    res.status(500).json({ success: false, message: "Internal server" });
  }
};

export default handler;
