
![Geo Party](src/static/img/gp-slogan.png)
## Developing

.env file

```bash
PUBLIC_GOOGLE_CLIENT_ID=
PUBLIC_YANDEX_API_KEY=
PUBLIC_SESSION_TTL=2592000

MONGO_URL=mongodb://mongo/geo
UPLOADCARE_KEY=
ITEMS_PAGE_SIZE=50
```

To start develop environment

```bash
docker-compose up
```

## Demo database

Minimal demo database dump you may find in `demo-db` folder. Dumps of required collections for MongoDB
