Appzone Live Test
=================

Live test appzone apps without deploying actually

Appzone Live Test contains two parts.

* Registering App and Receiving MTs
* Listening for MOs and Routing for the App

How this works
--------------
* First you need register you appUrl and get a code
* This is 100% appzone compatible SMS server
* Then from ur mobile you've to register to this app
* and then send sms to the app with message "#appCode"
* and then all the messages send using this phone will be redirected to the appUrl
* You can evan do broadcasting as well 

Registering A App and Sending MTs from the App
----------------------------------------------

Register Your app calling this http call

* METHOD :POST
* HOST: localhost
* PORT: `{config.json}.ports.mt`
* URI: /code
* BODY: { url: "your app url (receiving SMS)"}
* CONTENT-TYPE: "application/json"
* RESPONSE: {code: "appCode you received"}

After you've received the code you can sms following host. And It's 100% appzone copatible

* HOST: localhost
* PORT: PORT: {config.json}.ports.mt
* URI: /sim/:appCode

MO Listener
-----------

Once this started MO Listener is automatically Started. Here's the step you can activate it

* configure `{config.json}.appzone` with this apps credentials
* following will be the MO URL for the live test app

* HOST: localhost
* PORT: PORT: {config.json}.ports.mo






