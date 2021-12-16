const express = require("express");
const config = require("./config/config");
const bodyParser = require("body-parser");
const { ValidationError } = require("./utils");
const middleware = require('./routers/authorization');
const { PORT } = config;
const path = require('path');
const cors = require('cors')
const app = express();
app.use(cors({
     origin:"*"
}))
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.get("/", (req, res) => {
     return res.send("Hello world!");
});
// app.use([middleware.publicApi, middleware.authenticate])
//* import components
app.use('/', require("./routers/index"));
app.use('/face-detect',express.static('public'))
app.get("/face-detect", async (req, res) => {
     res.sendFile( path.join(__dirname, '../public/index.html'));
});
//* =============================================
app.all("*", (req, res) => {
     return res.status(200).json({
          code: 404,
          message: `Can't find ${req.originalUrl}`,
     });
});
//* Error handling
app.use((err, req, res, next) => {
     console.log("CATCH ERROR >>>>", err)
     if(err instanceof ValidationError){
          return res.status(200).json({
               code: err.code,
               message: err.message,
          });
     }
     return res.status(200).json({
          code: 500,
          message: err.message,
     });
});
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
