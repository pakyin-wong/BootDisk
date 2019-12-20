FROM alvinlaw/egret as build-stage

WORKDIR /client
ADD . .

RUN mkdir libs/modules
RUN cd /egret-core-5.2.31/build/ && tar cf - egret eui assetsmanager dragonBones game tween promise | tar xvf - -C /client/libs/modules/

RUN egret publish -version staging
ADD config.json bin-release/web/staging/config.json
ADD config.staging.json bin-release/web/staging/config.staging.json
RUN sed -i "s/\"target\":.*/\"target\": \"staging\",/g" bin-release/web/staging/config.json

FROM nginx:alpine as production

COPY nginx-conf/default.conf /etc/nginx/conf.d/
COPY nginx-conf/nginx.conf /etc/nginx/
COPY --from=build-stage  /client/bin-release/web/staging/ /usr/share/nginx/html/


