export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "Why This War",
              "url": "https://why-this-war.vercel.app",
              "description": "In-depth explainers on the historical causes, geopolitical factors, and root issues behind ongoing wars",
              "publisher": { "@type": "Organization", "name": "Why This War", "url": "https://why-this-war.vercel.app" }
            })
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  )
}
