'use client';

import { useRef, useEffect, useState } from 'react';

interface BespokeRendererProps {
  html: string;
}

const BASE_CSS = `
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body {
    background: #0F0F23;
    color: #e2e8f0;
    font-family: system-ui, -apple-system, sans-serif;
    margin: 1rem;
    line-height: 1.5;
    font-size: 14px;
  }
  button {
    background: rgba(139, 92, 246, 0.2);
    color: #e2e8f0;
    border: 1px solid rgba(139, 92, 246, 0.3);
    padding: 6px 14px;
    border-radius: 6px;
    cursor: pointer;
    font-size: 13px;
    transition: background 0.2s;
  }
  button:hover { background: rgba(139, 92, 246, 0.35); }
  input, textarea, select {
    background: rgba(255,255,255,0.05);
    color: #e2e8f0;
    border: 1px solid rgba(139, 92, 246, 0.2);
    padding: 6px 10px;
    border-radius: 6px;
    font-size: 13px;
    outline: none;
  }
  input:focus, textarea:focus { border-color: rgba(139, 92, 246, 0.5); }
  h1, h2, h3 { color: #f1f5f9; font-weight: 500; }
  a { color: #A78BFA; }
`;

export default function BespokeRenderer({ html }: BespokeRendererProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [height, setHeight] = useState(200);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (
        event.data?.type === 'void-bespoke-height' &&
        typeof event.data.height === 'number'
      ) {
        setHeight(Math.min(400, Math.max(100, event.data.height)));
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  const srcDoc = `<!DOCTYPE html>
<html>
<head>
  <style>${BASE_CSS}</style>
</head>
<body>
  ${html}
  <script>
    function reportHeight() {
      const h = document.body.scrollHeight;
      parent.postMessage({ type: 'void-bespoke-height', height: h }, '*');
    }
    new ResizeObserver(reportHeight).observe(document.body);
    setTimeout(reportHeight, 100);
  </script>
</body>
</html>`;

  return (
    <iframe
      ref={iframeRef}
      srcDoc={srcDoc}
      sandbox="allow-scripts"
      className="w-full rounded-lg border-0"
      style={{
        height: `${height}px`,
        maxHeight: '400px',
        background: '#0F0F23',
      }}
      title="Bespoke component"
    />
  );
}
