# Node.js Backend For Mixer Testbeds

Included in this directory is a Node.js based WebSocket server for the Mixer testbeds that provides the communication between user testbeds and HTML5 pages loaded into Red5 Pro Mixers. This allows to create dynamic compositions or video conferences where live streams can be added or removed in real-time by a Manager or Host.

The server provides the endpoints for the round trip authentication and a WebSocket based API. The round trip authentication is used to determine when live streams are published or unpublished, while the WebSocket API provides the communication layer between the different HTML5 pages and testbeds. 

# Deploying

The Node.js Backend For Mixer Testbeds must be deployed in a dedicated instance. It cannot be deployed on load balanced Stream Managers because that would prevent WebSocket clients connected to different Node.js servers to communicate with each other.  

Node.js can be installed on the instance using the following commands:
```sh
$ sudo apt-get update
$ curl -sL https://deb.nodesource.com/setup_12.x -o nodesource_setup.sh
$ sudo bash nodesource_setup.sh
$ sudo apt-get install -y nodejs
$ sudo apt-get install build-essential
$ sudo npm install forever -g
```

Copy the `backend-mixer-testbeds` folder into the instance and `cd` into it. 

Install the dependencies as follows:
```sh
npm install
```

Generate a certificate for the server to use. 

Start the Node.js server with the following command:
```sh
sudo PORT=443 REST_ADMIN_TOKEN=<token-configured-in-mixertestbeds-webapp> SM_TOKEN=<SM-API_token> SM_HOST=https://<Hostname-of-Stream-Manager> CERT=<path-to-fullchain.pem> KEY=<path-to-private-key.pem> forever start index.js 
```

> By default, if `PORT` is not specified, the websocket server will run on `localhost:8001`.

# APIs

* [Conference API](conference-api.md): WebSocket API for the video conference testbeds.
* [Grid Composition API](grid-api.md): WebSocket API for the grid compositions testbeds.