import { Component, OnInit } from '@angular/core';
import { Employee } from '../employee';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-employee-detail',
  templateUrl: './employee-detail.component.html',
  styleUrls: ['./employee-detail.component.css']
})
export class EmployeeDetailComponent implements OnInit {
  id!: number;
  employee!: Employee;

  constructor(private route: ActivatedRoute, private empService: EmployeeService, private router: Router) { }
  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.empService.getEmployeeById(this.id).subscribe(data => {
      this.employee = data;

    })
  }
  goToEmployeeList() {
    this.router.navigate(['/employees'])
  }



}
