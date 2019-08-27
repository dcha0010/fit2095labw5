let express = require('express');
let bodyParser = require('body-parser');
let app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
    extended: false
}));


//Setup the view Engine
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

//Setup the static assets directories
app.use(express.static('css'))
app.use(express.static('views'))

let view=__dirname+"/views/";

let db=[];

app.get('/', function (req, res) {
    res.sendFile(view+"index.html");
});

app.get('/newtask', function (req, res) {
    res.sendFile(view+"newtask.html");
});

app.get('/listtask', function (req, res) {
    res.render(view+"listtask.html",{
        database:db
    });
});

app.post('/data', function (req, res) {
    console.log(req.body.name);
    console.log(req.body.duedate);
    console.log(req.body.desc);
    let newRecord={
        name:req.body.name,
        date:req.body.duedate,
        desc:req.body.desc
    } //is this part not necessary? since body parser does it for us
    db.push(newRecord);
    console.log(db);
    res.render(view+"listtask.html",{
        database:db
    });
});

app.listen(8080);

