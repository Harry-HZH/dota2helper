const express = require("express")

const app = express()

app.set('secret','doqwpdkopqw')

app.use(require('cors')())
app.use(express.json())
app.use('/',express.static(__dirname + '/web'))
app.use('/admin',express.static(__dirname + '/admin'))
app.use('/uploads',express.static(__dirname + '/uploads'))


require('./routes/admin')(app)
require('./routes/web')(app)
require('./plugins/db')(app)
app.listen(3000,()=>{
  console.log('running on port 3000');
})