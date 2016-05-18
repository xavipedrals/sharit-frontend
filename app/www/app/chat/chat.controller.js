angular.module('app.controllers')
    .controller('ChatCtrl',
        function ($scope, $rootScope, $translate, $translatePartialLoader, $state, socket, $sanitize, $ionicScrollDelegate, $timeout) {
            $translatePartialLoader.addPart('chats');
            $translate.refresh();

            $scope.$state = $state;

            var self = this;
            var typing = false;
            var lastTypingTime;
            var TYPING_TIMER_LENGTH = 400;

            self.messages = [];

            var data = new Object();
            data.userId = "12345";
            data.roomId = "12345";

            console.log("connect");

            socket.on('connect', function () {
                socket.join(roomId);
                socket.emit('connection', JSON.stringify(data));

                socket.on('newMessage', function (data) {
                    if (data.message && data.userId) {
                        addMessageToList(data.userId, true, data.message)
                    }
                });

                socket.on('typing', function (data) {
                    addChatTyping(data.userId);
                });

                socket.on('stopTyping', function (data) {
                    removeChatTyping(data.userId);
                });
            })

            //function called when user hits the send button
            self.sendMessage = function () {
                console.log('send')
                socket.emit('newMessage', self.message)
                addMessageToList(data.userId, true, self.message)
                socket.emit('stopTyping');
                self.message = ""
            }

            //function called on Input Change
            self.updateTyping = function () {
                sendUpdateTyping()
            }

            // Display message by adding it to the message list
            function addMessageToList(username, style_type, message) {
                username = $sanitize(username)
                removeChatTyping(username)
                self.messages.push({
                    content: $sanitize(message),
                    style: style_type,
                    username: username,
                })
                $ionicScrollDelegate.scrollBottom();
            }

            // Updates the typing event
            function sendUpdateTyping() {
                if (!typing) {
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
                }, TYPING_TIMER_LENGTH)
            }

            // Adds the visual chat typing message
            function addChatTyping(username) {
                addMessageToList(username, true, " is typing");
            }

            // Removes the visual chat typing message
            function removeChatTyping(username) {
                self.messages = self.messages.filter(function (element) {
                    return element.username != username || element.content != " is typing"
                })
            }
        });
