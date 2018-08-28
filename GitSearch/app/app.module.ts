import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent }  from './app.component';
import { RepoService } from './repo.service';

@NgModule({
    imports: [BrowserModule, HttpClientModule ],
    declarations: [AppComponent],
    providers: [RepoService],
    bootstrap:    [ AppComponent ]
})
export class AppModule { }
