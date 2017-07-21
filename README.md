# fed-x-xerver

mock server
## Installation

```
$ npm install -g fed-x-server
```
## Quick Start

```
# create project folder and get into the folder
$ mkdir fed-app && cd fed-app

# initial the project folder
$ fedx init

# start

$ fedx
```

## Routes

## Configuration

You can custom your configuration in `fedx-config.js` file.

```js
defaultConfig = {
    basePath: path.resolve(__dirname, './example'),
    publicFolder: 'public',
    viewFolder: 'views',
    mockFolder: 'mocks',
    routeFile: 'routes.js',
    port: 3000
}
```
## Lisence

This project is licensed under the terms of the MIT license.
