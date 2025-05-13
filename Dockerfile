FROM node:18-alpine as base

###################
# DEPS
###################

FROM base AS deps
WORKDIR /deps

COPY package.json package.lock* ./

RUN yarn install --force --frozen-lockfile && yarn cache clean --force

###################
# BUILD
###################

FROM base AS build
WORKDIR /build

ARG API_URL_ARG

ENV NODE_ENV production
ENV VITE_API_URL=$API_URL_ARG

COPY --from=deps /deps/node_modules ./node_modules
COPY . .

RUN yarn build

###################
# FINAL
###################

FROM node:18-alpine AS final
WORKDIR /final

ARG API_URL_ARG
ARG HTACCESS_USER_ARG
ARG HTACCESS_PASS_ARG

ENV VITE_API_URL=$API_URL_ARG

RUN apk update
RUN apk add nginx apache2-utils gettext

COPY --from=build /build/dist ./
COPY --from=build /build/nginx.conf /etc/nginx/nginx.conf.template

RUN htpasswd -bc /etc/nginx/.htpasswd $HTACCESS_USER_ARG $HTACCESS_PASS_ARG
RUN envsubst '${API_URL_ARG}' < /etc/nginx/nginx.conf.template > /etc/nginx/nginx.conf

CMD ["nginx", "-g", "daemon off;"]