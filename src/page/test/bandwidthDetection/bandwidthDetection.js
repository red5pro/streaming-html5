
//***DOWNLOAD***

function checkDownloadSpeed (baseURL, maxSeconds) {

  return new Promise( (resolve, reject) => {
    const now = Date.now();
    const maxMillis = Math.floor(maxSeconds * 1000);

    const data = {
      beganAt: now,
      returnBy: now + maxMillis,
      url: "http://" + baseURL + ":5080/bandwidthdetection/detect",
      downloadResults: [],
      requests:[],
      resolve: resolve,
      reject: reject
    }

    for (var i = 0; i < 4; i++) {
      createDownloader(data);
    }

    data.intervalHandle = setInterval( () =>{ downloadLoop(data); }, 50 );
  });
}

function createDownloader(data) {
  const request = new XMLHttpRequest();
  request.onreadystatechange = () => {
    if(request.readyState === 4){
      if(request.status === 200){ //successful - add up the speed results as appropriate
        data.downloadResults.push(request.response.size);
      } else{ //unsuccesful, ignore the attempt, I guess? We'll try again plenty, I'm sure.
        console.warn("Download detection failed with the following status: " + request.statusText);
      }
      removeRequest(data, request);
    }
  };
  request.ontimeout = () => { //Pencils down, time to give the data back.
    removeRequest(data, request);
  }

  data.requests.push(request);

  request.open("GET", data.url, true);
  request.responseType = "blob";
  request.timeout = 5000;
  request.send(null);
}

function downloadLoop(data) {
  const = now = Date.now();

  if (now < data.returnBy) { //We have more time, keep downloading
    while(data.requests.length < 4){
      createDownloader(data);
    }
  } else { // Time's up. Once everything finishes, return the results
    if(data.requests.length < 1){
      clearInterval(data.intervalHandle);
      const totalSeconds = (Date.now() - data.beganAt) / 1000.0;
      let totalBytes = 0;
      for (var i = 0; i < data.downloadResults.length; i++) {
        totalBytes += data.downloadResults[i];
      }
      if(totalBytes == 0){
        data.reject("There was a problem with the download test, the server sent no data");
      }
      const kBpS = (totalBytes / 1024.0) / totalSeconds;
      console.log("Download detection finished with speed result of " + kBpS + "KBpS");
      data.resolve({ download: kBpS });
    }
  }
}

//***UPLOAD***

function checkUploadSpeed (baseURL, maxSeconds) {
  return new Promise( (resolve, reject) => {
    const fatString = fortyKiloString();
    const now = Date.now();
    const maxMillis = Math.floor(maxSeconds * 1000);

    const data = {
      beganAt: now,
      returnBy: now + maxMillis,
      url: "http://" + baseURL + ":5080/bandwidthdetection/detect",
      upResults: [],
      requests:[],
      resolve: resolve,
      reject: reject,
      payload: fatString
    }

    for (var i = 0; i < 4; i++) {
      createUploader(data);
    }

    data.intervalHandle = setInterval( () =>{ uploadLoop(data); }, 50 );
  });
}

function createUploader(data) {
  const request = new XMLHttpRequest();
  request.onreadystatechange = () => {
    if(request.readyState === 4){
      if(request.status === 200){ //successful - add up the speed results as appropriate
        data.uploadResults.push(40 * 1024); //upload is always 40KB, might as well re-use logic
      } else{ //unsuccesful, ignore the attempt, we'll try again plenty
        console.warn("Upload detection failed with the following status: " + request.statusText);
      }
      removeRequest(data, request);
    }
  };
  request.ontimeout = () => {
    removeRequest(data, request);
  }

  data.requests.push(request);

  request.open("GET", data.url, true);
  request.responseType = "blob";
  request.timeout = 5000;
  //prefix keeps the data unique, saved bulk spares us the ~160ms generation time
  request.send( [uploadPrefix(), data.payload, uploadPrefix()].join('') );
}

function uploadLoop(data) {
  const now = Date.now();

  if (now < data.returnBy) { //We have more time, keep uploading
    while(data.requests.length < 4){
      createUploader(data);
    }
  } else { // Time's up. Once everything finishes, return the results
    if(data.requests.length < 1){
      clearInterval(data.intervalHandle);
      const totalSeconds = (Date.now() - data.beganAt) / 1000.0;
      let totalBytes = 0;
      for (var i = 0; i < data.uploadResults.length; i++) {
        totalBytes += data.uploadResults[i];
      }
      if(totalBytes == 0){
        data.reject("There was a problem with the upload test, no data reached the server");
      }
      const kBpS = (totalBytes / 1024.0) / totalSeconds;
      console.log("Upload detection finished with speed result of " + kBpS + "KBpS");
      data.resolve({ upload: kBpS });
    }
  }
}

//***BOTH***

function checkSpeeds (baseURL, maxSeconds) {

  return new Promise(function(resolve, reject) {

    const halfMaxSeconds = maxSeconds / 2.0;
    const ret = { upload: -1, download: -1 };

    checkDownloadSpeed(baseURL, halfMaxSeconds)
      .then(result => {
        ret.download = result;
        return checkUploadSpeed(baseURL, halfMaxSeconds);
      })
      .then(result => {
        ret.upload = result;
        resolve(ret);
      })
      .catch(error => {
        reject(error);
      })
  });
}

//***SUPPORT***

function removeRequest(data, request) {
  for (let i = 0; i < data.requests.length; i++) {
    if(data.requests[i] === request){
      data.requests.splice(i, 1);
      return;
    }
  }
}

var allowedChar = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
function fortyKiloString() { //not exactly 40KB - expected to have another random 30 to front and back
  const out = [];
  for (let i = 0; i < 40900; i++){
    out.push( allowedChar.charAt(Math.floor(Math.random() * allowedChar.length)) );
  }
  return out.join('');
}

function uploadPrefix() {
  const out = [];
  for (let i = 0; i < 30; i++){
    out.push( allowedChar.charAt(Math.floor(Math.random() * allowedChar.length)) );
  }
  return out.join('');
}
