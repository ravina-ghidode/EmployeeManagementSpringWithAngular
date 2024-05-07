import { Component, OnInit } from '@angular/core';
import { Employee } from '../employee';
import { EmployeeService } from '../employee.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css']
})
export class CreateEmployeeComponent implements OnInit {
  employee: Employee = new Employee()
  constructor(private empService: EmployeeService, private router: Router, private toastr: ToastrService) { }

  ngOnInit(): void {
  }
  saveEmployee() {
    this.empService.createEmployee(this.employee).subscribe(data => {
      this.toastr.success('Employee Added successfully', 'Success');
      this.goToEmployeeList()
    },
      error => {
        this.toastr.error('Failed to delete employee', 'Error');
      }
    )

  }
  onSubmit() {
    this.saveEmployee();
  }
  goToEmployeeList() {
    this.router.navigate(['/employees'])
  }
}
