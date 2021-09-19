const express = require("express");
const port = process.env.PORT || 3001;
const app = express();

app.get("/api", (req, res) => {
	res.json({ message: `Hello! req.query.x: ${req.query.x}` });
});

app.listen(port, () => {
	console.log(`Server listening on port ${port}`);
});
