import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { StudentsService } from "../shared/students.service";
import { Students } from '../shared/students.model';

declare var M: any;


@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css'],
  providers: [StudentsService]
})
export class StudentsComponent implements OnInit{
  filterText: Students = {id: 0, name: "", class: ""};
  constructor(public studentsService: StudentsService) { }

  ngOnInit() {
    this.resetForm();
    this.refreshStudentList();
  }

  resetForm(form?: NgForm) {
    if (form)
      form.reset();
    this.studentsService.selectedStudent = {
      id: 0,
      name: "",
      class:""      
    }
  }

  onSubmit(form: NgForm) {
    if (form.value.id == "") {
      this.studentsService.postStudent(form.value).subscribe((res) => {
        this.resetForm(form);
        this.refreshStudentList();
        M.toast({ html: 'Saved successfully', classes: 'rounded' });
        window.location.reload();
      });
    }
    else {
      this.studentsService.putStudent(form.value).subscribe((res) => {
        this.resetForm(form);
        M.toast({ html: 'Updated successfully', classes: 'rounded' });
        window.location.reload();
      });
    }
  }

  refreshStudentList() {
    this.studentsService.getStudentList().subscribe((res) => {
      this.studentsService.students = res as Students[];
    });
  }

  onEdit(st: Students) {
    this.studentsService.selectedStudent = st;
  }

  onDelete(id: number, form: NgForm) {
    if (confirm('Are you sure to delete this record ?') == true) {
      this.studentsService.deleteStudent(id).subscribe((res) => {
        this.refreshStudentList();
        this.resetForm(form);
        M.toast({ html: 'Deleted successfully', classes: 'rounded' });
        window.location.reload();
      });
    }
  }
  onDeleteAll() {
    if (confirm('Are you sure to delete All records ?') == true) {
      this.studentsService.deleteAll().subscribe((res) => {
        M.toast({ html: 'Table Truncated successfully', classes: 'rounded' });
        window.location.reload();
      });
    }
  }

}
