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

      self.messages = [];

      var currentUser = $scope.currentUser;

      var data = new Object();
      console.log('data ' + JSON.stringify(AuthService.currentUser));
      data.userId = currentUser.id;
      data.roomId = $scope.selectedRoom;


      // "dGVzdFVzZXIxdGVzdFVzZXIyaXRlbTEyMDE2LTA1LTIwIDA2OjM3OjU5LjgxMTgyMzkxNCArMDAwMCBVVEM=";


      socket.on('connection', function () {
        socket.emit('setRoom', JSON.stringify(data));
      });

      socket.on('newMessage', function (data) {
        console.log('newMessage');
        console.log(data);
        data = JSON.parse(data);
        if (data.message && data.userId) {
          addMessageToList(data.userId, true, data.message)
        }
      });

      console.log(JSON.stringify(data));
      socket.emit('setRoom', JSON.stringify(data));

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
      function addMessageToList(username, style_type, message) {
        username = $sanitize(username);
        removeChatTyping(username);
        self.messages.push({
          content: $sanitize(message),
          style: style_type,
          username: username
        });
        $ionicScrollDelegate.scrollBottom();
      }

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
      function addChatTyping(username) {
        addMessageToList(username, true, " is typing");
      }

      // Removes the visual chat typing message
      function removeChatTyping(username) {
        self.messages = self.messages.filter(function (element) {
          return element.username != username || element.content != " is typing";
        })
      }
    }]);
