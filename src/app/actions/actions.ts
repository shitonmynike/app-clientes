'use server'

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
