TAG = "registry-dev.gstou.ru/graduate-resume-front"

all: buildx push
buildx:
	docker buildx build -t $(TAG) .
push:
	docker push $(TAG)