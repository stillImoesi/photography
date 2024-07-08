import '../index.css'
import type { Metadata } from 'next'
 
export const metadata: Metadata = {
  title: 'StillPeter Photography',
  description: 'Photographer based in Vantaa',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div id="root">{children}</div>
      </body>
    </html>
  );
}
