import { useEffect, useState } from "react";
import { fetchBooks } from "./api/api";
import BookItem from "./components/BookItem";
import { useGlobalContext } from "host/GlobalContext";

const App = () => {
  const { addToCart, setSelectedBook, searchText } = useGlobalContext();

  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const getBooksFromGoogleApi = async (query) => {
    try {
      setIsLoading(true);
      const data = await fetchBooks(query);
      setBooks(data);
    } catch (err) {
      setError("Failed to fetch books");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getBooksFromGoogleApi(searchText);

    return () => {};
  }, [searchText]);

  const showSingleBook = (id) => {
    console.log("selected book id", id);
    setSelectedBook(id);
  };

  const addSingleBookToCart = (book) => {
    const data = {
      title: book.volumeInfo.title,
      image: book.volumeInfo.imageLinks?.thumbnail,
      bookId: book.id,
      quantity: 1,
    };

    addToCart(data);
  };

  return (
    <div className="flex w-full overflow-hidden h-full items-center justify-center">
      {isLoading ? (
        <p className="text-center text-lg">Loading books...</p>
      ) : error ? (
        <p className="text-center text-lg text-red-500">{error}</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 p-4 w-4/5">
          {books.map((book) => (
            <BookItem
              key={book.id}
              book={book}
              onShowSingleBook={() => showSingleBook(book.id)}
              handleAddToCart={(book) => {
                addSingleBookToCart(book);
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default App;
