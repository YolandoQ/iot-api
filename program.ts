import startUp from "./startUp";

let port = 3050;

startUp.listen(port, function() {
    console.log(`Service up on port: ${port}`);
})