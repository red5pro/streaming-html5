let brewmixer = {

// Create Mixer Event
createMixerEvent: async function(jwt, nodeGroupName, mixerRequest) {
	const url = "/as/v1/streams/mixer/" + nodeGroupName;
	console.log("POST " + url);
	const response = await fetch(url, {
		method: 'POST',
		withCredentials: true,
		credentials: 'include',
		headers: {
			'Content-Type': 'application/json',
			Authorization: 'Bearer ' + jwt
		},
		body: JSON.stringify(mixerRequest)
	}).catch((error) => { console.log("error trying to createMixerEvent: " + error) });
	
	return response;
},



// Get All Mixer Events



// Get RenderTrees for Mixer Event
getRenderTrees: async function (jwt, nodeGroupName, eventId) {
	const url = "/as/v1/streams/mixer/" + nodeGroupName + "/" + eventId;
	console.log("GET " + url);
	const response = await fetch(url, 	{
	      method: 'GET',
	      withCredentials: true,
	      credentials: 'include',
	      headers: {
	        Authorization: 'Bearer ' + jwt
	      }
	}).catch((error) => { console.log("error trying to getRenderTrees: " + error) });
	
	var result = null;
	if (response.ok) {
		result = await response.json(); 
		// console.log("RENDERTREE RESPONSE: " + JSON.stringify(result, null, 4));
	} else {
		console.log("RENDERTREE RESPONSE ERROR " + response.status);				
	}
	
	return result;
},


// Update RenderTrees
// send the globalNodeGraph to the server
// note that renderTrees is an array 
updateRenderTrees: async function (jwt, nodeGroupName, eventId, renderTrees) {
	const url = "/as/v1/streams/mixer/" + nodeGroupName + "/" + eventId;
	console.log("PUT " + url);

	const body = JSON.stringify(renderTrees);
//	JSON.stringify({
//					"rootNodes": renderTrees
//				})
	console.log("body: " + body);
				
	try {
		const response = await fetch(url, {
			method: 'PUT',
			withCredentials: true,
			credentials: 'include',
			headers: {
				'Content-Type': 'application/json',
				Authorization: 'Bearer ' + jwt
			},
			body: body
		});

		if (response.ok) {
			console.log("Update successful");
		} else {
			const responseObj = await response.json();
			console.log("Error:\n", JSON.stringify(responseObj, null, 4));
		}
	} catch (error) {
		console.log("Error trying to updateRenderTrees: " + error);
	}
},


// Stop Mixer Event
stopMixerEvent: async function(jwt, nodeGroupName, eventId) {
	const url = "/as/v1/streams/mixer/" + nodeGroupName + "/" + eventId;
	console.log("DELETE " + url);
	const response = await fetch(url, {
		method: 'DELETE',
		withCredentials: true,
		credentials: 'include',
		headers: {
			Authorization: 'Bearer ' + jwt
		}
	}).catch((error) => { console.log("error trying to stopMixerEvent: " + error) });
	
	return response;
}

}
