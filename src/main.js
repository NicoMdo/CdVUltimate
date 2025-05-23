/*( async ()=>{
    const base = require('./db/models'); // busca el archivo index.js .. recorre todos los modelos generados y despues se sincroniza la base contra los modelos.
    //await base.sequelize.sync({force:true}) //force en true cada vez que se lance la aplicacion se dropean las tablas y se vuelven a crear
    
    //solo para recuperar los usuarios creados
    const data = await base.User.findAll({}); 
    console.log(JSON.stringify(data));
})(); */

require('dotenv').config();

const express = require('express');
const db = require('./db/models');
const {generic} = require("./middlewares");
const app = express();
const PORT = process.env.PORT || 3001;
const path = require('path');


app.use('/images', express.static(path.join(__dirname, 'images')));
app.use(express.json());
app.use(generic.logRequest);
const {tagRoute, userRoute, postRoute, postImageRoute, commentRoute, followerRoute } = require('./routes');
app.use('/tag', tagRoute);
app.use('/user', userRoute);
app.use('/post', postRoute);
app.use('/postImage', postImageRoute);
app.use('/comment', commentRoute);
app.use('/follower', followerRoute);



app.listen(PORT, async () => {
    console.log(`La app arranco en el puerto ${PORT}.`);
    await db.sequelize.sync({})
});