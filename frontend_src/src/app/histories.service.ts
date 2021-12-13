import { Injectable } from '@angular/core';
import { v4 as uuidv4 } from 'uuid';
import { HttpClient } from '@angular/common/http';
import { Observable, of, Subject } from 'rxjs';
import { map, catchError, tap, subscribeOn } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HistoriesService {

  items = [
    {
      id: uuidv4(),
      content: "www.target.com"
    }, 
    {
      id: uuidv4(),
      content: "https://www.youtube.com/watch?v=kAhp-GLdBWQ"
    }, 
    {
      id: uuidv4(),
      content: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. "
    }, 
  ];

  dataChanged$: Observable<boolean>;
  private dataChangeSubject: Subject<boolean>;
  //baseUrl = "http://localhost:8101";
  baseUrl = "https://swdv-665-paste-board.herokuapp.com";

  constructor(public http: HttpClient) {
    console.log("Hello HistoriesService Provider");

    this.dataChangeSubject = new Subject<boolean>();
    this.dataChanged$ = this.dataChangeSubject.asObservable();
  }

  getItems(): Observable<object[]> {
    console.log("HistoriesService Provider getItems");
    return this.http.get<object[]>(this.baseUrl + "/api/paste").pipe(
       map(this.extractData),
       catchError(this.handleError)
    );
  }

  private extractData(res) {
    console.log("HistoriesService extractData");
    console.log(JSON.stringify(res));

    let body = res;    
    return body || {};
  }

  private handleError(error: Response | any) {
    console.log("HistoriesService handleError");
    let errMsg : string;
    if (error instanceof Response) {
      const err = error || '';
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.log(JSON.stringify(errMsg));
    return Observable.throw(errMsg);
  }

  deleteItem(item) {
    console.log("deleteItem: " + item._id);
    this.http.delete(this.baseUrl + "/api/paste/" + item._id).subscribe(res => {
      this.dataChangeSubject.next(true);
    }, err => {
      console.log("Catch error");
        console.log(JSON.stringify(err));
    });
  }

  addItem(pasteContent) {
    console.log("test add paste: " + pasteContent);
    var body = {
      "content": pasteContent
    };

    this.http.post(this.baseUrl + "/api/paste", body).subscribe(res => {
      this.dataChangeSubject.next(true);
    }, err => {
      console.log("Catch error");
        console.log(JSON.stringify(err));
    });
  }

  editItem(item) {
    console.log("editItem: " + JSON.stringify(item));
    console.log(item);
    this.http.put(this.baseUrl + "/api/paste/" + item._id, item).subscribe(res => {
      this.dataChangeSubject.next(true);
    }, err => {
      console.log("Catch error");
        console.log(JSON.stringify(err));
    });
  }
}
