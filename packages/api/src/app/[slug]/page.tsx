import Redirect from "./redirect";

import type { Metadata } from "next";

interface VideoData {
  title: string;
  channelTitle: string;
  thumbnail: string;
  description: string;
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

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  try {
    // paramsをawait
    const { slug } = await params;
    // slugをデコードしてYouTube URLを取得
    const youtubeMusicUrl = decodeURIComponent(slug);
    const videoId = extractVideoId(youtubeMusicUrl);

    if (!videoId) {
      return {
        title: "Invalid YouTube Music URL",
        description: "The provided URL is not a valid YouTube Music URL.",
      };
    }

    const videoData = await fetchVideoData(videoId);
    const baseUrl = process.env.BASE_URL || "http://localhost:3000";
    const ogImageUrl = `${baseUrl}/api/nowplaying?url=${encodeURIComponent(youtubeMusicUrl)}`;

    return {
      title: `${videoData.title} - ${videoData.channelTitle}`,
      description: `Now Playing: ${videoData.title} by ${videoData.channelTitle}`,
      openGraph: {
        title: `${videoData.title} - ${videoData.channelTitle}`,
        description: `Now Playing: ${videoData.title} by ${videoData.channelTitle}`,
        images: [
          {
            url: ogImageUrl,
            width: 1200,
            height: 630,
            alt: `${videoData.title} by ${videoData.channelTitle}`,
          },
        ],
        type: "website",
      },
      twitter: {
        card: "summary_large_image",
        title: `${videoData.title} - ${videoData.channelTitle}`,
        description: `Now Playing: ${videoData.title} by ${videoData.channelTitle}`,
        images: [ogImageUrl],
      },
    };
  } catch (error) {
    console.error("Error generating metadata:", error);
    return {
      title: "Error loading song",
      description: "Failed to load the YouTube Music track.",
    };
  }
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  // paramsをawait
  const { slug } = await params;
  // slugをデコードしてYouTube URLを取得
  const youtubeMusicUrl = decodeURIComponent(slug);

  // クライアントサイドでYouTube Music URLにリダイレクト
  return <Redirect url={youtubeMusicUrl} />;
}
