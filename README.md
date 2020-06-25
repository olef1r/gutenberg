## 1 Local Development
- \$`npm install`
- Set ENV varbiables (see **2 ENV Variables**)
- \$`npm run db:create`
- \$`npm run db:migrate`
  (For Windows) change `db:migrate` script in package.json to this - `./node_modules/.bin/babel-node node_modules/sequelize-cli/lib/sequelize db:migrate`
- \$`Add path to dir epub in app.js file`
- \$`npm run dev`
- Application is running on `localhost:3000`

## 2 ENV Variables

Define ENV variables in `.env` file (create the file if it don't exist).

Required ENV variables:

- `DB_HOST=localhost`
- `DB_PASSWORD=''`
- `DB_USERNAME=postgres`
- `DB_PORT=5432`
- `PORT=3000`

## 3 Testing

- Run \$`npm test` to run tests (with coverage output).
- Run \$`npm run coverage` to generate a coverage report.

## 4 Code Styling / Linting

### 4.1 Editorconfig

Using editorconfig for automatic indentation.

### 4.2 ESLint

\$`npm run lint`

### 4.3 Prettier

\$`npm run prettier`
