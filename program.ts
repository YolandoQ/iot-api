import startUp from "./startUp";

let port = process.env.PORT || '3050';

startUp.app.listen(port, function() {
    console.log(`Service up port: ${port}`);
})