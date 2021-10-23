import { browser, by, element } from "protractor";

export class forms_channels_create {
    private details = {
        name: "E2E Testing",
        inputGroup_id: "E2E Testing",
        description: "E2E Testing",
    }

    fillCredentials(credentias: any = this.details) {
        element(by.css('[name="name"]')).sendKeys(credentias.name);
        element(by.css('[name="inputGroup_id"]')).sendKeys(credentias.inputGroup_id);
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
