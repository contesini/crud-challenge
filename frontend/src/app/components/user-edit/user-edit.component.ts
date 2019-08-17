import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';

import { ApiService } from '../../services/api.service';
import Phone from 'src/app/models/phone';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent implements OnInit {

  userForm: FormGroup;
  _id: string = '';
  phoneNumber = '';
  ddd = '';
  email = '';
  isWhatsApp = false;
  isLoadingResults = false;

  constructor(private router: Router, private route: ActivatedRoute, private api: ApiService, private formBuilder: FormBuilder) {
    this.userForm = this.formBuilder.group({
      'name': [null, Validators.required],
      'phones': [[]],
      'emails': [[]],
    });
  }

  ngOnInit() {
    this.getUser(this.route.snapshot.params['id']);
  }

  getUser(id) {
    this.api.getUser(id).subscribe(data => {
      this._id = data._id;
      this.userForm.setValue({
        name: data.name,
        phones: data.phones || [],
        emails: data.emails || []
      });
    });
  }

  onFormSubmit(form: NgForm) {
    this.isLoadingResults = true;
    this.api.updateUser(this._id, form)
      .subscribe(res => {
        let id = res['_id'];
        this.isLoadingResults = false;
        this.router.navigate(['/user-details', id]);
      }, (err) => {
        console.log(err);
        this.isLoadingResults = false;
      }
      );
  }

  userDetails() {
    this.router.navigate(['/user-details', this._id]);
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
