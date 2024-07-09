'use client'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Button } from '@nextui-org/react'
import { Users, User, LogOut } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function NavBar() {
  const router = useRouter()
  return (
    <section className="fixed bottom-10 left-0 right-0 mx-auto flex h-20 w-72 items-center justify-center gap-4 rounded-xl bg-white text-sm drop-shadow-2xl">
      <button
        className="flex flex-col gap-1 items-center"
        onClick={() => router.push('/admin/customers')}
      >
        <Users />
        <section>Clientes</section>
      </button>
      <button
        className="flex flex-col gap-1 items-center"
        onClick={() => router.push('/admin/my-profile')}
      >
        <User />
        <section>Meu Perfil</section>
      </button>
      <button className="flex flex-col gap-1 items-center">
        <LogOut />
        <section>Logout</section>
      </button>
    </section>
  )
}
