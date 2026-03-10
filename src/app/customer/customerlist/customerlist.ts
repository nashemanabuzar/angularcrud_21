import { Component, effect, inject, OnInit, signal, viewChild } from '@angular/core';
import { Master } from '../../_shared/master';
import { CustomerModel } from '../../model/CustomerModel';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customerlist',
  imports: [
    MatTableModule, 
    MatPaginatorModule, 
    MatButtonModule,
    MatIconModule, 
    MatCardModule
  ],
  templateUrl: './customerlist.html',
  styleUrl: './customerlist.css',
})
export class Customerlist {

  title = 'Customer Listing'
  service = inject(Master);
  router = inject(Router);
  customerlist = signal<CustomerModel[]>([])
  displayColums = ['id', 'name', 'email', 'phone', 'prime', 'action']
  datasource: MatTableDataSource<CustomerModel> = new MatTableDataSource<CustomerModel>();
  paginator = viewChild.required(MatPaginator);
  ngOnInit() {
    this.Getcustomers();
  }

  private _effect = effect(() => {
    this.datasource.data = this.customerlist();
    this.datasource.paginator=this.paginator();
  })

  Getcustomers() {
    this.service.GetAllCustomers().subscribe(data => {
      this.customerlist.set(data);
      // debugger;
      // this.datasource = new MatTableDataSource(this.customerlist);
    })
  }

  addcustomer() {
    this.router.navigateByUrl('/addcustomer')
  }

  editcustomer(id: string) {
    this.router.navigateByUrl('/editcustomer/' + id);
  }

  deletecustomer(id: string) {
    if (confirm('Are you sure to delete?')) {
      this.service.DeleteCustomer(id).subscribe(item => {
        alert('Customer removed successfully.');
        this.Getcustomers();
      })
    }
  }



}
