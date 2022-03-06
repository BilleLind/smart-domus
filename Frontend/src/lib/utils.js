export function post(endpoint, data) {
	return fetch(endpoint, {
		method: 'POST',
		/* mode: 'cors',
		credentials: 'include', */
		body: JSON.stringify(data || {}),
		headers: {
			'Content-Type': 'application/json'
		}
	}).then((r) => r.json());
}
