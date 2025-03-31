addEventListener('fetch', (event) => {
	event.respondWith(handleRequest(event.request));
});

async function handleRequest(request) {
	const url = new URL(request.url);
	// Check if the request is for the "/docs" subpath
	if (url.pathname.startsWith('/docs')) {
		// Replace with your actual Netlify docs hostname
		url.hostname = 'https://botsi.docs.writedocs.io/';

		// Remove the /docs prefix so that the docs site receives the correct path
		url.pathname = url.pathname.replace(/^\/docs/, '') || '/';

		// Create a new request with the modified URL
		const modifiedRequest = new Request(url, request);
		return fetch(modifiedRequest);
	}

	// For all other paths, fetch the original request as normal
	return fetch(request);
}
