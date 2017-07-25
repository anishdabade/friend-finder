var friends = require("../data/friends.js");
var path = require("path");


module.exports = function(app) {

	app.get("/api/friends", function(req, res){
		res.json(friends);
	});

	app.post("/api/friends", function(req,res) {


		var perfectMatch = {
			name: "",
			image: "",
			matchDifference: 100
		};

		var userData = req.body;
		var userName = userData.name;
		var userImage = userData.image;
		var userScore = userData.scores;

		for(var i=0;i<friends.length;i++) {
			console.log(friends[i].name);
			difference = 0;

			for(var j=0;j<10;j++) {
				difference += Math.abs(parseInt(userScore[j])-parseInt(friends[i].scores[j]));

				if(difference <= perfectMatch.matchDifference) {
					perfectMatch.name = friends[i].name;
					perfectMatch.image = friends[i].image;
					perfectMatch.matchDifference = difference;
				}
			}
		}

		friends.push(userData);
 
		res.json(perfectMatch);

	});

};

