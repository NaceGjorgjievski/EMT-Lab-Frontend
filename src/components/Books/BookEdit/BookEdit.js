import React from "react";
import {useNavigate} from "react-router-dom";

const BookEdit = (props) => {

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
        const name = formData.name !== "" ? formData.name : props.book.name;
        const category = formData.category !== 0 ? formData.category : props.book.category;
        const authorId = formData.authorId !== 0 ? formData.authorId : props.book.author.id;
        const availableCopies = formData.availableCopies !== 0 ? formData.availableCopies : props.book.availableCopies;

        props.onEditProduct(props.book.id,name,category,authorId,availableCopies);

        navigate("/books");

    }

    return(
        <div className={"row mt-5"}>
            <div className="col-md-5">
                <form onSubmit={onFormSubmit}>
                    <input id="id" type="hidden" name="id"/>
                    <div className="form-group">
                        <label htmlFor="name">Book Name</label>
                        <input type="text"
                               className="form-control"
                               id="name"
                               name="name"
                               required
                               onChange={handleChange}
                               placeholder={props.book.name}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="availableCopies">Available Copies</label>
                        <input type="text"
                               className="form-control"
                               id="availableCopies"
                               name="availableCopies"
                               onChange={handleChange}
                               placeholder={props.book.availableCopies}/>
                    </div>
                    <div className="form-group">
                        <label>Category</label>
                        <select name="category" className="form-control" onChange={handleChange}>
                            {props.categories.map((term) =>{
                                    if(props.book.category !== undefined && props.book.category === term)
                                        return <option value={term} selected={props.book.category}>{term}</option>
                                    else
                                        return <option value={term}>{term}</option>
                                }
                            )}
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Author</label>
                        <select name="authorId" className="form-control" onChange={handleChange}>
                            {props.authors.map((term) =>{
                                if(props.book.author != undefined && props.book.author.id === term.id)
                                    return <option value={term.id} selected={props.book.author.id}>{term.name} {term.surname}</option>
                                    else
                                        return <option value={term.id}>{term.name} {term.surname}</option>
                                }
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

export default BookEdit;