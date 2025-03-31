import PurchasedBooks from '../components/PurchasedBooks'

export default function PurchasedPage() {
  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Your Purchased Books</h1>
      <PurchasedBooks />
    </main>
  )
}

