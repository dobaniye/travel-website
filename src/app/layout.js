import './globals.css'

export const metadata = {
  title: 'Travel Rewards - Find Your Perfect Travel Card',
  description: 'Discover the best travel rewards cards and maximize your points.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}