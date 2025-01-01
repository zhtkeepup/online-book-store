import BookCard from './BookCard'

const books = [
  { 
    id: 1, 
    title: '了不起的盖茨比', 
    author: 'F·斯科特·菲茨杰拉德', 
    price: 69.99, 
    image: 'https://m.media-amazon.com/images/I/71FTb9X6wsL._AC_UF1000,1000_QL80_.jpg' 
  },
  { 
    id: 2, 
    title: '杀死一只知更鸟', 
    author: '哈珀·李', 
    price: 89.99, 
    image: 'https://m.media-amazon.com/images/I/71FxgtFKcQL._AC_UF1000,1000_QL80_.jpg' 
  },
  { 
    id: 3, 
    title: '一九八四', 
    author: '乔治·奥威尔', 
    price: 79.99, 
    image: 'https://m.media-amazon.com/images/I/71kxa1-0mfL._AC_UF1000,1000_QL80_.jpg' 
  },
  { 
    id: 4, 
    title: '傲慢与偏见', 
    author: '简·奥斯汀', 
    price: 59.99, 
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

