import React from 'react'
import Books from './Books'

const BooksList = (props) => {

  return (

    <div className="list-books-content">
      <div>

        <div className="bookshelf">
          <h2 className="bookshelf-title">Currently Reading</h2>
          <div className="bookshelf-books">
            <ol className="books-grid">
              {props.booksOnShelf.filter(book => book.shelf === 'currentlyReading').map(book => (
                <Books key={book.id} book={book} onUpdateBook={props.onUpdateBook} />
              ))}
            </ol>
          </div>
        </div>

        <div className="bookshelf">
          <h2 className="bookshelf-title">Want To Read</h2>
          <div className="bookshelf-books">
            <ol className="books-grid">
              {props.booksOnShelf.filter(book => book.shelf === 'wantToRead').map(book => (
                <Books key={book.id} book={book} onUpdateBook={props.onUpdateBook} />
              ))}
            </ol>
          </div>
        </div>

        <div className="bookshelf">
          <h2 className="bookshelf-title">Read</h2>
          <div className="bookshelf-books">
            <ol className="books-grid">
              {props.booksOnShelf.filter(book => book.shelf === 'read').map(book => (
                <Books key={book.id} book={book} onUpdateBook={props.onUpdateBook} />
              ))}
            </ol>
          </div>
        </div>

      </div>
    </div>

  )
}

export default BooksList
