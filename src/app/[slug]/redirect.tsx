'use client';

import { useEffect } from 'react';

interface RedirectProps {
  url: string;
}

export default function Redirect({ url }: RedirectProps) {
  useEffect(() => {
    // ページが読み込まれたらYouTube Music URLにリダイレクト
    window.location.href = url;
  }, [url]);

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
      fontFamily: 'system-ui, sans-serif',
      backgroundColor: '#1a1a1a',
      color: 'white'
    }}>
      <div style={{ marginBottom: '20px' }}>
        <div style={{
          width: '40px',
          height: '40px',
          border: '4px solid #333',
          borderTop: '4px solid #fff',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite'
        }} />
      </div>
      <p>Redirecting to YouTube Music...</p>
      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}