import { browser, by, element } from 'protractor';

export class AppPage {
    // tslint:disable-next-line:no-any
    navigateTo(): Promise<any> {
        // tslint:disable-next-line:no-any
        return browser.get(browser.baseUrl) as Promise<any>;
    }

    getTitleText(): Promise<string> {
        return element(by.css('app-root h1')).getText() as Promise<string>;
    }
}
