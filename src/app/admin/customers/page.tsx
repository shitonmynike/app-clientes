'use client'
import React from 'react'
import { useRouter } from 'next/navigation'
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownSection,
  DropdownItem,
  Image,
  Button,
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
} from '@nextui-org/react'
import { Eye, Trash2 } from 'lucide-react'
import { getAllCustomers } from '@/useCases/customers/getAllCustomers'
import { ICustomer } from '@/interfaces/customer'

export default function CostumersPage() {
  const [listCustomers, setListCustomers] = React.useState<ICustomer[]>([])
  const router = useRouter()

  React.useEffect(() => {
    async function handleGetAllCustomers() {
      const response = await getAllCustomers()
      setListCustomers(response)
    }
    handleGetAllCustomers()
  }, [])
  return (
    <main>
      <section id="HEADER" className="flex justify-between p-6">
        <section className="text-2x1 font-semibold">Lista dos Clientes</section>
        <section>
          <Button
            color="primary"
            onClick={() => router.push('/admin/costumers/add')}
          >
            Cadastrar Cliente
          </Button>
        </section>
      </section>
      <section id="TABLE-CUSTOMERS" className="px-6">
        <Table aria-label="Tabel com dados de clientes">
          <TableHeader>
            <TableColumn>NOME</TableColumn>
            <TableColumn>FUNÇÃO</TableColumn>
            <TableColumn>STATUS</TableColumn>
            <TableColumn className="w-28">AÇÕES</TableColumn>
          </TableHeader>
          <TableBody
            emptyContent={
              <section className="flex w-full flex-col items-center">
                <Image width={300} alt="NextUI hero Image" src="/no-data.jpg" />
                <section>Nenhum Cliente Encontrado</section>
              </section>
            }
          >
            {listCustomers.map((customer, index) => (
              <TableRow key={index}>
                <TableCell>{customer.name}</TableCell>
                <TableCell>{customer.role}</TableCell>
                <TableCell>{customer.status}</TableCell>
                <TableCell className="flex gap-2">
                  <Button
                    isIconOnly
                    color="warning"
                    variant="faded"
                    aria-label="Visualizar Cliente"
                  >
                    <Eye />
                  </Button>
                  <Button
                    isIconOnly
                    color="danger"
                    variant="faded"
                    aria-label="Deletar Cliente"
                  >
                    <Trash2 />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </section>
    </main>
  )
}
