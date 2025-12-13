# Setup

## Prerequisites

### Git

- [Download](https://git-scm.com/downloads)
- Used to clone this code repository

### Code Editor (choose one)

Install a code editor for development.

- [Visual Studio Code](https://code.visualstudio.com/download)
- You can also use a different code editor if you prefer (e.g. Cursor or Windsurf for more AI integration)

### Server Runtime (choose one)

Install a runtime to run the file server.

- [Deno (recommended)](https://deno.com/)
- [Node.js](https://nodejs.org/en/download)
- You can also use a different runtime if you prefer.

## Installation

1. Clone the code repository from GitHub:
   ```sh
   git clone https://github.com/lionel-rowe/flappy-christmas.git
   cd flappy-christmas
   ```

2. Start the file server:

   **With Deno:**
   ```sh
   deno task start
   ```

   **With Node.js:**
   ```sh
   npx http-server -p 49363
   ```

3. Open your browser and navigate to `http://localhost:49363` (or the URL shown in your terminal)
