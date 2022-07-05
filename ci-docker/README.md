
# Notes on Docker Base Images for Browsertests

- Alpine is unsuited to run Chrome or Chromium (and their respective webdrivers) as the browsers come build for glibc, whereas Alpine uses musl. The compatibility package `gcompat` attempts to bridge the delta, but it appears to not solve all problems.
- Ubuntu is terminally stupid and does not offer chrome or chromium as a regular binary but uses snaps instead. Those require their own runtime and are thus unfit for Docker containers.
- Stable Debian's Chromium version is v99.x. The current release of Chrome is v103.
