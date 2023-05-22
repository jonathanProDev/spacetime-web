import { api } from '@/lib/api'
import { Emptymemories } from './components/Emptymemories'
import { cookies } from 'next/headers'
import ptBr from 'dayjs/locale/pt-br'
import dayjs from 'dayjs'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

dayjs.locale(ptBr)
interface Memory {
  coverUrl: string
  excerpt: string
  id: string
  createdAt: string
}
export default async function Home() {
  const isAuthenticated = cookies().has('token')

  if (!isAuthenticated) {
    return <Emptymemories />
  }

  const token = cookies().get('token')?.value
  const response = await api.get('/memories', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  const memories: Memory[] = response.data

  if (memories.length === 0) {
    return <Emptymemories />
  }

  return (
    <div className="flex flex-col gap-10 p-8">
      {memories.map((memory) => {
        return (
          <div key={memory.id} className="space-y-4">
            <time className="-ml-8  flex items-center gap-2 text-sm text-gray-100 before:h-px before:w-5 before:bg-gray-100">
              {dayjs(memory.createdAt).format('D[ de ]MMMM[, ]YYYY')}
            </time>
            <Image
              src={memory.coverUrl}
              alt=""
              width={592}
              height={280}
              className="aspect-video w-full rounded-lg object-cover"
            />
            <p className="text-lg leading-relaxed text-gray-100">
              {memory.excerpt}
            </p>

            <Link
              href={`/memories/${memory.id}`}
              className="flex items-start gap-2 text-sm text-gray-100"
            >
              Ler mais
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        )
      })}
    </div>
  )
}
