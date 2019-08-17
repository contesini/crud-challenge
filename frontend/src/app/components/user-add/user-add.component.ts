import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';

import { ApiService } from '../../services/api.service';
import User from 'src/app/models/user';
import Phone from 'src/app/models/phone';

@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.scss']
})
export class UserAddComponent implements OnInit {

  userForm: FormGroup;
  name: string = '';
  ddd = '';
  phoneNumber: '';
  email = '';
  isWhatsApp = false;
  isLoadingResults = false;

  constructor(private router: Router, private api: ApiService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.userForm = this.formBuilder.group({
      'name': [null, Validators.required],
      'phones': [[]],
      'emails': [[]],
    });
  }

  onFormSubmit(form: NgForm) {
    this.isLoadingResults = true;
    this.api.addUser(form)
      .subscribe(res => {
        let id = res['_id'];
        this.isLoadingResults = false;
        this.router.navigate(['/user-details', id]);
      }, (err) => {
        console.log(err);
        this.isLoadingResults = false;
      });
  }


  addPhone() {
    if (this.ddd !== '' && this.phoneNumber !== ''
      && String(this.phoneNumber).length === 9 && String(this.ddd).length === 2) {
      const phone = {
        ddd: this.ddd,
        phoneNumber: this.phoneNumber,
        isWhatsApp: this.isWhatsApp,
      }
      this.userForm.get('phones').value.push(phone);
      this.ddd = '';
      this.phoneNumber = '';
      this.isWhatsApp = false;
    }
  }

  removePhone(phone) {
    const index = this.userForm.get('phones').value.indexOf(phone)
    if (index !== -1) this.userForm.get('phones').value.splice(index, 1);
  }

  removeEmail(email) {
    const index = this.userForm.get('emails').value.indexOf(email)
    if (index !== -1) this.userForm.get('emails').value.splice(index, 1);
  }

  addEmail() {
    if (this.email !== '') {
      this.userForm.get('emails').value.push(this.email)
      this.email = ''
    }
  }
}
