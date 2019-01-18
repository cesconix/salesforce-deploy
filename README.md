# Salesforce Deploy

> cartridges deploy made easy

[![build status](https://travis-ci.com/cesconix/salesforce-deploy.svg)](https://travis-ci.com/cesconix/salesforce-deploy) 
[![npm version](https://img.shields.io/npm/v/salesforce-deploy.svg)](https://www.npmjs.com/package/salesforce-deploy)
[![dependencies](https://img.shields.io/david/cesconix/salesforce-deploy.svg)](https://david-dm.org/cesconix/salesforce-deploy)
[![devDependencies](https://img.shields.io/david/dev/cesconix/salesforce-deploy.svg)](https://david-dm.org/cesconix/salesforce-deploy?type=dev)
[![vulnerabilities](https://snyk.io/test/github/cesconix/salesforce-deploy/badge.svg?targetFile=package.json)](https://snyk.io/test/github/cesconix/salesforce-deploy?targetFile=package.json)
[![coverage](https://coveralls.io/repos/github/cesconix/salesforce-deploy/badge.svg)](https://coveralls.io/github/cesconix/salesforce-deploy)
[![javascript style guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)
[![conventional commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-yellow.svg)](https://conventionalcommits.org)

Utility to deploy cartridges on a Salesforce Commerce Cloud instance.

## Installation

```bash
npm install salesforce-deploy
```

## Usage

```javascript
import deploy from 'salesforce-deploy'

deploy({
  hostname: "<sfcc-instance-hostname>",
  username: "<business-manager-username>",
  password: "<business-manager-password>",
  cartridges: [
    { source: "<cartridges-path>" },    
    { source: "<cartridges-path>", exclude: "<glob-pattern>" }
  ],
  codeVersion: "<code-version>",
  force: false
})
```

### Parameters

| Parameter      | Type            | Mandatory  | Default | Description                                                            |
| -------------- | :-------------: | :--------: | :-----: | ---------------------------------------------------------------------- |
| `hostname`     | String          | yes        |         | Hostname of the SFCC instance                                          |
| `username`     | String          | yes        |         | Business Manager username                                              |
| `password`     | String          | yes        |         | Business Manager password                                              |
| `cartridges`   | String, Array   | yes        |         | Local source paths where the script will look for cartridges to deploy |
| `codeVersion`  | String          | yes        |         | Name of the code version to deploy                                     |
| `force`        | Boolean         | no         | false   | Flag to remove existing code version before deploy                     |

### Returns

A `Promise` fulfilled with `true` if deploy process succeded, otherwise `false`.
 
### Example - Deploy cartridges from a single folder

```javascript
import deploy from 'salesforce-deploy'

let deployed

try {
  deployed = await deploy({
    hostname: "dev01-realm-customer.demandware.net",
    username: "bm_user",
    password: "bm_pass",
    cartridges: "./cartridges/project_1",
    codeVersion: "v1.0.0-rc.0"
  })
} catch (e) {
  deployed = false
}

console.log(deployed) // true for sure!
```
### Example - Deploy cartridges from multi folder

```javascript
import deploy from 'salesforce-deploy'

let deployed

try {
  deployed = await deploy({
    hostname: "dev01-realm-customer.demandware.net",
    username: "bm_user",
    password: "bm_pass",
    cartridges: [
      { source: "./cartridges/project_1" },    
      { source: "./cartridges/project_2", exclude: "**/{cart,checkout/**" } // `exclude` property value must be a glob pattern
    ],
    codeVersion: "v1.0.0-rc.0"
  })
} catch (e) {
  deployed = false
}

console.log(deployed) // true for sure!
```

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License

MIT. Copyright (C) 2018, 2019 [Francesco Pasqua](https://www.linkedin.com/in/cesconix).
