# Local SSL Certificates for Postgres (Dev)

PostgreSQL is configured with `ssl = on` in the local Docker Compose setup. Provide a self-signed certificate in this folder before starting the container.

## Expected Files

- [server.crt](server.crt)
- [server.key](server.key)

## Example (macOS)

1. Generate a self-signed cert and key:
   - `openssl req -x509 -newkey rsa:4096 -sha256 -days 365 -nodes -keyout server.key -out server.crt -subj "/CN=localhost"`
2. Restrict key permissions:
   - `chmod 600 server.key`

Keep these files local-only and do not commit them.
