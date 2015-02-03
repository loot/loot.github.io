loot.github.io
==============

This repository acts as the main LOOT team repository, and holds all the issues and wiki pages that aren't specific to the code or any one game. In addition to that, it also holds LOOT's static website.

The static website uses [Polymer](https://www.polymer-project.org/) to provide many of its elements, and is built using [Jekyll](http://jekyllrb.com/) and [Vulcanize](https://github.com/Polymer/vulcanize). The Polymer dependencies are managed using [Bower](http://bower.io/).

Jekyll doesn't need to be run manually, as GitHub do that when the repository is pushed. To install Vulcanize and Bower, first install [Node](http://nodejs.org/), then run:

```
npm install -g bower vulcanize
```

from the Node command prompt. The Polymer dependencies can be installed by running:

```
bower install ./
```

Vulcanize must be run manually whenever the Polymer dependencies are updated or `polymer-loader.html` is changed. The command to do so is:

```
vulcanize ./polymer-loader.html --abspath ./ --inline --strip -o ./polymer-loader.vulcanized.html
```
