FROM node:18-alpine AS build

WORKDIR /usr/src/app

COPY .yarn/ ./.yarn/
COPY package.json .yarnrc.yml nest-cli.json tsconfig.json ./

RUN yarn

COPY src ./src
COPY node_modules/ ./node_modules/

RUN yarn build && yarn workspaces focus --production

FROM node:18-alpine

WORKDIR /usr/src/app

COPY --from=build /usr/src/app/dist ./dist
COPY --from=build /usr/src/app/node_modules ./node_modules
COPY --from=build /usr/src/app/package.json ./package.json
COPY --from=build /usr/src/app/.yarn ./.yarn
COPY --from=build /usr/src/app/.yarnrc.yml ./.yarnrc.yml
COPY --from=build /usr/src/app/yarn.lock ./yarn.lock

EXPOSE 3000

CMD [ "yarn", "start:prod" ]