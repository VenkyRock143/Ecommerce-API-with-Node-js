const express                       =                   require('express');
const app                           =                   express();
const port                          =                   8000;

app.use(express.urlencoded());

//setting view engine

app.set('view engine','ejs');
app.set('views','./views');

app.get('/', function(req,res){
    res.render('home')
});

app.listen(port,function(err){
    if(err){
        console.log(`erro in running server: ${err}`);
    }
    console.log(`server is running in port: ${port}`);
})