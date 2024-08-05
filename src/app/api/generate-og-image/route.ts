import { NextApiRequest, NextApiResponse } from "next";
import puppeteer from "puppeteer";
import { CanvasRenderingContext2D, createCanvas, loadImage } from "canvas";
import { cors } from "../../../lib/cors";
import { NextResponse } from "next/server";

function wrapText(
  context: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  maxWidth: number,
  lineHeight: number
) {
  const words = text.split(" ");
  let line = "";
  let lines = [];

  for (const word of words) {
    const testLine = line + word + " ";
    const metrics = context.measureText(testLine);
    const testWidth = metrics.width;

    if (testWidth > maxWidth && line) {
      lines.push(line);
      line = word + " ";
    } else {
      line = testLine;
    }
  }

  lines.push(line);
  for (let i = 0; i < lines.length; i++) {
    context.fillText(lines[i], x, y + i * lineHeight);
  }
}

export const POST = async (req: Request) => {
  
  let res = NextResponse.next();
  res.headers.set("Access-Control-Allow-Credentials", "true");
  res.headers.set("Access-Control-Allow-Origin", "*"); // Update this to your domain for production
  res.headers.set(
    "Access-Control-Allow-Methods",
    "GET,OPTIONS,PATCH,DELETE,POST,PUT"
  );
  res.headers.set(
    "Access-Control-Allow-Headers",
    "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
  );
  function limitWords(text: string, maxWords: number) {
    const words = text.split(" ");
    if (words.length > maxWords) {
      return words.slice(0, maxWords).join(" ") + "...";
    }
    return text;
  }

  try {
    const { title, content, image } = await req.json();

    const canvasWidth = 1200;
    const canvasHeight = 630;
    const canvas = createCanvas(canvasWidth, canvasHeight);
    const context = canvas.getContext("2d");

    // Gradient Background
    const gradient = context.createLinearGradient(
      0,
      0,
      canvasWidth,
      canvasHeight
    );
    gradient.addColorStop(0, "#fbc2eb"); // Pink
    gradient.addColorStop(1, "#a6c0fe"); // Blue
    context.fillStyle = gradient;
    context.fillRect(0, 0, canvasWidth, canvasHeight);

    // Padding and spacing
    const padding = 30;
    const titleWidth = 300;
    const imageWidth = canvasWidth - titleWidth - 2 * padding - 20; // Shift image to the right
    const imageHeight = canvasHeight - 150; // Space for text

    // Title
    const limitedTitle = limitWords(title || "Lorem ipsum dolor sit amet", 4);
    context.fillStyle = "#ffffff";
    context.font = "bold 50px 'Helvetica Neue', Arial";
    context.textAlign = "left";
    context.textBaseline = "top";
    context.shadowColor = "#000000";
    context.shadowBlur = 10;
    context.shadowOffsetX = 2;
    context.shadowOffsetY = 2;
    wrapText(context, limitedTitle, padding, padding, titleWidth, 60);

    // Image
    if (image) {
      try {
        const img = await loadImage(image);
        let imgWidth = img.width;
        let imgHeight = img.height;

        if (imgWidth > imageWidth) {
          imgHeight = (imgHeight / imgWidth) * imageWidth;
          imgWidth = imageWidth;
        }

        if (imgHeight > imageHeight) {
          imgWidth = (imgWidth / imgHeight) * imageHeight;
          imgHeight = imageHeight;
        }

        const imgX = canvasWidth - imageWidth - padding + 80; // Adjusted position
        const imgY = (canvasHeight - imgHeight) / 2; // Centered vertically
        context.drawImage(img, imgX, imgY, imgWidth, imgHeight);
      } catch (error) {
        console.log("Error loading image:", error);
      }
    }

    // Content
    const limitedContent = limitWords(
      content ||
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      30
    );
    context.font = "30px 'Helvetica Neue', Arial";
    context.shadowBlur = 0;
    context.textAlign = "center";
    const contentY = canvasHeight - 140; // Move content up
    wrapText(
      context,
      limitedContent,
      canvasWidth / 2,
      contentY,
      canvasWidth - 2 * padding,
      40
    );

    // Draw a border
    context.strokeStyle = "#000000";
    context.lineWidth = 5;
    context.strokeRect(0, 0, canvasWidth, canvasHeight);

    const buffer = canvas.toBuffer("image/png");
    const imageUrl = `data:image/png;base64,${buffer.toString("base64")}`;

    // Puppeteer setup
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setContent(
      `<img src="${imageUrl}" style="width: 100%; height: auto;" />`
    );
    const ogImageBuffer = await page.screenshot({ type: "png" });

    await browser.close();

    const ogImageUrl = `data:image/png;base64,${ogImageBuffer.toString(
      "base64"
    )}`;

    return Response.json(
      { ogImageUrl },
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error generating OG image:", error);
    return Response.json(
      { error: "Failed to generate OG image" },
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
};
