# Imgur Gallery Downloader

<!-- TOC depthFrom:1 depthTo:6 withLinks:1 updateOnSave:1 orderedList:0 -->

 - [Imgur Gallery Downloader](#imgur-gallery-downloader)

  - [Intro](#intro)
  - [Install](#install)
  - [Usage](#usage)

<!-- /TOC --> ## Intro

This is a help package to download imgur albums.

The motivation to create this was because I wanted to download a bunch of wallpaper dumps with out manually downloading and unzipping a crap load.

You can download a single or multiple albums from imgur in the same time.

This uses the official imgur node js api implementation: [imgur.js](https://github.com/Imgur/imgur.js)

As of right now it will download each image sequentially. If it were to try to download them simultanousely either the imgur API would stop us or we run out of free ports on our computer. Also not very good for your internet bandwidth.

## Install

```
npm install --global git+https://github.com/aghosh93/imgur-gallery-downloader.git
```

## Usage

```shell
$ imgur-gallery-downloader <hashes...>
```
