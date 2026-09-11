# React Web UI

This directory contains all of the source code for the Web UI.
We've started with a base created by the React Router Vite template which adds lots of helpful boilerplate files for us.
We've removed a lot of the original setup since for this example, most of it was not needed.

## The Root

This application sets up a main `root.tsx`, a React TypeScript that defines how our generated HTML base will be created.
It also initializes our Page routing as well by creating a basic configuration.

## Routes

This application only defined one route, the homepage, but more could easily be added inside of `routes.ts`.
This file tells React Router which Component to render when a user navigates to a specific endpoint.
Here we've let React Router know that we'll use the configuration from `routes/home.tsx` as our `/` index route.

## Components

We've created a custom `AssignmentCard` component that renders data collected from the Assignments API.
This component is reusable and is what allows us to create the list of Assignments on the homepage.
It takes in a specific data structure and renders it into a template, including making customized function that call the Submission API with information from the Assignment.

## Types

Since we're using TypeScript, we've created type definitions for the Assignment and Submission Results that are returned from the APIs.
Using these types, we can make sure the data we're getting back from the API matches the structure that we're expecting.
It's also helpful when creating components as we're able to quickly specify what data a Component is expecting to receive as its properties.

## React Router Readme

Also check out the [generated README](./REACT_ROUTER_README.md) made by the React Router Vite template.
You can see how to build the application or run it in development mode here.
