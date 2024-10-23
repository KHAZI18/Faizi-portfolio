import "./globals.css";
import Head from 'next/head'

export const metadata = {
  title: "KHAZI18",
  description: "Mohammed Faizan Khazi - Full-stack developer specializing in webapp, and IoT solutions. Explore my projects, skills, and experience in React, Node.js, AI, and open-source development. Let's build something impactful together!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
    <Head>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />

      {/* Import Afacad Flux font */}
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Afacad+Flux:wght@100..1000&display=swap');
      </style>

      {/* <link rel="icon" type="image/png" href="./javascript.png" /> */}
      <link rel="icon" type="imgs/jpg" href="./imgs/coding.png"></link>
    </Head>
      <body>{children}</body>
    </html>
  );
}

