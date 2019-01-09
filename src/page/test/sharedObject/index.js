(function(window, document, red5prosdk) {
  'use strict';

  var Socket = red5prosdk.Red5ProSharedObjectSocket;
  var SharedObject = red5prosdk.Red5ProSharedObject;
  var so = undefined; // @see onSubscribeSuccess
  var socket = undefined;

  var serverSettings = (function() {
    var settings = sessionStorage.getItem('r5proServerSettings');
    try {
      return JSON.parse(settings);
    }
    catch (e) {
      console.error('Could not read server settings from sessionstorage: ' + e.message);
    }
    return {};
  })();

  var configuration = (function () {
    var conf = sessionStorage.getItem('r5proTestBed');
    try {
      return JSON.parse(conf);
    }
    catch (e) {
      console.error('Could not read testbed configuration from sessionstorage: ' + e.message);
    }
    return {}
  })();
  red5prosdk.setLogLevel(configuration.verboseLogging ? red5prosdk.LOG_LEVELS.TRACE : red5prosdk.LOG_LEVELS.WARN);

  var disconnectButton = document.getElementById('disconnect-button');
  var connectButton = document.getElementById('connect-button');
  var connectField = document.getElementById('connect-field');
  var inputField = document.getElementById('input-field');
  var sendButton = document.getElementById('send-button');
  var soField = document.getElementById('so-field');

  disconnectButton.addEventListener('click', deEstablishSharedObject);
  connectButton.addEventListener('click', startConnection);

  function reEnableConnection () {
    hideDisconnect();
  }

  function showDisconnect () {
    disconnectButton.classList.remove('hidden');
    connectButton.classList.add('hidden');
  }

  function hideDisconnect () {
    disconnectButton.classList.add('hidden');
    connectButton.classList.remove('hidden');
  }

  function enableConnection () {
    disconnectButton.classList.add('hidden');
    connectButton.classList.remove('hidden');
    connectButton.removeAttribute('disabled');
  }

  function sendMessage () {
    sendMessageOnSharedObject(inputField.value);
  }

  function enableSend () {
    sendButton.removeAttribute('disabled');
    inputField.removeAttribute('disabled');
    sendButton.addEventListener('click', sendMessage);
  }

  function disableSend () {
    sendButton.setAttribute('disabled', true);
    inputField.setAttribute('disabled', true);
    inputField.value = '';
    sendButton.removeEventListener('click', sendMessage);
  }

  var protocol = serverSettings.protocol;
  var isSecure = protocol === 'https';

  function getSocketLocationFromProtocol () {
    return !isSecure
      ? {protocol: 'ws', port: serverSettings.wsport}
      : {protocol: 'wss', port: serverSettings.wssport};
  }

  var defaultConfiguration = (function() {
    var c = {
      protocol: getSocketLocationFromProtocol().protocol,
      port: getSocketLocationFromProtocol().port
    };
    return c;
  })();

  // Local lifecycle notifications.
  function onSocketFail (message) {
    document.getElementById('status-field').innerText = 'SharedObject failed: ' + message;
    console.error('[Red5ProSocket] Socket Error :: ' + message);
  }
  function onSocketSuccess () {
    console.log('[Red5ProScoket] Socket Complete.');
    document.getElementById('status-field').innerText = 'SharedObject connected.';
  }
  function onSocketEvent (event) {
    console.log('[Red5ProSocket] :: Event - ' + event.type);
    if (event.type.toLowerCase() === 'websocket.close') {
      // enable reconnect;
      socket.off('*', onSocketEvent);
      socket = undefined;
      document.getElementById('status-field').innerText = 'SharedObject closed (' + event.data.event.code + ').';
      reEnableConnection();
    }
  }

  function getAuthenticationParams () {
    var auth = configuration.authentication;
    return auth && auth.enabled
      ? {
        connectionParams: {
          username: auth.username,
          password: auth.password
        }
      }
      : {};
  }

  var hasRegistered = false;
  function appendMessage (message) {
    soField.value = [message, soField.value].join('\n');
  }
  // Invoked from METHOD_UPDATE event on Shared Object instance.
  function messageTransmit (message) { // eslint-disable-line no-unused-vars
    soField.value = ['User "' + message.user + '": ' + message.message, soField.value].join('\n');
  }

  function deEstablishSharedObject () {
    disableSend();
    unsubscribe();
    closeSocket();
  }

  function establishSharedObject () {
    disableSend();
    var name = connectField.value;

    // Create new shared object.
    so = new SharedObject(name, socket);
    var soCallback = {
      messageTransmit: messageTransmit
    };
    so.on(red5prosdk.SharedObjectEventTypes.CONNECT_SUCCESS, function (event) { // eslint-disable-line no-unused-vars
      console.log('[Red5ProSubscriber] SharedObject Connect.');
      appendMessage('Connected to ' + event.name + '.');
      showDisconnect();
      enableSend();
    });
    so.on(red5prosdk.SharedObjectEventTypes.CONNECT_FAILURE, function (event) { // eslint-disable-line no-unused-vars
      console.log('[Red5ProSubscriber] SharedObject Fail.');
    });
    so.on(red5prosdk.SharedObjectEventTypes.PROPERTY_UPDATE, function (event) {
      console.log('[Red5ProPublisher] SharedObject Property Update.');
      console.log(JSON.stringify(event.data, null, 2));
      if (event.data.hasOwnProperty('count')) {
        appendMessage('User count is: ' + event.data.count + '.');
        if (!hasRegistered) {
          hasRegistered = true;
          so.setProperty('count', parseInt(event.data.count) + 1);
        }
      else if (!hasRegistered) {
          hasRegistered = true;
          so.setProperty('count', 1);
        }
      }
    });
    so.on(red5prosdk.SharedObjectEventTypes.METHOD_UPDATE, function (event) {
      console.log('[Red5ProPublisher] SharedObject Method Update.');
      console.log(JSON.stringify(event.data, null, 2));
      soCallback[event.data.methodName].call(null, event.data.message);
    });
  }

  function sendMessageOnSharedObject (message) {
    so.send('messageTransmit', {
      user: [configuration.stream1, 'subscriber'].join(' '),
      message: message
    });
  }

  function openSocket () {
    var config = Object.assign({},
      configuration,
      defaultConfiguration,
      getAuthenticationParams());
    socket = new Socket()
    socket.on('*', onSocketEvent);
    socket.init(config)
      .then(function(socket) {
        onSocketSuccess(socket);
        establishSharedObject();
      })
      .catch(function (error) {
        var jsonError = typeof error === 'string' ? error : JSON.stringify(error, null, 2);
        console.error('[Red5ProSocket] :: Error in socket - ' + jsonError);
        onSocketFail(jsonError);
      });
  }

  function startConnection () {
    openSocket();
  }

  function unsubscribe () {
    if (so !== undefined) {
      so.close();
      so = undefined;
    }
  }

  function closeSocket () {
    if (socket !== undefined) {
      socket.close();
    }
  }

  enableConnection();

  // Clean up.
  window.addEventListener('beforeunload', function() {
    unsubscribe();
    closeSocket();
  });

})(this, document, window.red5prosdk);

