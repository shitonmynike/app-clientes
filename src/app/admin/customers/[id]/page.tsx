type TCustomersDetailPageProps = {
  id: string
}

export default function CustomersDetailPage({
  params,
}: {
  params: TCustomersDetailPageProps
}) {
  return <main>Página de Cliente com ID:{params.id} </main>
}
