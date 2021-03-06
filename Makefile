include .makefile-lib/common.mk

.PHONY: help dependencies

dependencies: check-dependencies ## Check dependencies

##########################################################################################
# dev
##########################################################################################
login: ## Build all containers
	@$(DOCKER) login --username=$(DOCKERHUB_LOGIN) --password=$(DOCKERHUB_PWD) $(c)

build: ## Build all containers
	@$(DOCKER) login --username=$(DOCKERHUB_LOGIN) --password=$(DOCKERHUB_PWD) $(c)
	@$(DOCKER_COMPOSE) -f $(DOCKER_COMPOSE_FILE) build $(c)

start: ## start of containers
	@$(DOCKER) login --username=${DOCKERHUB_LOGIN} --password=${DOCKERHUB_PWD} $(c)
	@$(DOCKER_COMPOSE) -f $(DOCKER_COMPOSE_FILE) up -d --build --force-recreate $(c)

debug: ## Debug all containers
	@$(DOCKER_COMPOSE) -f $(DOCKER_COMPOSE_FILE) up --build --force-recreate $(c)

stop: ## Stop all containers
	@$(DOCKER_COMPOSE) -f $(DOCKER_COMPOSE_FILE) stop $(c)

rm: ## Delete all containers
	@$(DOCKER_COMPOSE) -f $(DOCKER_COMPOSE_FILE) rm $(c)

ps: ## Show status of containers
	@$(DOCKER_COMPOSE) -f $(DOCKER_COMPOSE_FILE) ps

ssh: ## Connect to app container
	@$(DOCKER) exec -u dev -it $(APP_CONTAINER_NAME) $(SH)

fixperm: ## Connect to app container
	@$(DOCKER) exec -u 0 -t $(APP_CONTAINER_NAME) chmod -Rf 777 /var/www/* $(c)
	@$(DOCKER) exec -u 0 -t $(APP_CONTAINER_NAME) chown -Rf dev:www-data /var/www/* $(c)

root: ## Connect to app container
	@$(DOCKER) exec -u 0 -it $(APP_CONTAINER_NAME) $(SH)

##########################################################################################
# C/I
##########################################################################################
*deploy: ## update server
	@$(DOCKER) login --username=${DOCKERHUB_LOGIN} --password=${DOCKERHUB_PWD} $(c)
	@$(DOCKER_COMPOSE) -f $(DOCKER_COMPOSE_FILE) stop $(c)
	@$(DOCKER_COMPOSE) -f $(DOCKER_COMPOSE_FILE) rm -f $(c)
	@$(DOCKER_COMPOSE) -f $(DOCKER_COMPOSE_FILE) up -d --build --force-recreate $(c)

ci: ## update server
	@$(DOCKER) login --username=${DOCKERHUB_LOGIN} --password=${DOCKERHUB_PWD} $(c)
	@$(DOCKER_COMPOSE) -f $(DOCKER_COMPOSE_FILE) stop $(c)
	@$(DOCKER_COMPOSE) -f $(DOCKER_COMPOSE_FILE) rm -f $(c)
	@$(DOCKER_COMPOSE) -f $(DOCKER_COMPOSE_FILE) up -d --build --force-recreate $(c)
