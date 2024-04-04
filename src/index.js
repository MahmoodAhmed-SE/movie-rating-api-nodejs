const express = require('express');



const app = express();



app.listen(process.env.PORT, () => {
    console.log(`Server up and running on port ${process.env.PORT}`);
})


app.post("/api/auth/signup", (req, res) => {
    
})