export const getHome = (req, res) => {
    try {
        res.send('Hello, World!');
        console.log("I am here");
    } catch (err) {
        console.error("Error: " + err);
        res.status(500).send('Internal Server Error');
    }
};
