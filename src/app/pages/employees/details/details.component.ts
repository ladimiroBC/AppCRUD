import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { Employee } from 'src/app/shared/models/employee.interface';
import { EmployeesService } from '../../employees.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  
  employee:Employee;

  navigationExtras:NavigationExtras={
    state:{
      value:null
    }
  }

  
  constructor(private router:Router, private employeesSvc:EmployeesService) {

    const navigation=this.router.getCurrentNavigation();
    this.employee=navigation?.extras?.state?.value
   }

  ngOnInit(): void {
    if(typeof this.employee=='undefined'){
      this.router.navigate(['list'])
    }
  
  }

  onGoToEdit():void{
    this.navigationExtras.state.value=this.employee;  
    this.router.navigate(['edit'],this.navigationExtras)
  }

  async onDelete():Promise<void>{
    try {
      await this.employeesSvc.onDeleteEmployee(this.employee?.id);
      alert('deleted');
      this.onGoToList()
    } catch (err) {
      console.log(err)
    }
    
    
  }

  onGoToList(){
    this.router.navigate(['list']);
  }



}
