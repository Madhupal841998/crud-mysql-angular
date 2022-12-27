import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import 'rxjs';

import { Students } from './students.model';
@Injectable({
  providedIn: 'root'
})
export class StudentsService {
  selectedStudent: Students;
  students: Students[];
  readonly baseURL = 'http://localhost:3000/students';

  constructor(private http: HttpClient) { }

  postStudent(st: Students) {
    return this.http.post(this.baseURL, st);
  }

  getStudentList() {
    return this.http.get(this.baseURL);
  }

  getStudentListByName(name: string) {
    return this.http.get(this.baseURL + `/${name}`);
  }

  putStudent(st: Students) {
    return this.http.put(this.baseURL + `/${st.id}`, st);
  }

  deleteStudent(id: number) {
    return this.http.delete(this.baseURL + `/${id}`);
  }
  deleteAll(){
    return this.http.delete(this.baseURL+'/');
  }
  
}
 




