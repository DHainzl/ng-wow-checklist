# NgWowChecklist20

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 20.2.1.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.

## Set up test characters

```
this.localStorage.setItem('characters', JSON.stringify([
    { region: 'eu', realm: 'antonidas', name: 'hoazl', checklistId: 'bfa-alliance', overrides: {
        'reputation-championsofazeroth': { type: 'reputation', max: 7 },
        'reputation-orderofembers': { type: 'reputation', max: 7 },
        'reputation-proudmooreadmiralty': { type: 'reputation', max: 7 },
        'reputation-stormswake': { type: 'reputation', max: 7 },
        'reputation-tortollanseekers': { type: 'reputation', max: 7 },
        'reputation-wavebladeankoan': { type: 'reputation', max: 7 },
        'reputation-rustbolt': { type: 'reputation', max: 7 },
        'kultiran-cooking': { type: 'profession-secondary', enabled: true },
        'kultiran-fishing': { type: 'profession-secondary', enabled: true },
        'kultiran-archaeology': { type: 'profession-secondary', enabled: true },
    } },
    { region: 'eu', realm: 'antonidas', name: 'thórn', checklistId: 'bfa-alliance', overrides: {} },
    { region: 'eu', realm: 'antonidas', name: 'harenya', checklistId: 'bfa-alliance', overrides: {
        'reputation-rustbolt': { type: 'reputation', max: 7 },
    } },
    { region: 'eu', realm: 'antonidas', name: 'jamik', checklistId: 'bfa-alliance', overrides: {} },
    { region: 'eu', realm: 'antonidas', name: 'maerwen', checklistId: 'bfa-alliance', overrides: {} },
    { region: 'eu', realm: 'antonidas', name: 'bastrik', checklistId: 'bfa-alliance', overrides: {} },
    { region: 'eu', realm: 'antonidas', name: 'cerulia', checklistId: 'bfa-alliance', overrides: {} },
    { region: 'eu', realm: 'antonidas', name: 'jaspia', checklistId: 'bfa-alliance', overrides: {} },
    { region: 'eu', realm: 'blackrock', name: 'andesina', checklistId: 'bfa-horde', overrides: {} }
]));
```