'use client'

import { Users, User, LogOut } from 'lucide-react'

export default function NavBar() {
  return (
    <section className="fixed bottom-10 left-0 right-0 mx-auto flex h-20 w-72 items-center justify-center gap-4 rounded-xl bg-white text-sm drop-shadow-2xl">
      <section className="flex flex-col gap-2">
        <Users />
        <section>Clientes</section>
      </section>
      <section className="flex flex-col gap-1">
        <User />
        <section>Meu Perfil</section>
      </section>
      <section className="flex flex-col gap-1">
        <LogOut />
        <section>Logout</section>
      </section>
    </section>
  )
}
