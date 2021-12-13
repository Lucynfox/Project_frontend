"use strict";

axios
//read
const getFilms = () => {
    axios
        .get("http://localhost:8081/films/getAll")
        .then(res => {
            console.log(res);
            const films = res.data;
            getOutput.innerHTML = ""; // blanks the output field
            for (let film of films) {
                const filmContainer = document.createElement("div");
                    
                const filmTitle = document.createElement("p");
                filmTitle.innerText = `Title: ${film.title}`;
                filmContainer.appendChild(filmTitle);

                const filmYearOfRelease = document.createElement("p");
                filmYearOfRelease.innerText = `Year of release: ${film.filmYearOfRelease}`;
                filmContainer.appendChild(filmYearOfRelease);

                const lengthOfFilm = document.createElement("p");
                lengthOfFilm.innerText = `Length of Film: ${film.lengthOfFilm}`;
                filmContainer.appendChild(lengthOfFilm);

                const filmImg = document.createElement("p");
                filmImg.innerText = `Img: ${film.filmImg}`;
                filmContainer.appendChild(filmImg);

                getOutput.appendChild(filmContainer);
            }
        })
        .catch(err => console.error(err));
}
//update
// .put


//delete
document.getElementById("deleteButton").addEventListener("click", function(event) {
    event.preventDefault();
    console.log("delete button pressed.")

    const form = this;

    const itemId = form.itemId.value;
    console.log(itemId);
    axios
        .delete(`http://localhost:8081/filmList/item/${itemId}`)
        .then(res => {
            console.log(res);
            form.reset();
            form.itemId.focus();
            getItems();
        })
        .catch(err => console.error(err));
});


//create
// use anonymous functions not arrow functions for eventListeners
document.getElementById("topfilmsListForm").addEventListener("submit", function(event) {
    event.preventDefault(); // disables page refreshing

    console.log("THIS:", this);

    const form = this; // purely to make it more obvious
    console.log(form.title.value);

    const data = {
        title: form.title.value,
        yearofrelease: form.yearofrelease.value,
        rating: form.rating.value,
        lengthoffilm: form.lengthoffilm.value
    };

    console.log("DATA: ", data);

    axios
        .post("http://localhost:8081/films/createFilm", data)
        .then(res => {
            getFilms();
            form.reset(); // resets the form
            form.title.focus(); // puts the cursor in the name field
            console.log(res);
        })
        .catch(err => console.error(err));
});