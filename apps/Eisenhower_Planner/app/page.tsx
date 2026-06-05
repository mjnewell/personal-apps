'use client';

import { useEffect } from 'react';

export default function Home() {
  useEffect(() => {
    // Dynamically load the HTML content
    fetch('/index.html')
      .then(res => res.text())
      .then(html => {
        document.documentElement.innerHTML = html;
      });
  }, []);

  return null;
}
