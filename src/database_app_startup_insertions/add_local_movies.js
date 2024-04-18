const fs = require('fs');
const path = require('path');

const { addListOfMovies } = require('../services/movie_services');

const addLocalMoviesToDB = () => {
    // Parsing local movies json file into a js array object and insert it into the db
    fs.readFile(path.normalize('./src/database_app_startup_insertions/movies.json'), async (err, movies_json) => {
        if (err) {
            console.error('Error reading JSON file:', err);
            return;
        }

        try {
            const movies_list = await JSON.parse(movies_json);


            console.info("Movies List Parsed!")

            /* Adding missing pieces of information for each movie object
            namely: 
            release date, main cast, director, and budget. 
            This information is hosted at: [https://cinema.stag.rihal.tech](https://cinema.stag.rihal.tech), 
            where the API endpoint is: `GET /api/movie/{movie_id}`
            */

            for (let i = 0; i < movies_list.length; i++) {
                movies_list[i] = await addMissingMovieProperties(movies_list[i]);
            }

            console.info("Movies List Added Missing Properties! instance:", movies_list[0])

            // Adding modified movies list using [Movie.createBulk] function into the Movies table
            addListOfMovies(movies_list);
            console.info("Movies List Inserted into the DB!")
        }
        catch (err) {
            console.error("Error while parsing local movies list:", err);
            return;
        }
    });
}

const addMissingMovieProperties = async (movie) => {
    try {
        const apiResponse = await fetch(`https://cinema.stag.rihal.tech/api/movie/${movie.id}`);
        const { release_date, main_cast, director, budget } = await apiResponse.json(apiResponse);

        movie = {
            id: movie.id,
            name: movie.name,
            description: movie.description,
            release_date,
            main_cast,
            director,
            budget
        }

        return movie;
    }
    catch (err) {
        console.error(`Error fetching missing ${movie.name} properties from rihal api:`, err);
    }
}



module.exports = {
    addLocalMoviesToDB
};