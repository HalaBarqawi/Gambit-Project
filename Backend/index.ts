
import app from "./app"
app.listen(process.env.PORT  , ()=>{
    console.log("We ar listening on "+process.env.PORT+ " "+ process.env.NODE_ENV )
});
