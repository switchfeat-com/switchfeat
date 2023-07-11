<div align="center">
     <img src="https://github.com/switchfeat-com/switchfeat/assets/905984/bed8cfa8-0242-4156-b6e5-80240ae400fe" width=100 />
</div>
<div align="center">
    <h1 align="center">SwitchFeat</h1>
    <h5>Feature flags and A/B testing framework</h5>
</div> 
<br/>

<div align="center">
      <img src="https://img.shields.io/badge/PR-welcome-brightgreen.svg?style=flat" alt="PR welcome on @apitrakr/cli" />
  
</div>

<br/>

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

To start the project, simple run: 
```
npm run start
```

Then again, once done, SwitchFeat will be available at http://localhost:4000 

## Contributions

Either it be a bug fix, an update to our documentation, a feature request, contributions are extremely welcome!

Look at the [public roadmap](https://github.com/switchfeat-com/switchfeat/projects/1) to see what's coming and where you can help.
