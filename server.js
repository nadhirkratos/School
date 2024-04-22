//  import app from backend/app.js
const app = require("./backend/app")

// server is listening to PORT ( http://localhost:3000 )
app.listen(3000, () => {
    console.log("server is listening on PORT 3000 ..");
});