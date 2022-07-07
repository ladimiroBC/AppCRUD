import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Employee } from '../shared/models/employee.interface';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EmployeesService {

  employees:Observable<Employee[]>

  private employeesCollection:AngularFirestoreCollection<Employee>;

  constructor(private afs:AngularFirestore) { 
    this.employeesCollection=afs.collection<Employee>('employees')
    this.getEmployees()

  }

  onDeleteEmployee(empId:string):Promise<void>{
    return new Promise (async (resolve, reject)=>{
      try {
        const result= await this.employeesCollection.doc(empId).delete();
        resolve (result)
      } catch (error) {
        reject(error.msn)
      }
    })
  }

  onSaveEmployee(employee:Employee, empId:string):Promise<void>{

    return new Promise(async(resolve, reject)=>{
      try {
        const id=empId || this.afs.createId();
        const data={id, ...employee};
        const result=await this.employeesCollection.doc(id).set(data);
        resolve(result)
      } catch (error) {
        reject(error.msn)
      }
    })
  }

  private getEmployees():void{
    this.employees=this.employeesCollection.snapshotChanges().pipe(
      map(actions=>actions.map(a=>a.payload.doc.data() as Employee))
    );
  }
}
