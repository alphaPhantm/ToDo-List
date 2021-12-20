import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Todo } from '../_interface/todo';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private serverURL = 'http://localhost:3000'

  constructor(
    private _http: HttpClient
  ) { }

  //GET
  public getToDo(): Observable<Todo[]> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this._http.get<Todo[]>(`${this.serverURL}/todo`, httpOptions);
  }

  //POST
  public postToDO(object: Todo): Observable<Todo> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this._http.post<Todo>(`${this.serverURL}/todo`, object, httpOptions)
  }

  //DELETE
  public deleteToDo(object: Todo): Observable<Todo> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this._http.delete<Todo>(`${this.serverURL}/todo/${object.id}`, httpOptions);
  }

  //PUT
  public putToDo(object: Todo): Observable<Todo> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this._http.put<Todo>(`${this.serverURL}/todo/${object.id}`, object, httpOptions);
  }
}
