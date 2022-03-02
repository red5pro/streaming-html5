(window => {

    /* 
    *   Fetched the details of an existing composition
    *   @eventName the name of the composition event
    *   @smToken the Stream Manager authentication token
    */
    const fetchCompositionData = (eventName, smToken) => {
        console.log(`Requesting details for composition ${eventName}`)
        const url = `${location.protocol}//${location.host}/streammanager/api/4.0/composition/${eventName}?accessToken=${smToken}`
        return makeRequest(url, 'GET')
    }

    /* 
    *   Creates a new composition
    *   @data composition data
    *   @smToken the Stream Manager authentication token
    */
    const createCompositionOnStreamManager = (data, smToken) => {
        const url = `${location.protocol}//${location.host}/streammanager/api/4.0/composition?accessToken=${smToken}`
        return makeRequest(url, 'POST', data)
    }

    /* 
    *   Deletes a composition
    *   @eventName the name of the composition event
    *   @smToken the Stream Manager authentication token
    */
    const deleteComposition = (eventName, smToken) => {
        console.log(`Deleting composition ${eventName}`)
        const url = `${location.protocol}//${location.host}/streammanager/api/4.0/composition/${eventName}?accessToken=${smToken}`
        return makeRequest(url, 'DELETE')
    }

    /* 
    *   Updates the node graph in one or more Mixer nodes
    *   @eventName the name of the composition event
    *   @nodeGraph an array of node graph objects ech object containing the mixerName they refer to
    *   @smToken the Stream Manager authentication token
    */
    const updateNodeGraphInMixer = (eventName, nodeGraph, smToken) => {
        const url = `${location.protocol}//${location.host}/streammanager/api/4.0/composition/${eventName}/nodegraph?accessToken=${smToken}`
        console.log('update node graph', url)
        return makeRequest(url, 'POST', nodeGraph)
    }

    const makeRequest = (url, method, data = null) => {
        return new Promise((resolve, reject) => {
            fetch(url, {
                method,
                body: data != null ? JSON.stringify(data) : {}
            })
                .then(response => response.json())
                .then(data => {
                    console.log('Success:', data);
                    resolve(data)
                })
                .catch((error) => {
                    console.error('Error:', error)
                    reject(error)
                })
        })
    }

    window.fetchCompositionData = fetchCompositionData
    window.createCompositionOnStreamManager = createCompositionOnStreamManager
    window.updateNodeGraphInMixer = updateNodeGraphInMixer
    window.deleteComposition = deleteComposition
})(window)