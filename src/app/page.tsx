'use client'
import { login } from '@/app/actions/actions'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Button, Input } from '@nextui-org/react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useRouter } from 'next/navigation'
import React from 'react'

const schema = z.object({
  username: z.string().min(8, { message: 'Usuário inválido' }),
  password: z.string().min(5, { message: 'Senha inválida' }),
})

export type Inputs = z.infer<typeof schema>

export default function LoginPage() {
  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<Inputs>({
    resolver: zodResolver(schema),
  })

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      setIsLoading(true)
      const response = await login(data)
      console.log(response)
      setIsLoading(false)
      router.push('/admin/customers')
    } catch (error) {
      console.log(error)
      setIsLoading(false)
      setError('username', { type: 'manual', message: 'Credenciais inválidas' })
      setError('password', { type: 'manual', message: 'Credenciais inválidas' })
      toast.error('Credenciais inválidas')
    }
  }

  return (
    <main className="flex h-screen w-screen items-center justify-center">
      <section className="w-[500px] rounded-1g bg-gray-300 p-10">
        <section className="mb-4">Página de login</section>
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
          <Button isLoading={isLoading} type="submit" color="primary" fullWidth>
            {isLoading ? '' : 'Login'}
          </Button>
        </form>
        <Button
          type="button"
          color="primary"
          variant="light"
          fullWidth
          className="mt-4"
          onClick={() => router.push('/signup')}
        >
          Não tem cadastro ainda, clique aqui
        </Button>
      </section>
      <ToastContainer />
    </main>
  )
}
