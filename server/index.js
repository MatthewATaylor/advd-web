const express = require("express");
const cp = require("child_process");
const port = process.env.PORT || 3001;
const app = express();

let lastChild = null;

app.get("/api", (req, res) => {
	if (req.query.command == "on") {
		console.log("open");
		if (lastChild !== null) {
			lastChild.kill();
		}
		//lastChild = cp.fork("processPath");
		res.send({status: "open success"});
	}
	else if (req.query.command == "off") {
		console.log("close");
		if (lastChild !== null) {
			lastChild.kill();
			res.send({status: "close success"});
		}
		else {
			res.send({status: "nothing to close"});
		}
	}
	else {
		res.send({status: "no action taken"});
	}
});

app.listen(port, () => {
	console.log(`Server listening on port ${port}`);
});
