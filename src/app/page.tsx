'use client'
import { login } from '@/app/actions/actions'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Button, Input } from '@nextui-org/react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useRouter } from 'next/navigation'

const schema = z.object({
  username: z.string().min(8, { message: 'Usuário inválido' }),
  password: z.string().min(5, { message: 'Senha inválida' }),
})

export type Inputs = z.infer<typeof schema>

export default function LoginPage() {
  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(schema),
  })

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      const response = await login(data)
      console.log(response)
      router.push('/admin/customers')
    } catch (error) {
      console.log(error)
      toast.error('Credenciais inválidas')
    }
  }

  return (
    <main className="flex h-screen w-screen items-center justify-center">
      <section className="w-[500px] rounded-1g bg-gray-300 p-10">
        Página de login
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <Input
            isInvalid={!!errors.username}
            errorMessage={errors.username?.message}
            type="text"
            label="Usuário"
            placeholder="Digite seu usuário"
            {...register('username', { required: true })}
          />
          <Input
            isInvalid={!!errors.password}
            errorMessage={errors.password?.message}
            type="password"
            label="Senha"
            placeholder="Digite sua senha"
            {...register('password', { required: true })}
          />
          {/* <section className='font-bold'>
             {state: message} 
          </section> */}
          <Button type="submit" color="primary" fullWidth>
            Login
          </Button>
        </form>
      </section>
      <ToastContainer />
    </main>
  )
}
