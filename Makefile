run:
	docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d --build

logs:
	docker-compose -f docker-compose.yml -f docker-compose.prod.yml logs -f $(SERVICES)

down:
	docker-compose -f docker-compose.yml -f docker-compose.prod.yml down

run-dev:
	docker-compose up -d --force-recreate --renew-anon-volumes --remove-orphans

logs-dev:
	docker-compose logs -f $(SERVICES)

down-dev:
	docker-compose down

run-client-standalone:
	cd client/ && yarn start
