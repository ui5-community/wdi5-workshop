FROM node:17-bullseye-slim

# Basic system setup. For instructions on how to install a specific chrome
# version see https://unix.stackexchange.com/a/590412. Make certain that the
# package.json's chromedriver major version matches that of chrome.
ARG CHROME_VERSION="103.0.5060.114-1"
RUN apt update
RUN apt install -yq wget npm nodejs
RUN wget --no-verbose -O /tmp/chrome.deb https://dl.google.com/linux/chrome/deb/pool/main/g/google-chrome-stable/google-chrome-stable_${CHROME_VERSION}_amd64.deb \
        && apt install -yq /tmp/chrome.deb \
        && rm /tmp/chrome.deb

# HACK: Installing procps enables 'run-p -r ..' to work properly. Without it
#       the -r / --race flag to 'run-p' isn't functional and running processes
#       are not terminated after the first one is to finish. I have no clue
#       why this helps.
#
#       This hack only "solves" the problem of the stuck webserver spawned by
#       'ui5 serve', which is supposed to terminate after the tests have
#       finished. In general, 'run-p -r ..' is still affected by
#       https://github.com/mysticatea/npm-run-all/issues/237
RUN apt install -yq procps

# Copy files into /app directory
WORKDIR /app
COPY webapp/ webapp/
COPY package.json package.json
COPY ui5.yaml ui5.yaml
COPY wdio.conf.js wdio.conf.js

RUN npm install
CMD npm run test

# HACK: Chrome may fail to launch headful inside a docker container.
#       Installing `firefox-esr` seems to install missing dependencies, fixing
#       the issue.
