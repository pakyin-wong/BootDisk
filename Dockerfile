FROM alvinlaw/egret as build-stage

WORKDIR /client
ADD . .

RUN mkdir libs/modules
RUN cd /egret-core-5.2.31/build/ && tar cf - egret eui assetsmanager dragonBones game tween promise | tar xvf - -C /client/libs/modules/

ARG ENVIRONMENT

RUN egret publish -version ${ENVIRONMENT}
ADD jslib bin-release/web/${ENVIRONMENT}/jslib
ADD config.json bin-release/web/${ENVIRONMENT}/config.json
ADD style.css bin-release/web/${ENVIRONMENT}/style.css
ADD swipeup.png bin-release/web/${ENVIRONMENT}/swipeup.png
ADD config.${ENVIRONMENT}.json bin-release/web/${ENVIRONMENT}/config.${ENVIRONMENT}.json
RUN cp bin-release/web/${ENVIRONMENT}/resource/desktop.res.json bin-release/web/${ENVIRONMENT}/resource/mobile.res.json
RUN sed -i "s/\"target\":.*/\"target\": \"${ENVIRONMENT}\",/g" bin-release/web/${ENVIRONMENT}/config.json
RUN sed -i "s/zip\/d/zip\/m/g" bin-release/web/${ENVIRONMENT}/resource/mobile.res.json

RUN npm install -g jszip-cli --unsafe-perm
RUN jszip-cli add bin-release/web/${ENVIRONMENT}/js > bin-release/web/${ENVIRONMENT}/js.zip
RUN for i in $(ls bin-release/web/${ENVIRONMENT}/js | grep -v jszip); do rm "bin-release/web/${ENVIRONMENT}/js/$i"; done;

FROM pgpg/infra-nginx:latest as production

ARG ENVIRONMENT

COPY --from=build-stage  /client/bin-release/web/${ENVIRONMENT}/ /usr/share/nginx/html/

ENV NGINX_TEMPLATE=static-local \
    NGINX_PORT=80 \
    NGINX_STATIC_ROOT=/usr/share/nginx/html/

ENTRYPOINT ["/nginx/start.sh"]