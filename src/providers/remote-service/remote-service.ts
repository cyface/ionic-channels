import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';


/*
  Generated class for the RemoteServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class RemoteServiceProvider {

  constructor(public http: HttpClient) {
    console.log('Hello RemoteServiceProvider Provider');
  }

  getApiUrl: string = "https://jsonplaceholder.typicode.com/posts";

  getPosts() {
    return this.http.get(this.getApiUrl);
  }

}
