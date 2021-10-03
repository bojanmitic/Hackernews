# Hacker news React Frontend

React + Redux app with Material UI. 

## Getting started

Local development environment can be started with:

1. Clone this repo
2. Run `npm install`
3. Run `npm start`

## Configs and bundling

Webpack configurations can be found from the `webpack.*` files in the root of the project. There is a common config which is merged either with development config (local development) or with production config (other environments).

You can define environment related variables in the `config.json` file.

Babel is configured via the `.babelrc` file.

Typescript config and linter configs are in the `tsconfig.json` and `.eslint.js` files.

Test / production builds:

- Development: `npm run build:dev`
- QA: `npm run build:qa`
- Production: `npm run build:prod`

## Project structure

```
src
 ├── index.tsx                 -> Entry point of the app
 ├── declarations.d.ts         -> TS declarations
 ├─> app                       -> High level components & configs
 │   ├── App.tsx               -> Main component, renders Routes
 │   ├── rootReducer.ts        -> Reducers are combined here
 │   ├── Routes.tsx            -> Routes
 │   └── store.ts              -> Redux store configurations
 ├─> components                -> "Dumb" components
 │   └── Loader.tsx            -> Loader component 
 |   └── ErrorBoundary.tsx     -> Prevents app from crashing when error in lower level components occur
 |   └── CreatorDataCard.tsx   -> Displays creator information
 |   └── Search.tsx            -> Search input component
 |   └── SingleNewsCard.tsx    -> Card for displaying news information
 ├─> containers                -> Smart components, routes usually point to these
 │   └──BarChartContainer.tsx  -> Container for displaying bar chart of stories nad scores
 |   └──CreatorContainer.tsx   -> Container for fetching creators data and displaying creator's card with data
 |   └──NotFound.tsx           -> Shows not found if page doesn't exists
 |   └──StoriesContainer       -> Shows all stories in story card component, ability to filter and sort news
 ├─> ducks                     -> Ducks reducer bundles
 │   └──storyDuck.ts           -> Duck slice reducer for stories
 ├─> templates                 -> Templates, usually there is just one
 │   └── index.html            -> The template where the app is rendered
 └─> utils                     -> Utilities
     └── sorting.ts            -> Sorting functions