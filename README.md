##SHARIT
Si vols provar aquesta app segueix els següents passos:

- Si no tens Ionic instal·lat instal·la:

<code>$ npm install -g cordova ionic</code>

- Després abans de executar el projecte fes: 

<code>$ npm install</code>

<code>$ bower install</code>

<code>$ ionic state reset</code>

- Per executar el projecte:

	- Android: Posa en marxa un emulador de Geanymotion o conecta un dispositiu i executa:
	
	<code>$ ionic run android</code>
	
	- iOS: 
	
	<code>$ ionic emulate ios</code>
	
	- Web:
	
	<code>$ ionic serve --lab</code>

####NOTES: 
Ionic està fet sobre la versió de Node 4 (Node 5 no funciona de moment amb Ionic). Totes les comandes aquí explicades s'ha de fer des dins la carpeta app/. 

####PROBLEMES HABITUALS:
Si falla tot o el projecte no arrenca (quan representa que hauria de funcionar) borra les següents carpetes:
	
	app/node_modules
	app/platforms
	app/plugins
	app/www/lib
	
Després torna a executar les comandes que hi ha a dalt com si fos el primer cop que obres la app.
				