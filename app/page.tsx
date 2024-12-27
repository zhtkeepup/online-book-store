import BookList from './components/BookList'
import Cart from './components/Cart'

export default function Home() {
  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Welcome to Our Online Book Store</h1>
      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-3/4">
          <BookList />
        </div>
        <div className="md:w-1/4">
          <Cart />
        </div>
      </div>
    </main>
  )
}

