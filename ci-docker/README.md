# I. Working with Docker

Why?

- Reproducible (==fixed) environment
- Test multiple software versions concurrently (Chrome v10{2,3} and Firefox)
- Stuck on a corporate laptop as a non-admin user

## I.1 Easy Peasy wdi5 Docker Image:

wdi5 Docker images can be found
[here](https://github.com/ui5-community/wdi5/pkgs/container/wdi5). These image
uses the most up-to-date Google Chrome.

```
# download and build the docker image
docker pull ghcr.io/ui5-community/wdi5:0.9.9-node17

# map your files into /app and run the container
docker run \
    -v "$(realpath ui5.yaml)":/app/ui5.yaml \
    -v "$(realpath wdio.conf.js)":/app/wdio.conf.js \
    -v "$(realpath webapp)":/app/webapp \
    ghcr.io/ui5-community/wdi5:0.9.9-node17
```

## I.2 Using a Custom Dockerfile

See *Dockerfile* for a basic template.

```
# build and run
docker build -t wdi5-ci-docker .
docker run wdi5-ci-docker
```

### I.2.1 Notes on Docker Base Images for Browser Testing

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

# II. CI/CD via Github Actions

Simply use the Docker commands inside your pipeline. See *.github/workflows* in
the root of this repository for a simple example.

# III. Advanced Topics

## III.1 Docker with X-Forwarding

If you would like to view your browser (or any graphical application, for that
matter) running inside the docker container, you need to set up certain things.
This setup is not specific to wdi5 or browsers and is, unfortunately, platform
specific.

The following paragraphs provide the basic set up required to display graphical
applications run inside docker on the host machine.

Idea: Parameterize *--headless* via a environment variable. See *wdio.conf.js*.

### III.1.1 macOS

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

### III.1.2 Linux X11

- Install docker
- Disable X11 authorization `xhost +`
- Run container `docker run -e DISPLAY -v /tmp/.X11-unix:/tmp/.X11-unix:rw container_name`

### III.1.3 WSLg

- Install docker for Windows and its WSL integration
- Run container `docker run -e DISPLAY -v /tmp/.X11-unix:/tmp/.X11-unix:rw
  container_name`

TODO: Check whether this works

### III.1.4 WSL / WSL2

TODO

### III.1.5 Linux Wayland

TODO

### III.1.6 Windows Native

TODO


## III.2 Debugging wdi5 Tests Inside a Docker Container

We use the envvar *NODE_OPTIONS* to propagate startup options to node
processes. This allows us to set startup options for any `node ...` command
down the chain of executed commands where it's impossible to do so manually, as
it is in our case, since we're not calling `node ...` directly, but are using
the `wdio` cli instead.

```
# build the container if necessary
docker build -t wdi5-ci-docker .

# run the container, passing the correct debugging options and forwarding the port
docker run -e NODE_OPTIONS=--inspect-brk=0.0.0.0:9229 -p 9229:9229 wdi5-ci-docker
```

BUG: Unfortunately, debugging a containerized wdio node process does not work
     in vscode. Attaching to the node process succeeds, but continuing the
     process will crash due to the following error:

     Error: Cannot find module '<basepath to you vscode installation>/ms-vscode.js-debug/src/bootloader.bundle.js
