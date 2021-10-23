import { browser, by, element } from "protractor";
import { LoginPage } from "./po/authentication.po";

describe("Checking Components and Routes", () => {
    let page: LoginPage;

    const correctCredentias = {
        username: "paul",
        password: "123"
    };

    beforeEach(() => {
        page = new LoginPage();
    });

    it("Components Authentication", ()=>{
        browser.get("/logout");
        browser.get("/login");
        expect(browser.getTitle()).toContain("Chat System 3002 | Login");
    });

    it("Test Setup - Account Login", ()=>{
        page.logout();
        page.navigateTo();
        page.fillCredentials(correctCredentias);
        expect(browser.getTitle()).toContain("Chat System 3002 | Groups - Current");
    });

    it("Groups", ()=>{
        browser.get("/groups/assigned");
        expect(browser.getTitle()).toContain("Chat System 3002 | Groups - Assigned");
        browser.get("/groups/create");
        expect(browser.getTitle()).toContain("Chat System 3002 | Groups - Create");
        browser.get("/groups/current");
        expect(browser.getTitle()).toContain("Chat System 3002 | Groups - Current");
        browser.get("/groups/read");
        expect(browser.getTitle()).toContain("Chat System 3002 | Groups - Read");
    });

    it("Channels", ()=>{
        browser.get("/channels/create");
        expect(browser.getTitle()).toContain("Chat System 3002 | Channels - Create");
        browser.get("/channels/current");
        expect(browser.getTitle()).toContain("Chat System 3002 | Channels - Current");
        browser.get("/channels/read");
        expect(browser.getTitle()).toContain("Chat System 3002 | Channels - Read");
    });

    it("Users", ()=>{
        browser.get("/users/create");
        expect(browser.getTitle()).toContain("Chat System 3002 | Users - Create");
        browser.get("/users/current");
        expect(browser.getTitle()).toContain("Chat System 3002 | Users - Current");
        browser.get("/users/read");
        expect(browser.getTitle()).toContain("Chat System 3002 | Users - Read");
    });

});