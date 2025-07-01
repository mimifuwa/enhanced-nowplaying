import React from "react";

const EnhancedNowPlayingButton: React.FC = () => {
  const handleClick = () => {
    const playerTitleLink = document.querySelector(
      'a[data-sessionlink*="feature=player-title"]'
    ) as HTMLAnchorElement;
    if (playerTitleLink?.href) {
      const urlParams = new URLSearchParams(playerTitleLink.href.split("?")[1]);
      const videoId = urlParams.get("v");
      if (videoId) {
        // vパラメータのみを使用し、余計なパラメータは除外
        const cleanVideoId = videoId.split("&")[0];
        const urlToShare = `https://music.youtube.com/watch?v=${cleanVideoId}`;
        const shareUrl = `https://nowplaying.mimifuwa.cc/${encodeURIComponent(urlToShare)}`;
        const shareText = `#NowPlaying ${shareUrl}`;

        window.open(`https://x.com/intent/tweet?text=${encodeURIComponent(shareText)}`, "_blank");
      }
    }
  };

  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        padding: "16px",
        boxSizing: "border-box",
      }}
    >
      <button
        onClick={handleClick}
        style={{
          display: "flex",
          alignItems: "center",
          padding: "12px 20px",
          width: "100%",
          cursor: "pointer",
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          border: "none",
          borderRadius: "16px",
          boxShadow: "0 4px 16px rgba(102, 126, 234, 0.3)",
          transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
          position: "relative",
          overflow: "hidden",
          boxSizing: "border-box",
          textDecoration: "none",
        }}
      >
        <div
          style={{
            width: "28px",
            height: "28px",
            marginRight: "12px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "rgba(255, 255, 255, 0.2)",
            borderRadius: "8px",
            backdropFilter: "blur(10px)",
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="20"
            viewBox="0 0 24 24"
            width="20"
            focusable="false"
            aria-hidden="true"
            style={{
              fill: "#fff",
              display: "block",
            }}
          >
            <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92s2.92-1.31 2.92-2.92-1.31-2.92-2.92-2.92z" />
          </svg>
        </div>
        <div style={{ flex: 1 }}>
          <span
            style={{
              fontSize: "15px",
              fontWeight: "600",
              lineHeight: "20px",
              color: "#fff",
              fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
              letterSpacing: "0.3px",
            }}
          >
            Now Playing
          </span>
        </div>
        <div
          style={{
            marginLeft: "12px",
            opacity: 0.7,
            transition: "opacity 0.3s ease",
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="16"
            viewBox="0 0 24 24"
            width="16"
            style={{
              fill: "#fff",
            }}
          >
            <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
          </svg>
        </div>
      </button>
    </div>
  );
};

export default EnhancedNowPlayingButton;
