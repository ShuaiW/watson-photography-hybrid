Getting Started
======================

This is a sample hybrid application for the IBM Watson Mobile Developer Challenge.

![image](https://raw.githubusercontent.com/IBMMobileCoC/watson-photography-ios/master/readme-assets/splash.png?token=532119__eyJzY29wZSI6IlJhd0Jsb2I6SUJNTW9iaWxlQ29DL3dhdHNvbi1waG90b2dyYXBoeS1pb3MvbWFzdGVyL3JlYWRtZS1hc3NldHMvc3BsYXNoLnBuZyIsImV4cGlyZXMiOjEzOTg2MjM1NzB9--9e21522c5838b8669900a1c8cbacd64ba4aae19f) &nbsp;
![image](https://raw.githubusercontent.com/IBMMobileCoC/watson-photography-ios/master/readme-assets/overview.gif?token=532119__eyJzY29wZSI6IlJhd0Jsb2I6SUJNTW9iaWxlQ29DL3dhdHNvbi1waG90b2dyYXBoeS1pb3MvbWFzdGVyL3JlYWRtZS1hc3NldHMvb3ZlcnZpZXcuZ2lmIiwiZXhwaXJlcyI6MTM5ODYxNjUxNH0%3D--33e7306bb983c820c190c140e304f87be1ef4c5c)

This project is a reference application demonstrating how to build a hybrid mobile application that connects to IBM Watson. It is build using the following libraries:
├── Apache Cordova v3.4
├─┬ backbone v1.1.2
│ └── underscore v1.6.0
├── jquery v1.10.2
├─┬ jquery-mobile v1.4.2
│ └── jquery v1.10.2
└── requirejs v2.1.11

## Getting the Code

Clone this Github repository.

## Setting up the hybrid app with Apache Cordova CLI v3.4

The hybrid mobile application sample code was created using Cordova v3.4. Below outlines the process I went through to set up Cordova and the project on OS X. You can chose to do the same, or you can read the full Cordova documentation at: http://cordova.apache.org/docs/en/3.4.0/ which provides much more in-depth coverage. You could also chose to pull out the ‘www’ directory which is simply HTML, JS, and CSS for use within you own project, such as an IBM Worklight.

1. Make sure an up-to-date version of Node.js is installed on your system.

2. Install the latest version of Cordova globally:
`sudo npm install -g cordova`

3. Open Terminal and navigate to a directory where you store projects on your system. For example:
`cd ~/Projects`

4. Create a new directory for this project and change into that directory:
`mkdir watson-photography && cd $_`

5. Create a new Cordova project with name “Watson Photography" and id "com.ibm.watson.WatsonPhotographyHybrid":
`cordova create watson-photography-hybrid com.ibm.watson.WatsonPhotographyHybrid 'Watson Photography'`

6. Navigate into your new project directory:
`cd watson-photography-hybrid`

7. At this point you can replace the `www` directory in your new project with the `www` directory from this repository 

8. Now add a couple of platforms that you would like to support:
`cordova platform add android`
`cordova platform add ios`

9. Make a build:
`cordova build`

10. Add some common Cordova plugins:
`cordova plugin add org.apache.cordova.console`
`cordova plugin add org.apache.cordova.device`
`cordova plugin add org.apache.cordova.splashscreen`

11. Start a local web server for the www/ assets: (default port 8000)
`cordova serve 8000`

## Running the hybrid app example without Apache Cordova

The root directory, 'watson-photography-hybrid' contains a directory named 'www' This directory contains all of the HTML, JavaScript and CSS for the project. If you host the 'www' folder on a local webserver you will be able to access the 'index.html' file and run the reference application through a browser.

If you don't have a local webserver configured, you can also start Google Chrome with the following command line arguments: '--args --disable-web-security --allow-file-access-from-files' and open the 'index.html' file.
For example, on OS X you would open a terminal and type:
open -a Google\ Chrome --args --disable-web-security --allow-file-access-from-files

## Configuring the reference application
Find the `Constants.js` file in the `www/js/com/models` directory and add the username, password and the watson instance id number to contact the Watson API.

-----

## Overview

