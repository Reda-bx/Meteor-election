import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Session } from 'meteor/session';
import './main.html';

Voters = new Mongo.Collection("voters");
Parties = new Mongo.Collection("parties");

Meteor.subscribe("parties");
Meteor.subscribe("voters");

Template.parties.onCreated(function helloOnCreated() {
  this.msgError = new ReactiveVar("");
  this.msgValid = new ReactiveVar("");
});

Template.parties.helpers({
  parties(){
    return Parties.find({}, {sort: {count: -1}});
  },
  msgError() {
    return Template.instance().msgError.get();
  },
  msgValid() {
    return Template.instance().msgValid.get();
  }
})
var randomCode = function() {
  var text = "";
  var possible = "abcdefghijklmnopqrstuvwxyz0123456789";
  for( var i=0; i < 4; i++ ){
    text += possible.charAt(Math.floor(Math.random() * possible.length))
  };
  return text;
}

Template.parties.events({
  'click .curs'(event, instance){
    if(Session.get('authenticate')){
      var voter_id = Session.get('authenticate');
      if(Voters.findOne(voter_id).isValid === false){
        Meteor.call('updatePartiesCount', this._id);
        Meteor.call('updateVoter', voter_id);
      }else{
        instance.msgError.set("You already Voted faggot !");
        setTimeout(function(){
          instance.msgError.set("")
        },2000);
      }
    }else{
      instance.msgError.set("authenticate urself faggot !");
      setTimeout(function(){
        instance.msgError.set("")
      },2000);
    }
  },
  'click button'(event, instance) {
    var u = Voters.findOne({ code : $('#name').val()})
    if( u !== undefined ){
      Session.set('authenticate', u._id);
      instance.msgValid.set("You can vote now !");
      setTimeout(function(){
        instance.msgValid.set("");
      }, 2000);
    }else{
      instance.msgError.set("invalid code faggot !");
      setTimeout(function(){
        instance.msgError.set("")
      },2000);
    }
    // Voters.insert({code: randomCode(), isValid: false })
    // Parties.insert({label: $('#name').val(), count: 0 })
    // increment the counter when button is clicked
  }
})
