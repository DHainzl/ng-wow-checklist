# NgWowChecklist

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.2.0.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

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