# Enhanced Now Playing

**English** | [日本語](#japanese)

A Next.js application that generates beautiful OG images for YouTube Music tracks and provides sharing functionality with metadata.

## Features

- 🎵 Generate custom OG images for YouTube Music tracks
- 🖼️ Beautiful visual layout with album artwork and track information
- 🔗 URL shortening and redirect functionality
- 📱 Social media optimized sharing (Twitter, Facebook, etc.)
- 🌐 API endpoint for generating images programmatically

## Tech Stack

- **Framework**: Next.js 15.3.4 with App Router
- **Runtime**: React 19
- **Styling**: Tailwind CSS 4
- **Image Generation**: Satori + Sharp
- **Font**: Noto Sans JP (Japanese support)
- **Package Manager**: pnpm

## Getting Started

### Prerequisites

- Node.js (recommended: latest LTS)
- pnpm
- YouTube Data API v3 key

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd enhanced-nowplaying
```

2. Install dependencies:
```bash
pnpm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

Add your environment variables:
```env
YOUTUBE_DATA_API_KEY=your_youtube_api_key
BASE_URL=http://localhost:3000
```

4. Run the development server:
```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Usage

### Generate OG Image

Make a GET request to the API endpoint:
```
/api/nowplaying?url=<youtube_music_url>
```

### Share with Metadata

Create a shareable URL:
```
/<encoded_youtube_music_url>
```

The app will:
1. Extract video information from YouTube
2. Generate custom OG metadata
3. Redirect to the original YouTube Music URL

## API Reference

### GET `/api/nowplaying`

Generates an OG image for a YouTube Music track.

**Parameters:**
- `url` (required): YouTube Music URL

**Response:**
- Content-Type: `image/png`
- Cache-Control: `public, max-age=3600`

## Scripts

- `pnpm dev` - Start development server with Turbopack
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is private and proprietary.

---

## Japanese

**[English](#enhanced-now-playing)** | 日本語

YouTube Musicの楽曲用に美しいOG画像を生成し、メタデータ付きの共有機能を提供するNext.jsアプリケーションです。

## 機能

- 🎵 YouTube Musicトラック用のカスタムOG画像生成
- 🖼️ アルバムアートワークとトラック情報を含む美しいビジュアルレイアウト
- 🔗 URL短縮とリダイレクト機能
- 📱 ソーシャルメディア最適化共有（Twitter、Facebookなど）
- 🌐 プログラム的に画像を生成するためのAPIエンドポイント

## 技術スタック

- **フレームワーク**: Next.js 15.3.4（App Router使用）
- **ランタイム**: React 19
- **スタイリング**: Tailwind CSS 4
- **画像生成**: Satori + Sharp
- **フォント**: Noto Sans JP（日本語サポート）
- **パッケージマネージャー**: pnpm

## はじめ方

### 前提条件

- Node.js（推奨：最新のLTS）
- pnpm
- YouTube Data API v3キー

### インストール

1. リポジトリをクローン:
```bash
git clone <repository-url>
cd enhanced-nowplaying
```

2. 依存関係をインストール:
```bash
pnpm install
```

3. 環境変数を設定:
```bash
cp .env.example .env.local
```

環境変数を追加:
```env
YOUTUBE_DATA_API_KEY=your_youtube_api_key
BASE_URL=http://localhost:3000
```

4. 開発サーバーを起動:
```bash
pnpm dev
```

ブラウザで [http://localhost:3000](http://localhost:3000) を開いてください。

## 使用方法

### OG画像を生成

APIエンドポイントにGETリクエストを送信:
```
/api/nowplaying?url=<youtube_music_url>
```

### メタデータ付きで共有

共有可能なURLを作成:
```
/<encoded_youtube_music_url>
```

アプリは以下を実行します:
1. YouTubeから動画情報を抽出
2. カスタムOGメタデータを生成
3. 元のYouTube Music URLにリダイレクト

## API リファレンス

### GET `/api/nowplaying`

YouTube Musicトラック用のOG画像を生成します。

**パラメータ:**
- `url`（必須）: YouTube Music URL

**レスポンス:**
- Content-Type: `image/png`
- Cache-Control: `public, max-age=3600`

## スクリプト

- `pnpm dev` - Turbopackを使用して開発サーバーを起動
- `pnpm build` - プロダクション用にビルド
- `pnpm start` - プロダクションサーバーを起動
- `pnpm lint` - ESLintを実行

## 貢献

1. リポジトリをフォーク
2. 機能ブランチを作成
3. 変更を加える
4. 十分にテスト
5. プルリクエストを送信

## ライセンス

このプロジェクトはプライベートで専有です。
