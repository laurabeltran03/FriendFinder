var friendsArray = require('../data/friends.js');

module.exports = function(app){

  app.get('/api/friends', function(req,res){
    res.json(friendsArray);
  });

  app.post('/api/friends', function(req,res){
 
    var newScores = req.body.scores;
    var scoresArray = [];
    var bestMatch = 0;

   
    for(var i=0; i<friendsArray.length; i++){
      var scoresDiff = 0;
     
      for(var j=0; j<newScores.length; j++){
        scoresDiff += (Math.abs(parseInt(friendsArray[i].scores[j]) - parseInt(newScores[j])));
      }

 
      scoresArray.push(scoresDiff);
    }

  
    for(var i=0; i<scoresArray.length; i++){
      if(scoresArray[i] <= scoresArray[bestMatch]){
        bestMatch = i;
      }
    }

  
    var bff = friendsArray[bestMatch];
    res.json(bff);


    friendsArray.push(req.body);
  });
};