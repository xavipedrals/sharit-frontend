angular.module('app.controllers')
  .controller('ChatCtrl', ['$scope',
    '$rootScope',
    '$translate',
    '$translatePartialLoader',
    '$state',
    'socket',
    '$sanitize',
    '$ionicScrollDelegate',
    'AuthService',
    function ($scope, $rootScope, $translate, $translatePartialLoader, $state, socket, $sanitize, $ionicScrollDelegate, AuthService) {
      $translatePartialLoader.addPart('chats');
      $translate.refresh();

      $scope.$state = $state;

      var self = this;
      var typing = false;
      var lastTypingTime;
      var TYPING_TIMER_LENGTH = 400;

      self.currentUser = $rootScope.currentUser;
      self.messages = [];
      if ($rootScope.currentRoom.messages)
        for (var i = 0; i < $rootScope.currentRoom.messages.length; ++i) {
          var message = new Object();
          message.userId = $sanitize($rootScope.currentRoom.messages[i].UserId);
          message.text = $sanitize($rootScope.currentRoom.messages[i].Text);
          message.date = $sanitize($rootScope.currentRoom.messages[i].Date);
          self.messages.push(message);
        }
      $ionicScrollDelegate.scrollBottom();

      self.messages.sort(function(a,b){
        var c = new Date(a.date);
        var d = new Date(b.date);
        return c-d;
      });

      $scope.currentUser = $rootScope.currentUser.id;
      var data = new Object();
      data.userId = $rootScope.currentUser.id;
      data.roomId = $rootScope.currentRoom.id;

      socket.on('connection', function () {
        console.log('connection');
        socket.emit('setRoom', JSON.stringify(data));
        $ionicScrollDelegate.scrollBottom();
      });

      socket.on('newMessage', function (data) {
        console.log('newMessage');
        data = JSON.parse(data);
        if (data.message && data.userId) {
          if (data.userId == $rootScope.currentRoom.userId1) {
            console.log('newMessage1');
            var message = new Object();
            message.userId = $sanitize(data.userId);
            message.text = $sanitize(data.message);
            message.date = $sanitize(data.date);
            self.messages.push(message);
          }
          else if (data.userId == $rootScope.currentRoom.userId2) {
            var message = new Object();
            message.userId = $sanitize(data.userId);
            message.text = $sanitize(data.message);
            message.date = $sanitize(data.date);
            self.messages.push(message);
          }
          $ionicScrollDelegate.scrollBottom();
        }
      });

      //function called when user hits the send button
      self.sendMessage = function () {
        if (self.message) {
        data.message = self.message;
        socket.emit('newMessage', JSON.stringify(data));
        self.message = "";
        data.message = "";
        }
      };

      //function called on Input Change
      self.updateTyping = function () {
        sendUpdateTyping()
      };

      // Display message by adding it to the message list
      /*function addMessageToList(message) {
       removeChatTyping(username);
       self.messages.push({
       text: $sanitize(message),
       username: username
       });
       $ionicScrollDelegate.scrollBottom();
       }*/

      // Updates the typing event
      function sendUpdateTyping() {
        /*if (!typing) {
         typing = true;
         socket.emit('typing');
         }
         lastTypingTime = (new Date()).getTime();
         $timeout(function () {
         var typingTimer = (new Date()).getTime();
         var timeDiff = typingTimer - lastTypingTime;
         if (timeDiff >= TYPING_TIMER_LENGTH && typing) {
         socket.emit('stop typing');
         typing = false;
         }
         }, TYPING_TIMER_LENGTH)*/
      }

      // Adds the visual chat typing message
      /*function addChatTyping(username) {
       addMessageToList(username, true, " is typing");
       }*/

      // Removes the visual chat typing message
      /*function removeChatTyping(username) {
       self.messages = self.messages.filter(function (element) {
       return element.username != username || element.content != " is typing";
       })
       }*/
    }]);
