FROM rust:slim-trixie AS builder

# Set the working directory
WORKDIR /app

# Copy the project files into the container
COPY Cargo.toml Cargo.lock ./
COPY src ./src

# Build the project in release mode
RUN cargo build --release

# Use a minimal Debian image to run our API
FROM debian:trixie-slim

# Set the working directory in the final image
WORKDIR /app

# Copy the built binary from the builder stage
COPY --from=builder /app/target/release/submission-api .

# Make the binary executable
RUN chmod +x submission-api

# Expose the application port
EXPOSE 8000

CMD ["./submission-api"]
