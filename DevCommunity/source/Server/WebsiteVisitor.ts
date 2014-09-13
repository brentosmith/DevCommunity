﻿///ts:import=Visitor
import Visitor = require('./Visitor'); ///ts:import:generated

class WebsiteVisitor implements Visitor {
    constructor(private email: string, private admin: boolean) {
    }

    public isAdmin(): boolean {
        return this.admin;
    }

    public getEmail(): string {
        return this.email;
    }
}
export = WebsiteVisitor;