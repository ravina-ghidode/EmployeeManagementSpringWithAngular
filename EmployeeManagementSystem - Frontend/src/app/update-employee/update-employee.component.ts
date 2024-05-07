import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../employee.service';
import { Employee } from '../employee';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-update-employee',
  templateUrl: './update-employee.component.html',
  styleUrls: ['./update-employee.component.css']
})
export class UpdateEmployeeComponent implements OnInit {
  employee: Employee = new Employee();
  id!: number;
  constructor(private empService: EmployeeService, private route: ActivatedRoute, private router: Router, private toastr: ToastrService) { }
  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.empService.getEmployeeById(this.id).subscribe(data => {
      this.employee = data;
    }),
      (error: any) => console.log(error);

  }
  onSubmit() {
    this.empService.updateEmployee(this.employee, this.id).subscribe(data => {
      this.toastr.success('Employee Updated successfully', 'Success');
      this.goToEmployeeList();
    },
      error => {
        this.toastr.error('Failed to delete employee', 'Error');
      }
    )

  }
  goToEmployeeList() {
    this.router.navigate(['/employees'])
  }


}
