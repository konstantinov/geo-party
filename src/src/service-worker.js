import { build, files, version } from '$service-worker';
import { registerRoute } from 'workbox-routing';
import { NetworkFirst, CacheFirst } from 'workbox-strategies';
// Create a unique cache name for this deployment
const CACHE = `cache-${version}`;

const ASSETS = [
	...build, // the app itself
	...files // everything in `static`
];

self.addEventListener('install', (event) => {
	// Create a new cache and add all files to it
	async function addFilesToCache() {
		const cache = await caches.open(CACHE);
		await cache.addAll(ASSETS);
	}

	event.waitUntil(addFilesToCache());
});

self.addEventListener('activate', (event) => {
	// Remove previous cached data from disk
	async function deleteOldCaches() {
		for (const key of await caches.keys()) {
			if (key !== CACHE) await caches.delete(key);
		}
	}

	event.waitUntil(deleteOldCaches());
});

registerRoute(
	({ request: { url } }) => ASSETS.includes(new URL(url).pathname),
	new CacheFirst({ cacheName: CACHE })
);

registerRoute(
	({ request: { destination } }) => ['image', 'document', 'font', 'style'].includes(destination),
	new NetworkFirst({ cacheName: CACHE })
);
