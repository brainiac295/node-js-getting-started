const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000

var admin=require('firebase-admin');
var serviceAccount=require("./key.json");
var url=require('url');

admin.initializeApp({
  credential:admin.credential.cert(serviceAccount),
  databaseURL:"https://casuistrynews.firebaseio.com/"
});


express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => {
    var db=admin.database();
    var ref=db.ref("Signals");  
    
    var q=url.parse(req.url,true).query;
    var sym=q.sym;
    var pri=parseFloat(q.price);
    var ty=q.type;
    
    var NewSignal=ref.push();

    NewSignal.set({
      Seq:NewSignal._id,
      Symbol:sym,
      Price:pri,
      SignalType:ty
    });    
    
    res.render('pages/index')
  })
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))
