import { Component, inject } from '@angular/core';
import { FormArray, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Master } from '../../_shared/master';
import { CustomerModel, Deliveryaddress } from '../../model/CustomerModel';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';


@Component({
  selector: 'app-addcustomer',
  imports: [ReactiveFormsModule,
    MatCardModule, MatFormFieldModule, MatInputModule, MatSelectModule,
    MatCheckboxModule, MatButtonModule, MatIconModule, RouterLink],
  templateUrl: './addcustomer.html',
  styleUrl: './addcustomer.css',
})
export class Addcustomer {

  builder = inject(FormBuilder);
  service = inject(Master);
  router = inject(Router);
  _actroute = inject(ActivatedRoute);

  title = 'Add Customer - form';
  countries = ['India', 'USA', 'Singapore']
  isedit = false;
  editdata!: CustomerModel;
  editId='';

  ngOnInit() {
    this.editId = this._actroute.snapshot.paramMap.get('id') as string;
    if (this.editId != null && this.editId!='') {
      this.isedit = true;
      this.title = 'Edit Customer - form'
      this.SetEditdata(this.editId);
    }
  }

  SetEditdata(id: string) {
    this.service.Getcustomer(id).subscribe((item: CustomerModel) => {
      this.editdata = item;
      if (this.editdata.address.length > 0) {
        this.editdata.address.forEach(item => {
          this.updateaddress(item);
        })
      }
      this._form.setValue({
        id: this.editdata.id,
        name: this.editdata.name,
        email: this.editdata.email,
        mobile: this.editdata.mobile,
        remarks: this.editdata.remarks,
        isprime: this.editdata.isprime,
        address: []
      })
    })
  }

  get addresslist() {
    return this._form.get('address') as FormArray;
  }

  addaddress() {
    this.addresslist.push(
      this.builder.group({
        city: this.builder.control('', Validators.required),
        country: this.builder.control('', Validators.required),
        zipcode: this.builder.control('', Validators.required)
      })
    )
  }

  updateaddress(data: Deliveryaddress) {
    this.addresslist.push(
      this.builder.group({
        city: this.builder.control(data.city, Validators.required),
        country: this.builder.control(data.country, Validators.required),
        zipcode: this.builder.control(data.zipcode, Validators.required)
      })
    )
  }

  removeaddress(index: number) {
    this.addresslist.removeAt(index);
  }

  _form = this.builder.group({
    id: this.builder.control({ value: '', disabled: true }),
    name: this.builder.control('', Validators.required),
    email: this.builder.control('', Validators.compose([Validators.required, Validators.email])),
    mobile: this.builder.control('', Validators.required),
    remarks: this.builder.control(''),
    isprime: this.builder.control(true),
    address: this.builder.array([])
  })

  SaveCustomer() {
    if (this._form.valid) {
      let _obj = this._form.value as CustomerModel;
      if (this.isedit) {
        this.service.UpdateCustomer(_obj,this.editId).subscribe(item => {
          alert('Customer updated sucessfully.')
          this.router.navigateByUrl('/customer')
        });
      } else {
        this.service.SaveCustomer(_obj).subscribe(item => {
          alert('Customer created sucessfully.')
          this.router.navigateByUrl('/customer')
        });
      }

    }
  }

}
