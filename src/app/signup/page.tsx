'use client'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { signup, signupWithPostGress } from '@/app/actions/actions'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Button, Input } from '@nextui-org/react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useRouter } from 'next/navigation'
import React from 'react'

const schema = z.object({
  username: z.string().min(5, { message: 'Usuário inválido' }),
  password: z.string().min(5, { message: 'Senha inválida' }),
  name: z.string().min(5, { message: 'Mínimo 5 caracteres' }),
  email: z.string().email({ message: 'Email inválido' }),
})

export type InputsSignup = z.infer<typeof schema>

export default function SignupPage() {
  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<InputsSignup>({
    resolver: zodResolver(schema),
  })

  /**
   * The function onSubmit handles form submission for signing up a user, displaying an error message if
   * the signup fails.
   * @param data - The `data` parameter in the `onSubmit` function is the input data submitted by the
   * user for signing up. It typically includes information such as the user's email, password, name, or
   * any other details required for the signup process. This data is then passed to the `signup` function
   */
  const onSubmit: SubmitHandler<InputsSignup> = async (data) => {
    try {
      setIsLoading(true)
      //      await signup(data)
      await signupWithPostGress(data)
      toast.success('Cadastro efetuado', {
        theme: 'colored',
        onClose: () => {
          router.push('/')
        },
      })
      setIsLoading(false)
    } catch (error) {
      setIsLoading(false)
      toast.error('Não foi possível cadastrar')
    }
  }

  return (
    <main className="flex h-screen w-screen items-center justify-center">
      <section className="w-[500px] rounded-1g bg-gray-300 p-10">
        <section className="mb-4">Página de Cadastro</section>
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
            isInvalid={!!errors.name}
            errorMessage={errors.name?.message}
            type="text"
            label="Nome"
            placeholder="Digite seu nome"
            {...register('name', { required: true })}
          />
          <Input
            isInvalid={!!errors.email}
            errorMessage={errors.email?.message}
            type="text"
            label="Email"
            placeholder="Digite seu email"
            {...register('email', { required: true })}
          />
          <Input
            isInvalid={!!errors.password}
            errorMessage={errors.password?.message}
            type="password"
            label="Senha"
            placeholder="Digite sua senha"
            {...register('password', { required: true })}
          />
          <Button isLoading={isLoading} type="submit" color="primary" fullWidth>
            {isLoading ? '' : 'Cadastrar'}
          </Button>
        </form>
        <Button
          type="button"
          color="primary"
          variant="light"
          fullWidth
          className="mt-4"
          onClick={() => router.push('/')}
        >
          Voltar para Login
        </Button>
      </section>
      <ToastContainer />
    </main>
  )
}
