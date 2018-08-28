import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/forkJoin';
import { SearchItem } from './searchItem';


@Injectable()
export class RepoService {
    constructor(private http: HttpClient) { }
    //return serach items and bookmarked items 
    search(term: string): Observable<any> {
        return Observable.forkJoin(
            this.http.get(`https://api.github.com/search/repositories?q=${term} `),
            this.http.get('/home/Bookmarks')
        )
    }

    // add or remove bookmark
    bookmark(repo: SearchItem) : void {
        let apiURL = `/home/Bookmark `;
        this.http.post(apiURL, repo).subscribe();
    }
}
