import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { User } from '../../core/Models/object-model';
import { AdminService } from '../services/admin.service';
declare var $: any;

@Component({
  selector: 'app-user-crud',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule, ReactiveFormsModule],
  templateUrl: './user-crud.component.html',
  styleUrl: './user-crud.component.scss'
})

export class UserCrudComponent {
  public all_user_data: any;
  public single_user_data: any;
  public addEditUserForm!: FormGroup;
  public user_dto!: User;
  public user_reg_data: any;
  public edit_user_id: any;
  public upload_file_name!: string;
  public addEditUser: boolean = false; // For Form validation
  public add_user: boolean = false;
  public edit_user: boolean = false;
  public popup_header!: string;
  public signInFormValue: any = {}

  private _formBuilder = inject(FormBuilder);
  private _adminService = inject(AdminService);
  constructor() { }

  ngOnInit(): void {
    this.getAllUser();
    this.addEditUserForm = this._formBuilder.group({
      name: ['', Validators.required],
      mobNumber: ['', Validators.required],
      age: ['', Validators.required],
      dob: ['', Validators.required],
      email: ['', [Validators.required,]],
      password: ['', [Validators.required,]],
      addLine1: ['', Validators.required],
      addLine2: [],
      city: ['', Validators.required],
      state: ['', Validators.required],
      zipCode: ['', Validators.required],
      language: ['', Validators.required],
      gender: ['', Validators.required],
      aboutYou: ['', Validators.required],
      uploadPhoto: ['', Validators.required],
      agreetc: ['', Validators.required],
      role: ['', Validators.required],
    })
  }
  getAllUser() {
    this._adminService.allUser().subscribe({
      next: (data) => {
        this.all_user_data = data;
      },
      error: (error) => {
        console.log("My error", error)
      }
    })
  }
  get rf() {
    return this.addEditUserForm.controls;
  }

  addUserPopup() {
    this.edit_user = false;
    this.add_user = true;
    this.popup_header = "Add New User";
    this.addEditUserForm.reset();
  }

  addUser() {
    this.addEditUser = true;
    if (this.addEditUserForm.invalid) {
      alert('Error!! :-)\n\n' + JSON.stringify(this.addEditUserForm.value));
      return;
    }
    this.user_reg_data = this.addEditUserForm.value;
    this.user_dto = {
      aboutYou: this.user_reg_data.aboutYou,
      age: this.user_reg_data.age,
      agreetc: this.user_reg_data.agreetc,
      dob: this.user_reg_data.dob,
      email: this.user_reg_data.email,
      gender: this.user_reg_data.gender,
      address: {
        id: 0,
        addLine1: this.user_reg_data.addLine1,
        addLine2: this.user_reg_data.addLine2,
        city: this.user_reg_data.city,
        state: this.user_reg_data.state,
        zipCode: this.user_reg_data.zipCode,
      },
      language: this.user_reg_data.language,
      mobNumber: this.user_reg_data.mobNumber,
      name: this.user_reg_data.name,
      password: this.user_reg_data.password,
      uploadPhoto: this.user_reg_data.uploadPhoto,
      role: this.user_reg_data.role
    }
    this._adminService.addUser(this.user_dto).subscribe({
      next: (data) => {
        this.addEditUserForm.reset();
        this.getAllUser();
        $('#addEditUserModal').modal('toggle');
      }, error: (error) => {
        console.log("my wrong ", error);
      }
    })
  }
  editUserPopup(user_id: any) {
    this.edit_user_id = user_id;
    this.edit_user = true;
    this.add_user = false;
    this.popup_header = "Edit User";
    this._adminService.singleuUser(user_id).subscribe({
      next: (data) => {
        this.single_user_data = data;
        this.upload_file_name = this.single_user_data.uploadPhoto;
        this.addEditUserForm.setValue({
          name: this.single_user_data.name,
          mobNumber: this.single_user_data.mobNumber,
          age: this.single_user_data.age,
          dob: this.single_user_data.dob,
          email: this.single_user_data.email,
          password: this.single_user_data.password,
          language: this.single_user_data.language,
          gender: this.single_user_data.gender,
          addLine1: this.single_user_data.address.addLine1,
          addLine2: this.single_user_data.address.addLine2,
          city: this.single_user_data.address.city,
          state: this.single_user_data.address.state,
          zipCode: this.single_user_data.address.zipCode,
          aboutYou: this.single_user_data.aboutYou,
          uploadPhoto: '',
          agreetc: this.single_user_data.agreetc,
          role: this.single_user_data.role
        });
      }, error: error => {
        console.log("My error", error)
      }
    })
  }
  updateUser() {
    if (this.addEditUserForm.invalid) {
      alert('Error!! :-)\n\n' + JSON.stringify(this.addEditUserForm.value));
      return;
    }
    this.user_reg_data = this.addEditUserForm.value;
    this.user_dto = {
      aboutYou: this.user_reg_data.aboutYou,
      age: this.user_reg_data.age,
      agreetc: this.user_reg_data.agreetc,
      dob: this.user_reg_data.dob,
      email: this.user_reg_data.email,
      gender: this.user_reg_data.gender,
      address: {
        id: 0,
        addLine1: this.user_reg_data.addLine1,
        addLine2: this.user_reg_data.addLine2,
        city: this.user_reg_data.city,
        state: this.user_reg_data.state,
        zipCode: this.user_reg_data.zipCode,
      },
      language: this.user_reg_data.language,
      mobNumber: this.user_reg_data.mobNumber,
      name: this.user_reg_data.name,
      password: this.user_reg_data.password,
      uploadPhoto: (this.user_reg_data.uploadPhoto == "" ? this.upload_file_name : this.user_reg_data.uploadPhoto),
      role: this.user_reg_data.role
    }
    this._adminService.editUser(this.edit_user_id, this.user_dto).subscribe({
      next: (data) => {
        this.addEditUserForm.reset()
        this.getAllUser();
        $('#addEditUserModal').modal('toggle');
      }, error: error => {
        console.log("my wrong ", error);
      }
    })
  }
  deleteUser(user_id: any) {
    this._adminService.deleteUser(user_id).subscribe({
      next: (data) => {
        this.getAllUser();
      }, error: error => {
        console.log("My error", error)
      }
    })
  }
}
