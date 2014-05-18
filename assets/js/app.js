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

    ///////////////////////////////////////////////////////////
    // Here's where you'll want to add any custom logic for
    // when the browser establishes its socket connection to
    // the Sails.js server.
    ///////////////////////////////////////////////////////////
    log(
        'Socket is now connected and globally accessible as `socket`.\n' +
        'e.g. to send a GET request to Sails, try \n' +
        '`socket.get("/", function (response) ' +
        '{ console.log(response); })`'
    );
    ///////////////////////////////////////////////////////////






/*


/// APP BEINS HERE


    // Create application view (entry point)
    var App = React.createClass({
      render: function() {
        return (
          <div className='page-content'>{"APP"}</div>
        );
      }
    });

    // Create user list view
    var UserList = React.createClass({
      render: function() {
        return (
          <div>{"USERLIST"}</div>
        );
      }
    });

    // Create user view
    var User = React.createClass({
      render: function() {
        return (
          <div>{"USER"}</div>
        );
      }
    });


    // Create the initial view action
    var AppRouteTarget = {
      setupLayout: function () {
        React.renderComponent(
          <App />,
          document.querySelector('body')
        );
      }
    };

    // Create additional view actions
    var UsersRouteTarget = {
      list: function () {
        var users = [];

        React.renderComponent(
          <UserList users={users} />,
          document.querySelector('.page-content')
        );
      },

      show: function (request) {
        // placeholder - use favorite ajax lib here
        var user = { id: request.params.id };

        React.renderComponent(
          <User user={user} />,
          document.querySelector('.page-content')
        );
      }
    };

    // Define routes
    Aviator.setRoutes({
      'target': AppRouteTarget,
      // setupLayout is run for every route in the route tree.
      '/*': 'setupLayout',
      '/users': {
        'target': UsersRouteTarget,
        '/': 'list',
        '/:id': 'show'
      }
    });

    // Start routing
    Aviator.dispatch();

    setTimeout(function(){
      //Aviator.navigate('/users/');
    }, 2000)

*/








    /////// Backbone Stuff ///////

    // Define User Model
    var User = Backbone.Model.extend({
      defaults: function() {
        return {
          name: "User",
          active: false
        };
      },

      login: function() {
        this.save({active: !this.get("active")});
      }
    });

    // Define UserList Collection
    var UserList = Backbone.Collection.extend({
      model: User,
      url: '/user/',

      active: function () {
        return this.where({active: true});
      },
      inactive: function () {
        return this.where({active: !true});
      }
    });

    // Instantiate a new collection
    var Users = new UserList()

    var AppView = Backbone.View.extend({
      el: $("body"),
      events: {
        "click #create": "create"
      },

      initialize: function() {
        this.listenTo(Users, 'add', this.addOne);
        // this.listenTo(Users, 'reset', this.addAll);
        // this.listenTo(Users, 'all', this.render);

        Users.fetch();
        $('<ul id="list"></ul>').appendTo("body");
        $('<button id="create">Create</button>').appendTo("body");
        $('<button id="update">Update</button>').appendTo("body");
      },

      create: function () {
        Users.create({"name": "KEVIN" + Date.now()})
      },

      addAll: function () {
        Users.each(this.addOne, this)
      },

      addOne: function(user) {
        var view = new UserView({model: user});
        this.$("#list").append($('<li>').text(view.update()));
      },
    });

    var UserView = Backbone.View.extend({
      events: {
        "click #update": "update"
      },

      update: function () {
        var name = "UserView" + Date.now();
        // this.model.save({"name": name})
        return name;
      }
    });


    // Create a new collection
    var App = new AppView;







//    // Helper - generates a user
//    function generate() {
//      return new User({"name": "User" + Date.now()})
//    }
//
//
//    // Create test set of users
//    var set = []
//    for (var i = 0; i < 10; i++) {
//      set.push(generate())
//    }
//
//    users.add(set);
//
//    users.fetch();

    // Push them to the stack









////// APP ENDS HERE ///////








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
