'use server'

import postgres from 'postgres'
import { Inputs } from '../page'
import { InputsSignup } from '../signup/page'

export async function login(data: Inputs) {
  const res = await fetch('http://fakestoreapi.com/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
  const json = await res.json()
  if (json.token) {
    return json.token
  }
}

export async function signup(data: InputsSignup) {
  const res = await fetch('http://localhost:4500/user', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
  const json = await res.json()
  return json
}

export async function signupWithPostGress(data: InputsSignup) {
  const sql = postgres(process.env.POSTGRES_URL!, {
    ssl: 'allow',
  })

  try {
    await sql`
    INSERT INTO users (name , email , password , username)
    VALUES (${data.name} , ${data.email} , ${data.password} , ${data.username})
    `
    return 'Usuário inserido com sucesso'
  } catch (e) {
    console.log(e)
    return 'Probloemas ao inserir o usuário'
  }
}
