# Feature List
 APIs are done for all features.
## 1) Database Design
## 2) Home Page - Name of the application, design of background etc.
    Davi Carvalho
    controllers/home.controller.js
## 3) User Register / Login system
    Goktug Ocalan
    _helpers/jwt.js
    models/user.model.js
    controllers/user.controller.js
    services/user.service.js
    Sinan Yaman
    sinan/user.routes.js
    sinan/user.model.js
    *** These will be integrated
## 4) Create Movies - Admins are allowed to add movies
    Goktug Ocalan
    models/movie.model.js
    controllers/movie.controller.js
    services/movie.service.js
## 5) List Movies - Page that display and sort movies that are in the database
    Goktug Ocalan
    models/movie.model.js
    controllers/movie.controller.js
    services/movie.service.js
## 6) Movie Details - Displaying the actors / directors involved in the movie, embedded trailer link,
    Davi Carvalho
    controllers/movie.controller.js
    services/movie.service.js
## 7) Create Actors / Directors- Admins are allowed to create the cast of the movie 
    (Carla Klaes)
    models/MovieProfessional.js
    route/api/movieProfessional.js
    Sinan Yaman
    sinan/actor.model.js
    sinan/actor.routes.js
    sinan/actor.controller.js
    *** These will be integrated

    (Carla Klaes - HTML)
    components/ProfessionalForm.js
    components/ProfessionalFormDetails.js
    components/Confirm.js
    components/Success.js

    Davi Carvalho
    controller/professional.controller.js
    service/professional.service.js


## 8) Rate / Review Movies - Users can rate and review movies 
    (Carla Klaes)
    models/ReviewMovies.js
    route/api/reviewMovies.js
## 9) Watchlist - Users are able to bookmark movies and display them in a list 
    (Carla Klaes)
    models/Watchlist.js
    route/api/watchlist.js
## 11) Advanced Search Page - Filter movies by name, year, rating, actor, director etc.
    Davi Carvalho
    controllers/movie.controller.js
    services/movie.service.js
## 12) User profile page - Uploading photo, editing name, email address etc.

