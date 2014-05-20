/**
 * @jsx React.DOM
 */

/**
 * app.js
 *
 * This file contains some conventional defaults for working with Socket.io + Sails.
 * It is designed to get you up and running fast, but is by no means anything special.
 *
 * Feel free to change none, some, or ALL of this file to fit your needs!
 */


(function (io) {

  // as soon as this file is loaded, connect automatically,
  var socket = io.connect();
  if (typeof console !== 'undefined') {
    log('Connecting to Sails.js...');
  }

  socket.on('connect', function socketConnected() {
    // Listen for Comet messages from Sails
    socket.on('message', function messageReceived(message) {
      ///////////////////////////////////////////////////////////
      // Replace the following with your own custom logic
      // to run when a new message arrives from the Sails.js
      // server.
      ///////////////////////////////////////////////////////////
      log('New comet message received :: ', message);
      //////////////////////////////////////////////////////
    });

    // Define User Model
    var User = Backbone.Model.extend({
      defaults: function() {
        return {
          first_name: "",
          last_name: "",
          email: "",
          password: ""
        };
      }
    });

    // Define UserList Collection
    var UserList = Backbone.Collection.extend({
      model: User,

      url: '/user/',
    });

    // Instantiate a new collection
    var Users = new UserList()

    // Create a
    var AppView = Backbone.View.extend({
      el: $("body"),

      events: {
        "click .create": "create"
      },

      initialize: function() {
        this.listenTo(Users, "add", this.addOne); // this.listenTo(Users, 'reset', this.addAll);

        // Create input and controls
        this.$el.append($("<input placeholder='name'     type='text' id='name'>"));
        this.$el.append($("<input placeholder='password' type='text' id='password'>"));
        this.$el.append($("<button>").text("create").addClass("create"))

        // Create list
        this.$el.append($("<ul id='list'>"));

        Users.fetch();
      },

      create: function () {
        Users.create({
          "name":     this.$el.find("#name").val(),
          "password": this.$el.find("#password").val()
        })
      },

      addOne: function(user) {
        var view = new UserListView({model: user});
        this.$("#list").append(view.render().$el);
      },
    });

    var UserListView = Backbone.View.extend({
      tagName:  "li",

      // Simple template
      template: _.template('<li><%- name %><button class="destroy">Remove</button></li>'),

      // DOM Handlers
      events: {
        'click .destroy': 'clear'
      },

      // Attach model events
      initialize: function() {
        this.listenTo(this.model, 'change', this.render);
        this.listenTo(this.model, 'destroy', this.remove);
      },

      // Remove this model from the collection
      clear: function () {
        this.model.destroy();
      },

      // Render out the current view with the model data passed
      render: function () {
        this.$el.html(this.template(this.model.toJSON()));
        return this; // enable chained calls
      }
    });

    // Create a new collection
    var App = new AppView;
  });

  // Expose connected `socket` instance globally so that it's easy
  // to experiment with from the browser console while prototyping.
  window.socket = socket;

  // Simple log function to keep the example simple
  function log () {
    if (typeof console !== 'undefined') {
      console.log.apply(console, arguments);
    }
  }
})(

  // In case you're wrapping socket.io to prevent pollution of the global namespace,
  // you can replace `window.io` with your own `io` here:
  window.io

);
