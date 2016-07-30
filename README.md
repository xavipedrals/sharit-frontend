##SHARIT

Sharit is an app to share object between people that lives nearby. You can post your objects or ask for them. You have a chat to ask other people objects that doesn't exist in the app. It was built in a class project, it's not a real product and may have some bugs.

####TECHNOLOGY:
This app is biult in <a href="http://ionicframework.com/">Ionic</a> technology:

<div style="text-align:center"><img src="https://www.clarity-ventures.com/Portals/0/images/article/ionic_tips/ionic_logo.png" width="50%" margin="auto"></div>

This app uses a server as a backend, which you can find at this repo. The server was built in <a href="https://golang.org/">Go</a>:

<div style="text-align:center"><img src="http://www.unixstickers.com/image/cache/data/stickers/golang/golang.sh-600x600.png" width="30%" margin="auto"></div>

We use a chat that was built using <a href="http://socket.io/">Socket.io</a>:

<div style="text-align:center"><img src="http://programacion.net/files/article/20160322050343_socket-io.png" width="45%" margin="auto"></div>

####HOW TO RUN THE APP:
If you want to run this app follow the following steps:

- If you don't have Ionic installed install:

<code>$ npm install -g cordova ionic</code>

- Then download the project and run this commands (ensure you have bower installed, you can install it by running "npm install bower"): 

<code>$ npm install</code>

<code>$ bower install</code>

<code>$ ionic state reset</code>

- To run the project:

	- Android: Run a Geanymotion emulator or plug in an Android device and run:
	
	<code>$ ionic run android</code>
	
	- iOS: 
	
	<code>$ ionic emulate ios</code>
	
	- Web:
	
	<code>$ ionic serve --lab</code>

####NOTES: 
Ionic is bulit in Node version 4 so use this node version if you want to avoid problems.

If the server is down you might be unable to run the app. You have the server repo here. 

####COMMON PROBLEMS:
If everything fails or the project doesn't run properly delete the following folders:
	
	app/node_modules
	app/platforms
	app/plugins
	app/www/lib
	
Then run the commands above again like you have just downloaded the repo.

####SCREENSHOTS:

<img src="https://raw.githubusercontent.com/xavipedrals/sharit-frontend/master/app/www/assets/screenshots/Screenshot_20160612-140126.png" width="32%">
<img src="https://raw.githubusercontent.com/xavipedrals/sharit-frontend/master/app/www/assets/screenshots/Screenshot_20160612-140047.png" width="32%">
<img src="https://raw.githubusercontent.com/xavipedrals/sharit-frontend/master/app/www/assets/screenshots/Screenshot_20160612-140059.png" width="32%">
<img src="https://raw.githubusercontent.com/xavipedrals/sharit-frontend/master/app/www/assets/screenshots/Screenshot_20160612-140356.png" width="32%">
<img src="https://raw.githubusercontent.com/xavipedrals/sharit-frontend/master/app/www/assets/screenshots/Screenshot_20160612-140116.png" width="32%">
<img src="https://raw.githubusercontent.com/xavipedrals/sharit-frontend/master/app/www/assets/screenshots/Screenshot_20160612-140208.png" width="32%">
<img src="https://raw.githubusercontent.com/xavipedrals/sharit-frontend/master/app/www/assets/screenshots/Screenshot_20160612-140223.png" width="32%">
<img src="https://raw.githubusercontent.com/xavipedrals/sharit-frontend/master/app/www/assets/screenshots/Screenshot_20160612-140234.png" width="32%">
<img src="https://raw.githubusercontent.com/xavipedrals/sharit-frontend/master/app/www/assets/screenshots/Screenshot_20160612-140311.png" width="32%">
<img src="https://raw.githubusercontent.com/xavipedrals/sharit-frontend/master/app/www/assets/screenshots/Screenshot_20160612-140326.png" width="32%">


				