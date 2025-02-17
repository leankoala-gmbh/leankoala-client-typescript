.PHONY: help
help: ## Shows this help
	@awk 'BEGIN {FS = ":.*?## "} /^[a-zA-Z_\-\.]+:.*?## / {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}' $(MAKEFILE_LIST)

.PHONY: docker-build
docker-build: ## Build node Docker image
	docker build -t node-leankoala-client-typescript -f .docker/node/Dockerfile .

.PHONY: node-build
node-build: ## Run npm ci in node container
	docker run --rm -v $(PWD):/app node-leankoala-client-typescript npm ci

.PHONY: node-test
node-test: ## Run tests in node container
	docker run --rm -v $(PWD):/app node-leankoala-client-typescript npm run test
