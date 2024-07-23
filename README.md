# README

To run this repository, you will need a GitHub token.

## Getting a GitHub Token

1. Go to the [GitHub settings page](https://github.com/settings/tokens).
2. Click on "Generate new token".
3. Give your token a descriptive name and select the desired scopes.
4. Click on "Generate token".
5. Copy the generated token.

## Using the GitHub Token

1. Clone this repository to your local machine.
2. Create a file named `.env` in the root directory of the repository.
3. Add the following line to the `.env` file:
   ```
   TOKEN=<your-github-token>
   ```
   Replace `<your-github-token>` with the token you generated earlier.
4. Save the `.env` file.
5. Run the command

```bash
npm install
npm start
```

Please ensure that you keep your GitHub token secure and do not share it with anyone.
