FROM alvinlaw/egret:5.3.10 as build-stage

WORKDIR /client
ADD . .

RUN mkdir libs/modules
RUN cd /egret-core-5.3.10/build/ && tar cf - egret eui assetsmanager dragonBones game tween promise | tar xvf - -C /client/libs/modules/

ARG ENVIRONMENT

RUN egret publish -version ${ENVIRONMENT}
RUN mkdir bin-release/web/${ENVIRONMENT}/static
ADD jslib bin-release/web/${ENVIRONMENT}/static/jslib
ADD config.json bin-release/web/${ENVIRONMENT}/static/config.json
ADD style.css bin-release/web/${ENVIRONMENT}/static/style.css
ADD swipeup.png bin-release/web/${ENVIRONMENT}/static/swipeup.png
ADD config.${ENVIRONMENT}.json bin-release/web/${ENVIRONMENT}/static/config.${ENVIRONMENT}.json
RUN sed -i "s/\"target\":.*/\"target\": \"${ENVIRONMENT}\",/g" bin-release/web/${ENVIRONMENT}/static/config.json
RUN sed -i "s/js\.zip/js\.zip?v=$(date +%s)/g" bin-release/web/${ENVIRONMENT}/index.html
RUN if [ "${ENVIRONMENT}" = "development" ] || [ "${ENVIRONMENT}" = "staging" ]; then sed -i "s/\data-show-fps=\"false\"/data-show-fps=\"true\"/g" bin-release/web/${ENVIRONMENT}/index.html; fi

# RUN apt-get install -y zip
RUN zip -r bin-release/web/${ENVIRONMENT}/static/js.zip bin-release/web/${ENVIRONMENT}/js
RUN rm -r bin-release/web/${ENVIRONMENT}/resource/assets/images
RUN for i in $(ls $target/js | grep -v jszip); do rm "$target/js/$i"; done;

# RUN mv bin-release/web/${ENVIRONMENT}/js bin-release/web/${ENVIRONMENT}/static
RUN cp -R bin-release/web/${ENVIRONMENT}/js bin-release/web/${ENVIRONMENT}/static
# RUN mv bin-release/web/${ENVIRONMENT}/resource bin-release/web/${ENVIRONMENT}/static
RUN cp -R bin-release/web/${ENVIRONMENT}/resource bin-release/web/${ENVIRONMENT}/static
RUN mv bin-release/web/${ENVIRONMENT}/manifest.json bin-release/web/${ENVIRONMENT}/static


FROM pgpg/infra-nginx:latest as production

ARG ENVIRONMENT

COPY --from=build-stage  /client/bin-release/web/${ENVIRONMENT}/ /usr/share/nginx/html/

ENV NGINX_TEMPLATE=static-local \
    NGINX_PORT=80 \
    NGINX_STATIC_ROOT=/usr/share/nginx/html/

ENTRYPOINT ["/nginx/start.sh"]