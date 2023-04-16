import React from "react";
import {useNavigate} from "react-router-dom"

const BookAdd = (props) => {

    const navigate = useNavigate();
    const [formData, updateFormData] = React.useState({
        name: "",
        category: 0,
        authorId: 0,
        availableCopies: 1,

    })

    const handleChange = (e) => {
        updateFormData({
            ...formData,
            [e.target.name]: e.target.value.trim()
        })
    }

    const onFormSubmit = (e) => {
        e.preventDefault();
        const name = formData.name;
        const category = formData.category;
        const authorId = formData.authorId;
        const availableCopies = formData.availableCopies;

        props.onAddBook(name,category,authorId,availableCopies);

        navigate("/books");

    }

    return(
        <div className={"row mt-5"}>
            <div className="col-md-5">
                <form onSubmit={onFormSubmit}>
                    <input id="id" type="hidden" name="id"/>
                    <div className="form-group">
                        <label htmlFor="name">Book name</label>
                        <input type="text"
                               className="form-control"
                               id="name"
                               name="name"
                               required
                               onChange={handleChange}
                               placeholder="Enter product name"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="availableCopies"></label>
                        <input type="text"
                               className="form-control"
                               id="availableCopies"
                               name="availableCopies"
                               onChange={handleChange}
                               placeholder="Available Copies"/>
                    </div>
                    <div className="form-group">
                        <label>Author</label>
                        <select name="authorId" className="form-control" onChange={handleChange}>
                            {props.authors.map((term) =>
                                <option value={term.id}>{term.name} {term.surname}</option>
                            )}
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Category</label>
                        <select name="category" className="form-control" onChange={handleChange}>
                            {props.categories.map((term) =>
                                <option value={term}>{term}</option>
                            )}
                        </select>
                    </div>

                    <button id="submit" type="submit" className="btn btn-primary">Submit</button>
                    <a type="button" className="btn btn-primary" href="/books">Back</a>
                </form>
            </div>
        </div>
    )
}

export default BookAdd;