import { browser, by, element } from "protractor";

export class forms_groups_create {
    private details = {
        name: "test",
        description: "test"
    }

    fillCredentials(credentias: any = this.details) {
        element(by.css('[name="name"]')).sendKeys(credentias.name);
        element(by.css('[name="description"]')).sendKeys(credentias.description);
        element(by.css('.btn-secondary')).click();
    }

    getSuccessMessage() {
        return element(by.css("#good")).getText();
    }

    getErrorMessage() {
        return element(by.css("#bad")).getText();
    }
}