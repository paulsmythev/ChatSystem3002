import { browser, by, element } from "protractor";
import { LoginPage } from "./po/authentication.po";
import { forms_groups_create } from "./po/forms_groups.po";
import { forms_channels_create } from "./po/forms_channels.po";
import { forms_users_create } from "./po/forms_users.po";
import { forms_groups_assign } from "./po/forms_assign.po";

describe("Processing New Groups", () => {
    let page: LoginPage;
    let groupsCreate: forms_groups_create;

    const correctCredentias = {
        username: "paul",
        password: "123"
    };

    const testGroup = {
        name: "E2E Testing",
        description: "E2E Testing"
    }

    const insertNothing = {
        name: "",
        description: ""
    }

    beforeEach(() => {
        page = new LoginPage();
        groupsCreate = new forms_groups_create();
    });

    it("Test Setup - Account Login", ()=>{
        page.logout();
        page.navigateTo();
        page.fillCredentials(correctCredentias);
        expect(browser.getTitle()).toContain("Chat System 3002 | Groups - Current");
    });

    it("Insert New Group",()=>{
        browser.get("/groups/create");
        expect(browser.getTitle()).toContain("Chat System 3002 | Groups - Create");
        groupsCreate.fillCredentials(testGroup);
        expect(groupsCreate.getSuccessMessage()).toContain("Group Created");
    });

    it("Insert Existing Group",()=>{
        browser.get("/groups/create");
        expect(browser.getTitle()).toContain("Chat System 3002 | Groups - Create");
        groupsCreate.fillCredentials(testGroup);
        expect(groupsCreate.getErrorMessage()).toContain("Group already exists, try a new one");
    });

    it("Insert Nothing",()=>{
        browser.get("/groups/create");
        expect(browser.getTitle()).toContain("Chat System 3002 | Groups - Create");
        groupsCreate.fillCredentials(insertNothing);
        expect(groupsCreate.getErrorMessage()).toContain("Missing Information");
    });

});

describe("Processing New Channels", () => {
    let channelsCreate: forms_channels_create;
    let page: LoginPage;

    beforeEach(() => {
        page = new LoginPage();
        channelsCreate = new forms_channels_create();
    });

    const correctCredentias = {
        username: "paul",
        password: "123"
    };

    const newChannel = {
        name: "E2E Testing",
        inputGroup_id: "Cats",
        description: "E2E Testing",
    }

    const nothingChannel = {
        name: "",
        inputGroup_id: "",
        description: "",
    }

    it("Test Setup - Account Login", ()=>{
        page.logout();
        page.navigateTo();
        page.fillCredentials(correctCredentias);
        expect(browser.getTitle()).toContain("Chat System 3002 | Groups - Current");
    });

    it("Insert New Channel",()=>{
        browser.get("/channels/create");
        expect(browser.getTitle()).toContain("Chat System 3002 | Channels - Create");
        channelsCreate.fillCredentials(newChannel);
        expect(channelsCreate.getSuccessMessage()).toContain("Channel Created");
    });

    it("Insert Existing Channel",()=>{
        browser.get("/channels/create");
        expect(browser.getTitle()).toContain("Chat System 3002 | Channels - Create");
        channelsCreate.fillCredentials(newChannel);
        expect(channelsCreate.getErrorMessage()).toContain("Channel already exists, try a new one");
    });

    it("Insert Nothing",()=>{
        browser.get("/channels/create");
        expect(browser.getTitle()).toContain("Chat System 3002 | Channels - Create");
        channelsCreate.fillCredentials(nothingChannel);
        expect(channelsCreate.getErrorMessage()).toContain("Missing Information");
    });
});

describe("Processing New Users", () => {
    let usersCreate: forms_users_create;
    let page: LoginPage;

    beforeEach(() => {
        page = new LoginPage();
        usersCreate = new forms_users_create();
    });

    const correctCredentias = {
        username: "paul",
        password: "123"
    };

    const newUser = {
        inputEmail: "E2E@Testing",
        inputUsername: "e2e",
        inputPassword: "123",
    }

    const nothingUser = {
        inputEmail: "",
        inputUsername: "",
        inputPassword: "",
    }

    it("Test Setup - Account Login", ()=>{
        page.logout();
        page.navigateTo();
        page.fillCredentials(correctCredentias);
        expect(browser.getTitle()).toContain("Chat System 3002 | Groups - Current");
    });

    it("Insert New User",()=>{
        browser.get("/users/create");
        expect(browser.getTitle()).toContain("Chat System 3002 | Users - Create");
        usersCreate.fillCredentials(newUser);
        expect(usersCreate.getSuccessMessage()).toContain("User Created");
    });

    it("Insert Existing User",()=>{
        browser.get("/users/create");
        expect(browser.getTitle()).toContain("Chat System 3002 | Users - Create");
        usersCreate.fillCredentials(newUser);
        expect(usersCreate.getErrorMessage()).toContain("Username already exists, try a new one");
    });

    it("Insert Nothing",()=>{
        browser.get("/users/create");
        expect(browser.getTitle()).toContain("Chat System 3002 | Users - Create");
        usersCreate.fillCredentials(nothingUser);
        expect(usersCreate.getErrorMessage()).toContain("Missing Information");
    });
});

describe("Assigning Users to Groups", () => {
    let page: LoginPage;
    let groupsAssign: forms_groups_assign;

    beforeEach(() => {
        page = new LoginPage();
        groupsAssign = new forms_groups_assign();
    });

    const correctCredentias = {
        username: "paul",
        password: "123"
    };

    const newAssign = {
        inputGroup: "e2e testing",
        inputUser: "e2e"
    }

    const nothingAssign = {
        inputGroup: "",
        inputUser: ""
    }

    it("Test Setup - Account Login", ()=>{
        page.logout();
        page.navigateTo();
        page.fillCredentials(correctCredentias);
        expect(browser.getTitle()).toContain("Chat System 3002 | Groups - Current");
    });

    it("Assign User to Group",()=>{
        browser.get("/groups/assigned");
        expect(browser.getTitle()).toContain("Chat System 3002 | Groups - Assigned");
        groupsAssign.fillCredentials(newAssign);
        expect(groupsAssign.getSuccessMessage()).toContain("Relationship Created");
    });

    it("Assign Existing User",()=>{
        browser.get("/groups/assigned");
        expect(browser.getTitle()).toContain("Chat System 3002 | Groups - Assigned");
        groupsAssign.fillCredentials(newAssign);
        expect(groupsAssign.getErrorMessage()).toContain("Relationship Already Exists");
    });

    it("Insert Nothing",()=>{
        browser.get("/groups/assigned");
        expect(browser.getTitle()).toContain("Chat System 3002 | Groups - Assigned");
        groupsAssign.fillCredentials(nothingAssign);
        expect(groupsAssign.getErrorMessage()).toContain("Missing Information");
    });
});