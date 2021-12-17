"use strict";


const getOutput = document.querySelector("#getOutput");

axios
//read
const getFilms = () => {
    axios
        .get("http://localhost:8080/getAll")
        .then(res => {
            console.log(res);
            const films = res.data;
            getOutput.innerHTML = ""; // blanks the output field
            for (let film of films) {
                const filmContainer = document.createElement("div");
                filmContainer.classList.add("col");

                const filmCard = document.createElement("div");
                filmCard.classList.add("card");

                const filmBody = document.createElement("div");
                filmBody.classList.add("card-body");
                    
                const filmTitle = document.createElement("p");
                filmTitle.classList.add("card-title");
                filmTitle.innerText = `Title: ${film.title}`;
                filmBody.appendChild(filmTitle);

                const filmYearOfRelease = document.createElement("p");
                filmYearOfRelease.classList.add("card-text");
                filmYearOfRelease.innerText = `Year of release: ${film.yearOfRelease}`;
                filmBody.appendChild(filmYearOfRelease);

                const lengthOfFilm = document.createElement("p");
                lengthOfFilm.classList.add("card-text");
                lengthOfFilm.innerText = `Length of Film: ${film.lengthOfFilm}`;
                filmBody.appendChild(lengthOfFilm);

                const filmRating = document.createElement("p");
                filmRating.classList.add("card-text");
                filmRating.innerText = `Rating: ${film.rating}/10`;
                filmBody.appendChild(filmRating);

                const editButton = document.createElement("button");
                editButton.classList.add("btn", "btn-primary", "editButton");
                editButton.innerText = "edit";
                editButton.addEventListener("click", function(event) {
                    document.querySelector("#submitButton").style.display = "none";
                    event.preventDefault(); // disables page refreshing
                    console.log("edit button");
                    document.getElementById("topfilmsListForm").title.value = film.title;
                    document.getElementById("topfilmsListForm").yearOfRelease.value = film.yearOfRelease;
                    document.getElementById("topfilmsListForm").rating.value = film.rating;
                    document.getElementById("topfilmsListForm").lengthOfFilm.value = film.lengthOfFilm;
                    const saveButton = document.createElement("button");
                    saveButton.classList.add("btn", "btn-warning", "saveButton");
                    saveButton.innerText = "Save";
                    document.getElementById("topfilmsListForm").appendChild(saveButton);
                    saveButton.type = "button";
                    saveButton.addEventListener("click", function(event) {
                        document.querySelector("#submitButton").style.display = "block";
                        saveButton.classList.add("d-none");
                        console.log("save button hit");
                        console.log("THIS:", this);
                    
                        const form = this.parentElement; 
                        console.log(form.title.value);
                    
                        const data = {
                            title: form.title.value,
                            yearOfRelease: form.yearOfRelease.value,
                            rating: form.rating.value,
                            lengthOfFilm: form.lengthOfFilm.value
                        };
                    
                        console.log("DATA: ", data);
                    
                        axios
                            .put(`http://localhost:8080/replace/${film.id}`, data)
                            .then(res => {
                                getFilms();
                                form.reset(); // resets the form
                                form.title.focus(); // puts the cursor in the name field
                                console.log(res);
                            })
                            .catch(err => console.error(err));
                })
            });

                filmBody.appendChild(editButton);

                const deleteButton = document.createElement("button");
                deleteButton.classList.add("btn", "btn-danger", "deleteButton");
                deleteButton.innerText = "delete";
                deleteButton.addEventListener("click", function(event) {
                    
                    axios
                        .delete(`http://localhost:8080/remove/${film.id}`)
                        .then(res => {
                            console.log(res);
                            getFilms();
                        })
                        .catch(err => console.error(err));
                });

                filmBody.appendChild(deleteButton);


                filmCard.appendChild(filmBody);
                filmContainer.appendChild(filmCard);
                getOutput.appendChild(filmContainer);
            }
        })
        .catch(err => console.error(err));
}
getFilms();

//update
// .put
// document.querySelector("editButton").addEventListener("click", function(event) {
//     event.preventDefault(); // disables page refreshing

//     console.log("THIS:", this);

//     const form = this; // purely to make it more obvious
//     console.log(form.title.value);

//     const data = {
//         title: form.title.value,
//         yearOfRelease: form.yearofrelease.value,
//         rating: form.rating.value,
//         lengthOfFilm: form.lengthoffilm.value
//     };

//     console.log("DATA: ", data);

//     axios
//         .post("http://localhost:8080/replace/${film.id}", data)
//         .then(res => {
//             getFilms();
//             form.reset(); // resets the form
//             form.title.focus(); // puts the cursor in the name field
//             console.log(res);
//         })
//         .catch(err => console.error(err));
// });

//delete



//create
// use anonymous functions not arrow functions for eventListeners
document.getElementById("topfilmsListForm").addEventListener("submit", function(event) {
    event.preventDefault(); // disables page refreshing

    console.log("THIS:", this);

    const form = this; // purely to make it more obvious
    console.log(form.title.value);

    const data = {
        title: form.title.value,
        yearOfRelease: form.yearOfRelease.value,
        rating: form.rating.value,
        lengthOfFilm: form.lengthOfFilm.value
    };

    console.log("DATA: ", data);

    axios
        .post("http://localhost:8080/create", data)
        .then(res => {
            getFilms();
            form.reset(); // resets the form
            form.title.focus(); // puts the cursor in the name field
            console.log(res);
        })
        .catch(err => console.error(err));
});

console.log("test");
