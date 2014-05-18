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




var App = React.createClass({
  render: function() {
    return (
      <div className='page-content'>{"APP"}</div>
    );
  }
});

var UserList = React.createClass({
  render: function() {
    return (
      <div>{"USERLIST"}</div>
    );
  }
});

var User = React.createClass({
  render: function() {
    return (
      <div>{"USER"}</div>
    );
  }
});



var AppRouteTarget = {
  setupLayout: function () {
    React.renderComponent(
      <App />,
      document.querySelector('body')
    );
  }
};

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

/**
 * @jsx React.DOM
 */

 // define routes
Aviator.setRoutes({
  target: AppRouteTarget,
  // setupLayout is run for every route in the route tree.
  '/*': 'setupLayout',
  '/users': {
    target: UsersRouteTarget,
    '/': 'list',
    '/:id': 'show'
  }
});

// Start routing
Aviator.dispatch();






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
