import { Meteor } from 'meteor/meteor';
Voters = new Mongo.Collection("voters");
Parties = new Mongo.Collection("parties");

Meteor.startup(() => {
  // code to run on server at startup
//  Voters.remove({});
  
});
