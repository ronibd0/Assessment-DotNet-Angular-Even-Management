import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TechStackService } from 'src/app/appService/tech-stack.service';

@Component({
  selector: 'app-guests',
  templateUrl: './guests.component.html',
  styleUrls: ['./guests.component.css'],
})
export class GuestsComponent {
  guestForm!: FormGroup;
  guest: any;
  Alert: boolean = true;
  updatebtn: boolean = false;
  updateId: any;

  constructor(
    private formBuilder: FormBuilder,
    private ApiService: TechStackService<any>
  ) {
    this.LoadGuest();
  }

  ngOnInit(): void {
    this.createForm();
  }

  createForm(): void {
    this.guestForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      dob: ['', Validators.required],
      allergies: [''],
    });
  }
  openmodel(){
    this.updatebtn = false;
  }
  onSubmit(): void {
    if (this.guestForm.valid) {
      console.log(this.guestForm.value);
      this.ApiService.create('Guest', this.guestForm.value).subscribe({
        next: (res) => {

          console.log('this is ', res);
          if (
            res != null &&
            res.email == this.guestForm.controls['email'].value
          ) {
            this.Alert = true;
            this.LoadGuest();
            document.getElementById('closebtn')?.click();

          } else {
            this.Alert = false;
          }
        },
      });
    }
  }
  LoadGuest() {

    this.ApiService.getAll('Guest').subscribe({
      next: (response) => {
        if (response.length > 0) {
          this.guest = response;
        } else {
          this.Alert = true;
        }
      },
      error: (err) => {
        console.log('error at guest ', err);
      },
    });
  }
  reset() {
    this.guestForm.reset();
  }
  editGuest(data: any) {
    document.getElementById("openbtn")?.click();
    this.updatebtn = true;
    this.updateId = data.guestID;
    this.guestForm.patchValue({
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      dob: data.dob,
      allergies: data.allergies,
    });
  }

  deleteGuest(data: any) {
    this.ApiService.delete('Guest', data.guestID).subscribe({
      next: (res) => {
        if (res== null) {
          this.LoadGuest();
        }
      },
      error:err=>{
        console.log(err);
      }
    });
  }

  Updateguest(){
    console.log(this.guestForm.value)
    if (this.guestForm.valid) {
      this.ApiService.update('Guest',this.updateId,this.guestForm.value).subscribe({
        next:res=>{
          console.log('success',res);
          this.guestForm.reset();
          this.LoadGuest();
          document.getElementById('closebtn')?.click();
          this.updatebtn = false;

        },error:err=>{
          console.log('err',err)
        }
      })

    } else {

    }
  }
}
