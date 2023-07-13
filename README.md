<div align="center">
     <img src="https://github.com/switchfeat-com/switchfeat/assets/905984/bed8cfa8-0242-4156-b6e5-80240ae400fe" width=100 />
</div>
<div align="center">
    <h1 align="center">SwitchFeat</h1>
     <div><small><b>Open source feature flags and A/B testing service</b></small></small></div>
     <br/>
    <div>Minimize deployment risks and speed-up your features development.</div> 
</div> 
<br/>
<div align="center">
      <img src="https://img.shields.io/badge/PR-welcome-brightgreen.svg?style=flat" alt="PR welcome on @apitrakr/cli" />
</div>
<br/>
 <img src="https://github.com/switchfeat-com/switchfeat/assets/905984/3e0bbfe1-72f8-4cdc-95e9-3002d9058789" width=1000 />



<br/>

## What is SwitchFeat
SwitchFeat is an open-source, self-hosted platform that makes it very easy to manage your feature flags and run A/B tests straight from your infrastructure.
No external servers involved, no latency in sending flags data over the internet.<b> Your data stays within your network.</b>

Just wrap your logic around a feature flag and use SwitchFeat API to toggle that code on or off, based on multiple conditions and user segments.

## Getting started

The easiest way to start using SwitchFeat is using the Docker image.

You can either clone the repo and generate the image yourself using our [docker-compose.yml](https://github.com/switchfeat-com/switchfeat/blob/main/docker-compose.yaml) file, like this: 

```
git clone https://github.com/switchfeat-com/switchfeat.git
cd switchfeat
docker-compose up -d
```

Or you can just download the premade image from the official Github Registry like this:

```
docker run --name switchfeat-com -d -p 4000:4000 ghcr.io/switchfeat-com/switchfeat:main
```

Once done, SwitchFeat will be available at http://localhost:4000 


## Building the project

The SwitchFeat project has been configured using Lerna framework which allows to manage multiple projects in the same repo (monorepo).

To build the project use the following command in the root folder of the project:

```
npm run build
```

To start both the server and the ui, simply run: 
```
npm run start
```

SwitchFeat will be available at http://localhost:4000 

## Running frontend and backend separately

For convenience during the development phase, the [package.json](https://github.com/switchfeat-com/switchfeat/blob/main/package.json) file esposes two additional scripts which allow to run the server and the UI on separate ports. 
This simplifies working on the frontend, where the UI can be updated without running a full build on both projects on every change.

The following command will run the UI process on http://localhost:3000
```
npm run dev:start-ui
```

The following command will run the Server process on http://localhost:4000
```
npm run dev:start-api
```


## Contributions

Either it be a bug fix, an update to our documentation, a feature request, contributions are extremely welcome!

Look at the [public roadmap](https://github.com/orgs/switchfeat-com/projects/1) to see what's coming and where you can help.
