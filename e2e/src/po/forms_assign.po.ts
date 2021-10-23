import { browser, by, element } from "protractor";

export class forms_groups_assign {
    private details = {
        inputGroup: "e2e testing",
        inputUser: "e2e"
    }

    fillCredentials(credentias: any = this.details) {
        element(by.css('[name="inputGroup"]')).sendKeys(credentias.inputGroup);
        element(by.css('[name="inputUser"]')).sendKeys(credentias.inputUser);
        element(by.css('.btn-secondary')).click();
    }

    getSuccessMessage() {
        return element(by.css("#good")).getText();
    }

    getErrorMessage() {
        return element(by.css("#bad")).getText();
    }
}