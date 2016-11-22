Requirements

1 - have installed mongo db

2 - have installed node and npm

3 - have globally installed webpack and express-generator


Settings

By default the web server is raised by the port 3000 and the mongo server by the port 27017, if you want to change some of the port do the following.

Port webserver go to the root of the bin/www project on line 15, var port = normalizePort (process.env.PORT || '3000') change the desired port.

Port mongodb go to the root of the project config / db.js and change the port you want and at the same time the database if required

module.exports = {
    url : 'mongodb://localhost:27017/game'
}


Steps

1 - Clone this repository git clone https://github.com/sebastiandelaroche/game-word-yuxi.git

2 - Download npm install dependencies

3 - Build the angular project npm run build

4 - In localhost server can be raised npm start
