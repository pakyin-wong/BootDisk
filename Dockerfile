FROM alvinlaw/egret as build-stage

WORKDIR /client
ADD . .

RUN mkdir libs/modules
RUN cd /egret-core-5.2.31/build/ && tar cf - egret eui assetsmanager dragonBones game tween promise | tar xvf - -C /client/libs/modules/

ARG ENVIRONMENT

RUN egret publish -version ${ENVIRONMENT}
ADD jslib bin-release/web/${ENVIRONMENT}/jslib
ADD config.json bin-release/web/${ENVIRONMENT}/config.json
ADD config.${ENVIRONMENT}.json bin-release/web/${ENVIRONMENT}/config.${ENVIRONMENT}.json
RUN sed -i "s/\"target\":.*/\"target\": \"${ENVIRONMENT}\",/g" bin-release/web/${ENVIRONMENT}/config.json

FROM pgpg/infra-nginx:latest as production

ARG ENVIRONMENT

COPY --from=build-stage  /client/bin-release/web/${ENVIRONMENT}/ /usr/share/nginx/html/

ENV NGINX_TEMPLATE=static-local \
    NGINX_PORT=80 \
    NGINX_STATIC_ROOT=/usr/share/nginx/html/

ENTRYPOINT ["/nginx/start.sh"]