import { browser, by, element } from "protractor";

export class forms_users_create {
    private details = {
        inputEmail: "E2E@Testing",
        inputUsername: "e2e",
        inputPassword: "123",
    }

    fillCredentials(credentias: any = this.details) {
        element(by.css('[name="inputEmail"]')).sendKeys(credentias.inputEmail);
        element(by.css('[name="inputUsername"]')).sendKeys(credentias.inputUsername);
        element(by.css('[name="inputPassword"]')).sendKeys(credentias.inputPassword);
        element(by.css('.btn-secondary')).click();
    }

    getSuccessMessage() {
        return element(by.css("#good")).getText();
    }

    getErrorMessage() {
        return element(by.css("#bad")).getText();
    }
}