"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var http_1 = require("@angular/common/http");
var searchItem_1 = require("./searchItem");
var repo_service_1 = require("./repo.service");
require("rxjs/add/operator/first");
var httpOptions = {
    headers: new http_1.HttpHeaders({ 'Content-Type': 'application/json' })
};
var AppComponent = /** @class */ (function () {
    function AppComponent(repoService) {
        this.repoService = repoService;
        this.loading = false;
        this.noResults = false;
        this.bookmarked = false;
    }
    AppComponent.prototype.ngOnInit = function () {
    };
    AppComponent.prototype.search = function (query) {
        var _this = this;
        this.repoService.search(query).subscribe(function (data) {
            var results = data[0], bookmarks = data[1];
            _this.repos = results.items.map(function (item) {
                return new searchItem_1.SearchItem(item.name, item.owner.login, item.owner.avatar_url, bookmarks.find(function (x) { return x.Name == item.name && x.Avatar == item.owner.avatar_url; })
                    ? true : false);
            });
            if (!results.items || !results.items.length)
                _this.noResults = true;
            _this.loading = false;
        });
    };
    AppComponent.prototype.bookmark = function (repo) {
        repo.add = !repo.add;
        this.repoService.bookmark(repo);
    };
    AppComponent.prototype.onReturn = function (event) {
        var _this = this;
        this.noResults = false;
        this.loading = true;
        setTimeout(function () {
            _this.search(event.target.value);
        }, 0);
    };
    AppComponent = __decorate([
        core_1.Component({
            selector: 'my-app',
            templateUrl: './app.component.html',
            styleUrls: ['./app.component.css']
        }),
        __metadata("design:paramtypes", [repo_service_1.RepoService])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map