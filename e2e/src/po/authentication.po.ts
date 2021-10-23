import { browser, by, element } from "protractor";

export class LoginPage {
    private credentias = {
        username: "test",
        password: "test"
    }

    navigateTo() {
        return browser.get("/login");
    }

    logout() {
        return browser.get("/logout");
    }

    redirection() {
        return browser.get("/users/create");
    }

    fillCredentials(credentias: any = this.credentias) {
        element(by.css('[name="inputAccountId"]')).sendKeys(credentias.username);
        element(by.css('[name="inputPassword"]')).sendKeys(credentias.password);
        element(by.css('.btn-secondary')).click();
    }

    getPageTitleText() {
        return element(by.css("#pageHeading")).getText();
    }

    getErrorMessage() {
        return element(by.css("#bad")).getText();
    }

}