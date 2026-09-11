# Submissions API

This directory showcases a Rust application built with the Rocket API framework.
Here we've setup a basic API which is compiled into a binary executable unlike the other TypeScript based Assignments API.
Compiled applications are great candidates for containerization just like their interpreted relatives.
Rust provides some key benefits like type safety and memory management being an integral part of the language.
While Rust can pose a bit of a learning curve, it's a great option for compiled, low-level software development, even for web applications.

This API simply accepts POST requests to `/submit/<id>` which simulates submission processing and returns a randomized result.
A complete application could benefit from Rust's performance and low-level features here to fully test a user's submission.

## Docker Build

This directory also showcases a two-stage Docker build which is helpful for compiled applications.
Our Dockerfile is broken up like so:

1. Use a public Rust Image
   1. Copy source code
   2. Install dependencies
   3. Build the binary executable
2. Use a slim Debian Image
   1. Copy the built binary file from the first stage
   2. Register the binary as the startup command

Using this approach our final Docker Image contains only our application binary and none of the dependencies or source code required to build it.
The resulting image (and container) can be much smaller since only the final executable is kept.
