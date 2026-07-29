# Security Policy

## Supported Versions

Backbit is currently in active development. Security fixes will be applied to the latest `main` branch and to the most recent released version once releases start.

## Reporting a Vulnerability

If you believe you found a security vulnerability in Backbit, please do **not** open a public issue.

Report it privately with the following details:

- A short description of the issue.
- The affected file, route, or component.
- Steps to reproduce.
- Expected vs actual behavior.
- Any proof of concept, screenshots, or logs.
- Potential impact.

Preferred contact:

- Email: `nalbertschwank@gmail.com`
- If that address is not available yet, use the maintainer contact listed in the repository profile or README.

## What to include

Please include enough information to reproduce the issue safely:

- Full request/response details if it affects the API.
- Relevant routes, payloads, or headers.
- API keys, tokens, or environment variables should **never** be shared in public.
- If the issue involves RAWG integration, only report the endpoint and data flow — never expose your own credentials.

## Disclosure Process

After a report is received:

1. We acknowledge receipt.
2. We validate the issue.
3. We assess impact and scope.
4. We prepare a fix.
5. We release the fix and credit the reporter if they want attribution.

## Security Notes

Backbit is expected to follow these baseline rules:

- Keep RAWG API keys server-side only.
- Never commit secrets to the repository.
- Use environment variables for credentials.
- Validate all incoming API input.
- Apply authentication and authorization checks to user-owned data.
- Prefer least-privilege access for database and deployment credentials.

## Scope

This policy applies to the Backbit repository and its official services only.
