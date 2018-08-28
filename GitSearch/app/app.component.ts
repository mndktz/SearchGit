import { Component, transition } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SearchItem } from './searchItem';
import { RepoService } from './repo.service';
import 'rxjs/add/operator/first';


const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Component({
  selector: 'my-app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent  {

    private repos: Observable<SearchItem[]>;
    private loading: boolean = false;
    private noResults: boolean = false;
    private bookmarked: boolean = false;

    constructor(private repoService: RepoService) { }

    ngOnInit() {
      
        
    }

    //serach repositories and bookmarks
    search(query : string) {
        this.repoService.search(query).subscribe((data : any) => {
            const [results, bookmarks] = data;
            this.repos = results.items.map((item: any) =>
                new SearchItem(
                    item.name,
                    item.owner.login,
                    item.owner.avatar_url,
                    bookmarks.find((x: any) => x.Name == item.name && x.Avatar == item.owner.avatar_url) // if item is bookmarked set as true
                        ? true : false
            ));
            
            if (!results.items || !results.items.length) //if no results display no reults found
                this.noResults = true;
            
        this.loading = false;
        });
    }

    // add or remove bookmark
    bookmark(repo: SearchItem) {
        repo.add = !repo.add;
        this.repoService.bookmark(repo);
    }

    onReturn(event: any) {
        this.noResults = false;
        this.loading = true;
        setTimeout(() => {
            this.search(event.target.value);
        }, 0)
    }
        
}
