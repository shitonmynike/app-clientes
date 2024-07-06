import NavBar from '../components/ui/NavBar'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <section className="relative bg-zinc-200 h-sreen">
      <NavBar />
      {children}
    </section>
  )
}
