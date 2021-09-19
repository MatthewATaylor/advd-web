const express = require("express");
const cp = require("child_process");
const fs = require("fs");
const port = process.env.PORT || 3001;
const app = express();

let fifoWriteStream = fs.createWriteStream("/tmp/pipe_a");

let lastChild = null;

app.get("/api", (req, res) => {
	if (req.query.command == "on") {
		console.log("open");
		cp.exec(".//home/jaytlang/Documents/advd/advd");
		res.send({status: "open success"});
	}
	else if (req.query.command == "off") {
		console.log("close");
		fifoWriteStream.write("1");
	}
	else {
		res.send({status: "no action taken"});
	}
});

app.listen(port, () => {
	console.log(`Server listening on port ${port}`);
});
