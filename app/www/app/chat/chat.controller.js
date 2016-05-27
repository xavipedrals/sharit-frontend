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

      for (var i = 0; i < $rootScope.currentRoom.messages.length; ++i) {
        var message = new Object();
        message.userId = $rootScope.currentRoom.messages[i].UserID;
        message.text = $rootScope.currentRoom.messages[i].Text;
        message.date = $rootScope.currentRoom.messages[i].date;
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
      console.log(JSON.stringify($rootScope.currentUser));
      console.log(JSON.stringify($rootScope.currentRoom));
      data.userId = $rootScope.currentUser.id;
      data.roomId = $rootScope.currentRoom.id;


      socket.on('connection', function () {
        socket.emit('setRoom', JSON.stringify(data));
      });

      socket.on('newMessage', function (data) {
        console.log('newMessage');
        console.log(JSON.stringify(data));
        data = JSON.parse(data);
        if (data.message && data.userId) {
          if (data.userId == $rootScope.currentRoom.userId1) {
            console.log('newMessage1');
            var message = new Object();
            message.userId = data.userId.UserID;
            message.text = data.message;
            message.date = data.date;
            self.messages.push(message);
          }
          else if (data.userId == $rootScope.currentRoom.userId2) {
            console.log('newMessage2');
            var message = new Object();
            message.userId = data.userId.UserID;
            message.text = data.message;
            message.date = data.date;
            self.messages.push(message);
          }
          $ionicScrollDelegate.scrollBottom();
        }
      });

      console.log(JSON.stringify(data));
      //socket.emit('setRoom', JSON.stringify(data));

      //function called when user hits the send button
      self.sendMessage = function () {
        data.message = self.message;
        console.log('send');
        socket.emit('newMessage', JSON.stringify(data));
        self.message = ""
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
