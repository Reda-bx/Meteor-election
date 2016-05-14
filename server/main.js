import { Meteor } from 'meteor/meteor';
Voters = new Mongo.Collection("voters");
Parties = new Mongo.Collection("parties");

Meteor.startup(() => {
  // code to run on server at startup
  // Voters.remove({});
  Meteor.publish("parties", function(){
    return Parties.find({}, {sort: {count: -1}});
  });
  Meteor.publish("voters", function(){
    return Voters.find({});
  });

  Meteor.methods({
    updatePartiesCount: function(id){
      Parties.update(id,{ $inc : { count : 1}});
    },
    updateVoter: function(voter_id){
      Voters.update(voter_id, {$set: { isValid: true}});
    }
  });
});
