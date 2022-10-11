export async function load() {
	// Fetching the GeoJSON hosted locally
	const geoJSON = await fetch('http://127.0.0.1:5173/asira/asira.json').then((res) => res.json());
	return {
		geoJSON
	};
}
