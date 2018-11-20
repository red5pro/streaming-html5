
//***DOWNLOAD***

const CONCURRENT_CONNECTIONS = 4;

function checkDownloadSpeed (baseURL, maxSeconds) {

  const isSecure = window.location.protocol.includes("https");
  baseURL = isSecure ? "https://" + baseURL : "http://" + baseURL + ":5080";

  return new Promise( (resolve, reject) => {
    const now = Date.now();
    const maxMillis = Math.floor(maxSeconds * 1000);

    const data = {
      beganAt: now,
      returnBy: now + maxMillis,
      url: baseURL + "/bandwidthdetection/detect",
      downloadResults: [],
      requests:[],
      resolve: resolve,
      reject: reject
    };

    for (var i = 0; i < CONCURRENT_CONNECTIONS; i++) {
      createDownloader(data);
    }

    // data.intervalHandle = setInterval( () =>{ downloadLoop(data); }, 50 );
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
      downloadLoop(data);
    }
  };
  request.ontimeout = () => { //Pencils down, time to give the data back.
    console.warn("Download detection timed out");
    removeRequest(data, request);
    downloadLoop(data);
  };

  data.requests.push(request);

  request.open("GET", data.url, true);
  request.responseType = "blob";
  request.timeout = 5000;
  request.send(null);
}

function downloadLoop(data) {
  const now = Date.now();

  if (now < data.returnBy) { //We have more time, keep downloading
    while(data.requests.length < CONCURRENT_CONNECTIONS){
      createDownloader(data);
    }
  } else { // Time's up. Once everything finishes, return the results
    if(data.requests.length < 1){
      // clearInterval(data.intervalHandle);
      const totalSeconds = (Date.now() - data.beganAt) / 1000.0;
      let totalBytes = 0;
      for (var i = 0; i < data.downloadResults.length; i++) {
        totalBytes += data.downloadResults[i];
      }
      if(totalBytes == 0){
        data.reject("There was a problem with the download test, the server sent no data");
      }
      console.log("Downloaded " + totalBytes + " bytes in " + totalSeconds + " seconds");
      const kbpS = ((totalBytes * 8) / 1024.0) / totalSeconds;
      console.log("Download detection finished with speed result of " + kbpS + "KBpS");
      data.resolve({ download: kbpS });
    }
  }
}

//***UPLOAD***

function checkUploadSpeed (baseURL, maxSeconds) {
  const isSecure = window.location.protocol.includes("https");
  baseURL = isSecure ? "https://" + baseURL : "http://" + baseURL + ":5080";

  return new Promise( (resolve, reject) => {
    const fatString = fortyKiloString();
    const now = Date.now();
    const maxMillis = Math.floor(maxSeconds * 1000);

    const data = {
      beganAt: now,
      returnBy: now + maxMillis,
      url: baseURL + "/bandwidthdetection/detect",
      uploadResults: [],
      requests:[],
      resolve: resolve,
      reject: reject,
      payload: fatString
    };

    for (var i = 0; i < CONCURRENT_CONNECTIONS; i++) {
      createUploader(data);
    }

    // data.intervalHandle = setInterval( () =>{ uploadLoop(data); }, 50 );
  });
}

function createUploader(data) {
  const request = new XMLHttpRequest();
  request.onreadystatechange = () => {
    if(request.readyState === 4){
      if(request.status === 200){ //successful - add up the speed results as appropriate
        data.uploadResults.push(40 * 1024); //upload is always 40KB, might as well re-use logic from download
      } else{ //unsuccesful, ignore the attempt, we'll try again plenty
        console.warn("Upload detection failed with the following status: " + request.statusText);
      }
      removeRequest(data, request);
      uploadLoop(data);
    }
  };
  request.ontimeout = () => {
    console.warn("Upload detection timed out");
    removeRequest(data, request);
    uploadLoop(data);
  };

  data.requests.push(request);

  request.open("POST", data.url, true);
  request.timeout = 5000;
  //prefix keeps the data unique, saved bulk spares us the generation time
  request.send( [uploadPrefix(), data.payload, uploadPrefix()].join('') );
}

function uploadLoop(data) {
  const now = Date.now();

  if (now < data.returnBy) { //We have more time, keep uploading
    while(data.requests.length < CONCURRENT_CONNECTIONS){
      createUploader(data);
    }
  } else { // Time's up. Once everything finishes, return the results
    if(data.requests.length < 1){
      // clearInterval(data.intervalHandle);
      const totalSeconds = (Date.now() - data.beganAt) / 1000.0;
      let totalBytes = 0;
      for (var i = 0; i < data.uploadResults.length; i++) {
        totalBytes += data.uploadResults[i];
      }
      if(totalBytes == 0){
        data.reject("There was a problem with the upload test, no data reached the server");
      }
      console.log("Uploaded " + totalBytes + " bytes in " + totalSeconds + " seconds");
      const kbpS = ((totalBytes * 8) / 1024.0) / totalSeconds;
      console.log("Upload detection finished with speed result of " + kbpS + "KbpS");
      data.resolve({ upload: kbpS });
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
        ret.download = result.download;
        return checkUploadSpeed(baseURL, halfMaxSeconds);
      })
      .then(result => {
        ret.upload = result.upload;
        resolve(ret);
      })
      .catch(error => {
        reject(error);
      });
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
