
# Working with Docker

## Easy Peasy wdi5 Docker Image:

- TODO: Fix Docker Image
- TODO: Check whether we can package.json aswell

The wdi5 Docker image uses the most up-to-date Google Chrome.

```
 download and build the docker image
docker pull docker pull ghcr.io/js-soft/wdi5:0.9.9-node17

 map your files into /app and run the container
docker run -v "$(realpath ui5.yaml)":/app/ui5.yaml \
    -v "$(realpath wdio.conf.js)":/app/wdio.conf.js \
    -v "$(realpath webapp)":/app/webapp \
    ghcr.io/js-soft/wdi5:0.9.9-node17
```

## Using a Custom Dockerfile

See *Dockerfile* for a basic template.

```
build and run
docker build -t wdi5-ci-docker .
docker run wdi5-ci-docker
```

### Notes on Docker Base Images for Browser Testing

- Alpine is unsuited to run Chrome or Chromium (and the respective webdrivers)
  as the browsers come build for glibc, whereas Alpine uses musl. The
  compatibility package `gcompat` attempts to bridge this delta, but it appears
  to not solve all problems.
- Ubuntu is terminally stupid and does not offer chrome or chromium as a
  regular binary but uses snaps instead. Those require their own runtime and
  are thus unfit for Docker containers.
- Stable Debian's Chromium version is ancient v99.x. The current release of
  Chrome is v103.

For wdi5 we use an Ubuntu base image and download Google Chrome manually. See
the *Dockerfile* for instructions.

# CI/CD via Github Actions

Simply use the Docker commands inside your pipeline. See *.github/workflows* in
the root of this repository for a simple example.

# Advanced Topics

## Docker with X-Forwarding

### Linux X11

- Install docker
- Disable X11 authorization `xhost +`
- Run container `docker run -e DISPLAY -v /tmp/.X11-unix:/tmp/.X11-unix:rw container_name`

### macOS

- Install docker `brew install --cask docker`
- Install and configure the X11 Server XQuartz
  - `brew install --cask XQuartz`
  - `open -a xquartz` and configure XQuartz to _Authenticate connections_ and
    _Allow connections from network clients_
  - Log out and log back in
- Start XQuartz `open -a xquartz`
- Disable X11 authoriziation `xhost +`
- Run container `docker run -e DISPLAY=docker.for.mac.host.internal:0
  container_name`

### WSLg

- Install docker for Windows and its WSL integration
- Run container `docker run -e DISPLAY -v /tmp/.X11-unix:/tmp/.X11-unix:rw
  container_name`

### WSL / WSL2

TODO

## Linux Wayland

TODO

### Windows Native

TODO


## Debugging wdi5 Tests Inside a Docker Container

We use the envvar *NODE_OPTIONS* to propagate startup options to node
processes. This allows us to set startup options for any `node ...` command
down the chain of executed commands where it's impossible to do so manually, as
it is in our case, since we're not calling `node ...` directly, but are using
the `wdio` cli instead.

- sudo docker run -e NODE_OPTIONS=--inspect-brk=0.0.0.0:9229 -p 9229:9229 -v "$(realpath webapp)":/app/webapp wdi5-ci-docker
    - TODO: TIMOOO HALP

