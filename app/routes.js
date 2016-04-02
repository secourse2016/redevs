/**
 * App routes:
 */
module.exports = function(app,mongo) {

    

    /* RENDER MAIN PAGE */
    app.get('/', function (req, res) {
      res.sendFile(__dirname + '/public/index.html');
    });

    // app.get('/api/tickets',function(req,res){
    // 	res.sendFile('../tickets.json');
    // });

};
