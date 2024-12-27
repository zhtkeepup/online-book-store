import BookCard from './BookCard'

const books = [
  { id: 1, title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', price: 9.99 },
  { id: 2, title: 'To Kill a Mockingbird', author: 'Harper Lee', price: 12.99 },
  { id: 3, title: '1984', author: 'George Orwell', price: 10.99 },
  { id: 4, title: 'Pride and Prejudice', author: 'Jane Austen', price: 8.99 },
]

export default function BookList() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {books.map((book) => (
        <BookCard key={book.id} book={book} />
      ))}
    </div>
  )
}

