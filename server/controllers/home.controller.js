export const getHome = (req, res) => {
    try {
        res.send('Hello, World!');
        console.log("/ is working!!");
    } catch (err) {
        console.error("Error: " + err);
        res.status(500).send('Internal Server Error');
    }
};
