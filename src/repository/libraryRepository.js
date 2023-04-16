import axios from "../custom-axios/axios"

const LibraryService = {
    fetchCategories: () => {
        return axios.get("/categories");
    },
    fetchCountries: () => {
        return axios.get("/countries");
    },
    fetchAuthors: () => {
        return axios.get("/authors");
    },
    fetchBooks: () => {
        return axios.get("/books");
    },
    deleteBook: (id) => {
        return axios.delete(`/books/delete/${id}`)
    },
    addBook: (name,category,authorId,availableCopies) => {
        return axios.post("/books/add",{
            "name" : name,
            "category" : category,
            "authorId" : authorId,
            "availableCopies" : availableCopies
        })
    },
    editBook: (id,name,category,authorId,availableCopies) => {
        return axios.put(`/books/edit/${id}`,{
            "name" : name,
            "category" : category,
            "authorId" : authorId,
            "availableCopies" : availableCopies
        })
    },
    getBook: (id) => {
        return axios.get(`/books/${id}`)
    },
    lendBook: (id) => {
        return axios.put(`/books/lend/${id}`)
    }



}

export default LibraryService;