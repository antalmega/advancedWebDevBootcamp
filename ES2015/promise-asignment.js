// 1. Write a function called getMostFollowers, which accepts a variable number of arguments. You should then make an AJAX call to the Github User API (https://developer.github.com/v3/users/#get-a-single-user) to get the name and number of followers of each argument. The function should return a promise, which when resolved, returns a string which displays the username who has the most followers. 

// Hint - Try to use Promise.all to solve this and remember that the jQuery AJAX methods ($.getJSON, $.ajax, etc.) return a promise.

    /* getMostFollowers('elie','tigarcia','colt').then(function(data){
        console.log(data)
    });
     
    "Colt has the most followers with 424" */ 

function getMostFollowers(...usernames) {
    let baseUrl = "https://api.github.com/users/";
    let usersData = usernames.map(user => $.getJSON(baseUrl + user));
    return Promise.all(usersData).then(function(data){
        let max = data.sort((a,b) => b.followers - a.followers)[0];
        return `${max.name} has the most followers with ${max.followers}`;
    })
}


// 2. Write a function called starWarsString, which accepts a number. You should then make an AJAX call to the Star Wars API (https://swapi.co/ ) to search for a specific character by the number passed to the function. Your function should return a promise that when resolved will console.log the name of the character.

    /* starWarsString(1).then(function(data){
        console.log(data)
    }) */
     
//     "Luke Skywalker"

function starWarsString(num) {
    let url = `https://swapi.co/api/people/${num}`;
    return $.getJSON(url)
    .then(function(data) {
        return data.name;
    })
}

// Bonus 1 -  Using the data from the previous AJAX call above, make another AJAX request to get the first film that character is featured in and return a promise that when resolved will console.log the name of the character and the film they are featured in 

    /* starWarsString(1).then(function(data){
        console.log(data)
    }) */
     
//     "Luke Skywalker is featured in The Empire Strikes Back, directed by Irvin Kershner"

function starWarsString(num) {
    let url = `https://swapi.co/api/people/${num}`;
    let str = ''
    return $.getJSON(url)
    .then(function(data) {
        str += `${data.name} is featured in `;
        let filmData = data.films[0];
        return $.getJSON(filmData);
    }).then(function(data) {
        return str += `${data.title}, directed by ${data.director}`;
    })
}

// Bonus 2 -  Using the data from Bonus 1 - make another AJAX call to get the information about the first planet that the film contains. Your function should return a promise that when resolved will console.log the name of the character and the film they are featured in and the name of the planet. 

    /* starWarsString(1).then(function(data){
        console.log(data)
    }) */
     
//     "Luke Skywalker is featured in The Empire Strikes Back, directed by Irvin Kershner and it takes place on Hoth"

function starWarsString(num) {
    let url = `https://swapi.co/api/people/${num}`;
    let str = ''
    return $.getJSON(url)
    .then(function(data) {
        str += `${data.name} is featured in `;
        let filmData = data.films[0];
        return $.getJSON(filmData);
    }).then(function(film) {
        str += `${film.title}, directed by ${film.director}`;
        let planetData = film.planets[0];
        return $.getJSON(planetData);
    }).then(function(planet) {
        return str += ` and it takes place on ${planet.name}`
    })
}
