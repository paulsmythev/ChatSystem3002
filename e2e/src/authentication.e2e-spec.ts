import { LoginPage } from "./po/authentication.po";
import { browser } from "protractor";

describe("Authentication Testing", () => {
    let page: LoginPage;
    
    const wrongCredentias = {
        username: "wrongname",
        password: "wrongpasswd"
    };

    const correctCredentias = {
        username: "paul",
        password: "123"
    };

    beforeEach(() => {
        page = new LoginPage();
    });

    it("Authentication Failure", ()=>{
        page.logout();
        page.navigateTo();
        page.fillCredentials(wrongCredentias);
        expect(page.getPageTitleText()).toContain("Login");
        expect(page.getErrorMessage()).toContain("Login Error!");
    });

    it("Authentication Success", ()=>{
        page.navigateTo();
        page.fillCredentials(correctCredentias);
        expect(browser.getTitle()).toContain("Chat System 3002 | Groups - Current");
    });

    it("Authentication Logout Success", ()=>{
        page.logout();
        expect(page.getPageTitleText()).toContain("Login");
    });

    it("Authentication Redirection Success", ()=>{
        page.logout();
        page.redirection();
        expect(page.getPageTitleText()).toContain("Login");
    });

});