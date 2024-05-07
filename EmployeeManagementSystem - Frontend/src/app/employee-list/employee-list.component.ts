import { Component, OnInit } from '@angular/core';
import { Employee } from '../employee';
import { EmployeeService } from '../employee.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {
  employees!: Employee[];
  serachItem: string = '';

  constructor(private empService: EmployeeService, private router: Router, private toastr: ToastrService) { }
  ngOnInit(): void {
    this.getEmployees();
  }

  private getEmployees() {
    this.empService.getEmployeesList().subscribe(data => {
      this.employees = data;
    })
  }
  updateEmployee(id: number) {
    this.router.navigate(['update-employee', id])

  }
  deleteEmployee(id: number) {
    this.empService.deleteEmployee(id).subscribe(data => {
      this.getEmployees();
      this.toastr.success('Employee deleted successfully', 'Success');
    },
      error => {
        this.toastr.error('Failed to delete employee', 'Error');
      })
  }
  employeeDetail(id: number) {
    this.router.navigate(['employee-details', id])
  }
  searchEmployee() {
    if (this.serachItem.trim() !== '') {
      this.empService.searchEmployee(this.serachItem).subscribe(data => {
        this.employees = data;
      })
    }
    else {
      this.getEmployees();
    }
  }
  clearSearch() {
    this.serachItem = ''
    this.getEmployees();
  }
}
