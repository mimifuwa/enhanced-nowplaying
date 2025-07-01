import { NextRequest } from "next/server";
import satori from "satori";
import React from "react";
import fs from "fs";
import path from "path";

interface VideoData {
  title: string;
  channelTitle: string;
  thumbnail: string;
  description: string;
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const url = decodeURIComponent(searchParams.get("url") || "");

  if (!url) {
    return new Response("URL parameter is required", { status: 400 });
  }

  try {
    const videoId = extractVideoId(url);
    if (!videoId) {
      return new Response("Invalid YouTube URL", { status: 400 });
    }

    const videoData = await fetchVideoData(videoId);
    console.log("Video Data:", videoData);

    // 画像がない場合はデフォルト画像を使用
    if (!videoData.thumbnail) {
      videoData.thumbnail =
        "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDMwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjMzMzIi8+Cjx0ZXh0IHg9IjE1MCIgeT0iMTUwIiBmaWxsPSIjNjY2IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjE4Ij5ObyBJbWFnZTwvdGV4dD4KPC9zdmc+";
    }

    // フォントを読み込み
    const fontPath = path.join(
      process.cwd(),
      "public/fonts/NotoSansJP-Regular.ttf"
    );
    const boldFontPath = path.join(
      process.cwd(),
      "public/fonts/NotoSansJP-Bold.ttf"
    );

    const fonts = [
      {
        name: "Noto Sans JP",
        data: fs.readFileSync(fontPath),
        weight: 400 as const,
        style: "normal" as const,
      },
      {
        name: "Noto Sans JP",
        data: fs.readFileSync(boldFontPath),
        weight: 700 as const,
        style: "normal" as const,
      },
    ];

    const svg = await satori(
      React.createElement(
        "div",
        {
          style: {
            display: "flex",
            width: "100%",
            height: "100%",
            alignItems: "center",
            justifyContent: "center",
          },
        },
        React.createElement("img", {
          src: videoData.thumbnail,
          style: {
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            height: "1200px",
            textAlign: "center",
            filter: "blur(10px)",
          },
        }),
        React.createElement("div", {
          style: {
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "100%",
            height: "100%",
            textAlign: "center",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          },
        }),
        React.createElement(
          "div",
          {
            style: {
              height: "100%",
              width: "100%",
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "flex-start",
              gap: "64px",
              fontFamily: "Noto Sans JP",
              padding: "0 75px",
              boxSizing: "border-box",
            },
          },

          React.createElement("img", {
            src: videoData.thumbnail,
            style: {
              width: "480px",
              height: "480px",
              borderRadius: "16px",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
              objectFit: "cover",
            },
          }),
          React.createElement(
            "div",
            {
              style: {
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                justifyContent: "center",
                color: "#ffffff",
                width: "506px",
                gap: "8px",
              },
            },
            React.createElement(
              "h1",
              {
                style: {
                  fontSize: "56px",
                  fontWeight: 700,
                  width: "100%",
                  display: "-webkit-box",
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  WebkitLineClamp: 2,
                },
              },
              videoData.title
            ),
            React.createElement(
              "p",
              {
                style: {
                  fontSize: "32px",
                  color: "#dddddd",
                  textAlign: "center",
                  marginTop: "0",
                  marginBottom: "32px",
                },
              },
              videoData.channelTitle
            ),
            React.createElement(
              "p",
              {
                style: {
                  fontSize: "24px",
                  color: "#555555",
                  textAlign: "center",
                  marginTop: "0",
                  marginBottom: "32px",
                  padding: "4px 8px",
                  borderRadius: "8px",
                  backgroundColor: "rgba(255, 255, 255, 0.8)",
                },
              },
              "#NowPlaying"
            ),
            React.createElement(
              "div",
              {
                style: {
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                  color: "#ffffff",
                },
              },
              React.createElement("img", {
                src: `${process.env.BASE_URL}/icons/yt.svg`,
                alt: "#NowPlaying",
                style: {
                  width: "56px",
                  height: "56px",
                },
              }),
              React.createElement(
                "p",
                {
                  style: {
                    fontSize: "20px",
                    textAlign: "center",
                    marginLeft: "10px",
                  },
                },
                "from YouTube Music"
              )
            )
          )
        )
      ),
      {
        width: 1200,
        height: 630,
        fonts,
      }
    );

    const png = await convertSvgToPng(svg);

    return new Response(png, {
      headers: {
        "Content-Type": "image/png",
        "Cache-Control": "public, max-age=3600",
      },
    });
  } catch (error) {
    console.error("Error generating image:", error);
    return new Response("Internal server error", { status: 500 });
  }
}

function extractVideoId(url: string): string | null {
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/|music\.youtube\.com\/watch\?v=)([^&\n?#]+)/,
  ];

  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) {
      return match[1];
    }
  }

  return null;
}

async function fetchVideoData(videoId: string): Promise<VideoData> {
  const apiKey = process.env.YOUTUBE_DATA_API_KEY;
  if (!apiKey) {
    throw new Error("YouTube Data API key is not configured");
  }

  const apiUrl = `https://www.googleapis.com/youtube/v3/videos?id=${videoId}&key=${apiKey}&part=snippet`;

  const response = await fetch(apiUrl);
  if (!response.ok) {
    throw new Error(`YouTube API request failed: ${response.status}`);
  }

  const data = await response.json();

  if (!data.items || data.items.length === 0) {
    throw new Error("Video not found");
  }

  const video = data.items[0];
  const snippet = video.snippet;

  return {
    title: snippet.title || "Unknown Title",
    channelTitle: snippet.channelTitle || "Unknown Artist",
    thumbnail:
      snippet.thumbnails?.maxres?.url ||
      snippet.thumbnails?.high?.url ||
      snippet.thumbnails?.medium?.url ||
      snippet.thumbnails?.default?.url ||
      "",
    description: snippet.description || "",
  };
}

async function convertSvgToPng(svg: string): Promise<Buffer> {
  const sharp = (await import("sharp")).default;

  try {
    const pngBuffer = await sharp(Buffer.from(svg)).png().toBuffer();

    return pngBuffer;
  } catch (error) {
    console.error("Error converting SVG to PNG:", error);
    throw error;
  }
}
