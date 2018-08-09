import React from 'react'
import { Route, Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import './App.css'
import BooksList from './BooksList'
import Books from './Books'

class BooksApp extends React.Component {

  state = {

    books: [],
    query: '',
    showingBooks: []

  }

  load = () => {

    BooksAPI.getAll().then((books) => {

      this.setState({ books })

    })
  }

  componentDidMount() {

    this.load()

  }

  updateQuery = (query) => {

    this.setState({ query })

    if (query) {

      BooksAPI.search(query).then((showingBooks) => {

        if (!showingBooks.error) {

            showingBooks.map(book => (this.state.books.filter((b) => b.id === book.id).map(b => book.shelf = b.shelf)))
            this.setState({ showingBooks })

        } else {

          this.setState({ showingBooks: [] })

        }
      })
    } else {

      this.setState({ showingBooks: [] })

    }
  }

  updateBook = (book, shelf) => {

    BooksAPI.update(book, shelf)

    this.load()

  }

  render() {

    const { books, query, showingBooks } = this.state

    return (

      <div className="app">
        <Route exact path="/search" render={() => (

          <div className="search-books">
            <div className="search-books-bar">
              <Link className="close-search" to="/">Close</Link>
              <div className="search-books-input-wrapper">
                <input type="text" placeholder="Search by title or author" value={ query } onChange={(event) => (this.updateQuery(event.target.value))} />
              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid">
                {showingBooks.map((book) => (
                  <Books key={ book.id } book={ book } onUpdateBook={this.updateBook} />
                ))}
              </ol>
            </div>
          </div>
        )}/>

        <Route exact path="/" render={() => (

          <div className="list-books">

            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <BooksList booksOnShelf={ books } onUpdateBook={this.updateBook} />
            <div className="open-search">
              <Link to="/search">Add a book</Link>
            </div>

          </div>

        )}/>
      </div>
    )
  }
}

export default BooksApp
