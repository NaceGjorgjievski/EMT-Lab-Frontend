import './App.css';
import {Component} from "react";
import LibraryService from "../../repository/libraryRepository";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Books from "../Books/BookList/Books";
import BookAdd from "../Books/BookAdd/BookAdd";
import BookEdit from "../Books/BookEdit/BookEdit";
import Header from "../Header/header";
import Categories from "../Categories/Categories";
import Authors from "../Authors/Authors";

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            authors: [],
            countries: [],
            books: [],
            categories: [],
            selectedBook: {}
        }

    }

    render() {
        return (
            <Router>
                <Header/>
                <main>
                    <div className={"container"}>
                        <Routes>
                            <Route path={"/"} element={<Books books={this.state.books} onDelete={this.deleteBook} onEdit={this.getBook}/>}/>
                            <Route path={"/books"} element={<Books books={this.state.books} onDelete={this.deleteBook} onEdit={this.getBook} onLend={this.lendBook}/>} />
                            <Route path={"/books/add"} element={<BookAdd authors={this.state.authors} categories={this.state.categories} onAddBook={this.addBook}/>}/>
                            <Route path={"/books/edit/:id"} element={<BookEdit authors={this.state.authors} categories={this.state.categories} onEditProduct={this.editBook} book={this.state.selectedBook}/>}/>
                            <Route path={"/categories"} element={<Categories categories={this.state.categories}/>}/>
                            <Route path={"/authors"} element={<Authors authors={this.state.authors}/>}/>
                        </Routes>

                    </div>
                </main>
            </Router>
        );
    }

    loadCategories = () => {
        LibraryService.fetchCategories()
            .then((data) => {
                this.setState({
                    categories: data.data
                })
            })
    }

    loadAuthors = () => {
        LibraryService.fetchAuthors()
            .then((data) => {
                this.setState({
                    authors: data.data
                })
            })
    }

    loadCountries = () => {
        LibraryService.fetchCountries()
            .then((data) => {
                this.setState({
                    countries: data.data
                })
            })
    }

    loadBooks = () => {
        LibraryService.fetchBooks()
            .then((data) => {
                this.setState({
                    books: data.data
                })
            })
    }

    deleteBook = (id) => {
        LibraryService.deleteBook(id)
            .then(() => {
                this.loadBooks();
            })
    }

    addBook = (name,category,authorId,availableCopies) => {
        LibraryService.addBook(name,category,authorId,availableCopies)
            .then(() => {
                this.loadBooks();
            })
    }

    getBook = (id) => {
        LibraryService.getBook(id)
            .then((data) => {
                this.setState({
                    selectedBook: data.data
                })
            })
    }

    editBook = (id,name,category,authorId,availableCopies) => {
        LibraryService.editBook(id,name,category,authorId,availableCopies)
            .then(() => {this.loadBooks()})
    }

    lendBook = (id) =>{
        LibraryService.lendBook(id)
            .then(() => this.loadBooks());
    }

    componentDidMount() {
        this.loadCategories();
        this.loadAuthors();
        this.loadBooks();
        this.loadCountries();
    }
}

export default App;
