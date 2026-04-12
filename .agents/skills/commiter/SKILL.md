---
name: commiter
description: Commits changes to the repository
---

## Commit Conventions

All commit messages must follow the [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) specification.

### Message Format

```text
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

### Strict Rules

1.  **Title Limit**: The first line (title) must **never exceed 50 characters**.
2.  **Detailed Body**: Commits must include an **extensive description** of the changes. Explain the *why* and *how*, not just the *what*.
3.  **Types**:
    *   `feat`: A new feature
    *   `fix`: A bug fix
    *   `docs`: Documentation only changes
    *   `style`: Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)
    *   `refactor`: A code change that neither fixes a bug nor adds a feature
    *   `perf`: A code change that improves performance
    *   `test`: Adding missing tests or correcting existing tests
    *   `build`: Changes that affect the build system or external dependencies (example scopes: gulp, broccoli, npm)
    *   `ci`: Changes to our CI configuration files and scripts (example scopes: Travis, Circle, BrowserStack, SauceLabs)
    *   `chore`: Other changes that don't modify src or test files
    *   `revert`: Reverts a previous commit

### Example

```text
feat(auth): add social login support via Google

This commit implements the OAuth2 flow for Google authentication. 
It adds a new button to the login page that redirects the user 
to Google's authorization server. Upon success, the server 
receives a token which is then used to fetch the user's 
profile information and initiate a session in our system.

The following files were modified:
- login.html: added the Google sign-in button.
- auth.js: implemented the redirect and callback logic.
- session.js: updated to handle the new authentication source.
```

## Usage

1.  **Actualizar Changelog**: Antes de realizar el commit, invoca el skill `changelog-manager` para registrar los cambios y actualizar la versión en `CHANGELOG.md`. Asegúrate de preparar (*stage*) el archivo `CHANGELOG.md` modificado.
2.  **Commit**:

```bash
commiter <message>
```