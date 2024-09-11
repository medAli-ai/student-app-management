import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AllStudentsRoutingModule } from './all-students-routing.module';
import { AllStudentComponent } from './all-student/all-student.component';


@NgModule({
  declarations: [
    AllStudentComponent
  ],
  imports: [
    CommonModule,
    AllStudentsRoutingModule
  ]
})
export class AllStudentsModule { }
