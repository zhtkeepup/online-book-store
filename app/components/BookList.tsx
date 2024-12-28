import BookCard from './BookCard'

const books = [
  { 
    id: 1, 
    title: 'The Great Gatsby', 
    author: 'F. Scott Fitzgerald', 
    price: 9.99, 
    image: 'https://m.media-amazon.com/images/I/71FTb9X6wsL._AC_UF1000,1000_QL80_.jpg' 
  },
  { 
    id: 2, 
    title: 'To Kill a Mockingbird', 
    author: 'Harper Lee', 
    price: 12.99, 
    image: 'https://m.media-amazon.com/images/I/71FxgtFKcQL._AC_UF1000,1000_QL80_.jpg' 
  },
  { 
    id: 3, 
    title: '1984', 
    author: 'George Orwell', 
    price: 10.99, 
    image: 'https://m.media-amazon.com/images/I/71kxa1-0mfL._AC_UF1000,1000_QL80_.jpg' 
  },
  { 
    id: 4, 
    title: 'Pride and Prejudice', 
    author: 'Jane Austen', 
    price: 8.99, 
    image: 'https://m.media-amazon.com/images/I/71Q1tPupKjL._AC_UF1000,1000_QL80_.jpg' 
  },
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

