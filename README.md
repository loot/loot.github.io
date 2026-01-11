loot.github.io
==============

This repository acts as the main LOOT team repository, and holds all the issues that aren't specific to the code or any one game. In addition to that, it also holds LOOT's static website.

The static website uses [Material Design Lite](https://www.getmdl.io/) components and the [js-yaml](https://github.com/nodeca/js-yaml), [Octokit.js](https://github.com/octokit/rest.js) and [j-toml](https://github.com/LongTengDao/j-toml) libraries, which are provided by Cloudflare and Skypack CDNs.

The website is generated using [Hugo](https://gohugo.io). The easiest way to build it is to:

1. Download a [prebuilt Hugo binary](https://github.com/gohugoio/hugo/releases/latest).
2. Add the binary to your `PATH`.
3. Run `hugo` from the root of this repository.

Hugo will create the generated site in the `public` folder.

To view the site locally, run `hugo server`, the site will then be accessible at <http://localhost:1313>.
