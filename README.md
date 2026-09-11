# Container Orchestration Example <!-- omit in toc -->

This repository serves as a very basic example of a containerized multi-application and multi-technology deployment using Docker Compose.
The setup provided in this repository is purely for demonstration purposes and is in no way reflective of a secure and stable production deployment.
The goal here is to show that producing a working proof of concept for this type of deployment is simple and does not require anything more than a regular computer with Docker installed.

> No AI was used in the creation of this repository.
> This code is *by humans, for humans*.

- [Get Started](#get-started)
- [Feature Demonstrations](#feature-demonstrations)
  - [Containerization](#containerization)
  - [Web Application](#web-application)
  - [Deployment Auto-Scaling](#deployment-auto-scaling)

## Get Started

> Make sure to have Docker installed through either [Docker Desktop (GUI)](https://docs.docker.com/desktop/) or [Docker Engine (CLI)](https://docs.docker.com/engine/)

To get started, clone the repository and then simply run `docker compose up`.
Docker will then build all of the Images using each of their Dockerfiles, then start all the Containers when its finished.
Once everything is running, you can view the Web UI by browsing to `http://localhost:4000`.

## Feature Demonstrations

Below are all of the features of a normal container deployment that I tried to showcase in this repository.
These examples are not a complete picture of what is needed for a full deployment, but should give a basic introduction on the topic.

### Containerization

[Containerization](https://en.wikipedia.org/wiki/Containerization) of applications is a critical step in the modern application deployment process.
This repository showcases multiple technologies and application types can be containerized effectively.

Here we've demonstrated two languages with two distinct purposes:

> I've intentionally not included TypeScript in the count of languages since it is an extension of JavaScript.
> That being said, there are enough fundamental differences that it could be considered separate.

- [JavaScript](https://en.wikipedia.org/wiki/JavaScript)
  - API
  - Interpreted
- [Rust](https://www.rust-lang.org/)
  - API
  - Compiled
- [TypeScript](https://www.typescriptlang.org/)
  - Web Application
  - Transpiled & Interpreted

> We also have a sidecar container that is not created in this repository, but does play a crucial role in the deployment.
> Alongside our other applications, we have an instance of [MongoDB](https://www.mongodb.com/) running in a container as well.

### Web Application

The web application included in the [web-ui](./web-ui/) directory is a [React](https://react.dev/) Web App created with [React Router](https://reactrouter.com/) and [Vite](https://vite.dev/).
It uses modern web technologies to build a modular and reactive User Interface.
It demonstrates using React's fundamental feature component composition to construct a dynamic web page with data sourced from an API.

This codebase is also written in TypeScript which allows developers an extra layer of customization on top of base JavaScript code to implement features such as type safety.
We utilize this feature when creating our Components by first defining an Interface which in other languages would be a Struct, Class, or Type, definition.
Using the Interface we're able to ensure the data our custom Component is receiving matches the correct structure just like any other typed language would.

### Deployment Auto-Scaling

These applications are all small enough that scaling each service is simple since they have little to no dependencies.
Included in the [Docker Compose file](./compose.yaml) is a comment about how to utilize the Docker Compose `deploy` key to enable replicas.
Since Docker Compose doesn't include a reverse proxy service when using this mode, it's up to us to create one.
A great way to do that would be to include an [Nginx](http://nginx.org/) container alongside our other services.
This container would handle all of the incoming traffic for our services and route it to the right one, accounting for extra replicas as well.

Nginx has an example on their website for how to setup a Reverse Proxy which you can [read more on here](https://docs.nginx.com/nginx/admin-guide/web-server/reverse-proxy/).
