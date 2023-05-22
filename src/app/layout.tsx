import { ReactNode } from 'react'
import './globals.css'
import {
  Roboto_Flex as Roboto,
  Bai_Jamjuree as Baijamjuree,
} from 'next/font/google'
import { Copyrigth } from './components/Coprigth'
import { Hero } from './components/Hero'
import { Singin } from './components/Singin'
import { Profile } from './components/profile'
import { cookies } from 'next/headers'

const roboto = Roboto({ subsets: ['latin'], variable: '--font-roboto' })
const baijamjuree = Baijamjuree({
  subsets: ['latin'],
  weight: '700',
  variable: '--font-baijamjuree',
})

export const metadata = {
  title: 'NLW spacetime',
  description: 'Uma capsula do tempo contruida com react,next.js e etc...',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  const isAuthenticated = cookies().has('token')

  return (
    <html lang="en">
      <body
        className={`${roboto.variable} ${baijamjuree.variable} bg-gray-900 font-sans text-gray-100`}
      >
        <main className="grid min-h-screen grid-cols-2">
          <div className="relative flex flex-col items-start justify-between overflow-hidden border-r border-gray-600 bg-[url(../assets/bg-starts.svg)] bg-cover px-28 py-16">
            {/* bluer */}
            <div className="blur-3xl absolute right-0 top-1/2 h-[288px] w-[526px] -translate-y-1/2 translate-x-1/2 rounded-full bg-purple-700 opacity-50 blur-full" />
            {/* stripes */}
            <div className="absolute bottom-0 right-2 top-0 w-2 bg-stripes" />
            {/* sing in */}
            {isAuthenticated ? <Profile /> : <Singin />}
            {/* Hero */}
            <Hero />
            {/* Copyrigth */}
            <Copyrigth />
          </div>
          {/* secão da esquerda */}
          <div className="flex max-h-screen flex-col overflow-y-scroll bg-[url(../assets/bg-starts.svg)] bg-cover ">
            {children}
          </div>
        </main>
      </body>
    </html>
  )
}
