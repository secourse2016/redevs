/**
 * App routes:
 */
module.exports = function(app,mongo) {

    

    /* RENDER MAIN PAGE */
    app.get('/', function (req, res) {
      res.sendFile(__dirname + '/public/index.html');
    });

};
