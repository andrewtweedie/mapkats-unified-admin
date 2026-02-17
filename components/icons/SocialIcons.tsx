
import React from 'react';

export const InstagramIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-full h-full" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" fill="url(#instagram-gradient)"></rect>
    <defs>
      <radialGradient id="instagram-gradient">
        <stop offset="0%" stopColor="#fdf497" />
        <stop offset="5%" stopColor="#fdf497" />
        <stop offset="30%" stopColor="#fd5949" />
        <stop offset="60%" stopColor="#d6249f" />
        <stop offset="90%" stopColor="#285AEB" />
      </radialGradient>
    </defs>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" stroke="white" strokeWidth="1.5"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" stroke="white" strokeWidth="1.5"></line>
  </svg>
);

export const YouTubeIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-full h-full" viewBox="0 0 24 24" fill="#FF0000">
    <path d="M21.582,6.186 C21.325,5.273 20.725,4.675 19.811,4.418 C18.253,4 12,4 12,4 C12,4 5.747,4 4.189,4.418 C3.275,4.675 2.675,5.273 2.418,6.186 C2,7.744 2,12 2,12 C2,12 2,16.256 2.418,17.814 C2.675,18.727 3.275,19.325 4.189,19.582 C5.747,20 12,20 12,20 C12,20 18.253,20 19.811,19.582 C20.725,19.325 21.325,18.727 21.582,17.814 C22,16.256 22,12 22,12 C22,12 22,7.744 21.582,6.186 Z M10,15.464 L10,8.536 L16,12 L10,15.464 Z" />
  </svg>
);

export const TikTokIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-full h-full" viewBox="0 0 24 24" fill="black">
        <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-2.43.03-4.83-1.1-6.42-3.02-1.5-1.8-2.2-4.14-2.18-6.42.02-2.54 1.1-4.94 3.02-6.48 1.94-1.56 4.41-2.26 6.74-2.18.02 1.51.02 3.02.01 4.53-.78-.36-1.6-.66-2.4-.79-1.2-.18-2.4-.16-3.58.07-.49.1-.96.26-1.4.45-.66.28-1.24.71-1.72 1.25-.45.52-.81 1.13-.99 1.78-.18.63-.26 1.3-.23 1.96.02.65.13 1.29.31 1.92.19.64.46 1.25.82 1.81.36.56.81 1.05 1.33 1.46.52.41 1.1.72 1.71.95.61.22 1.25.32 1.88.32.74 0 1.46-.14 2.13-.42.67-.28 1.27-.67 1.79-1.17.52-.5.93-1.09 1.23-1.74.29-.63.48-1.31.56-2.01.09-.75.08-1.51.02-2.26-.02-3.23.01-6.46.01-9.69z"/>
    </svg>
);
