import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-crmarchivos',
  templateUrl: './crmarchivos.component.html',
  styleUrls: ['./crmarchivos.component.css']
})
export class CrmarchivosComponent implements OnInit {


  myForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    file: new FormControl('', [Validators.required]),
    fileSource: new FormControl('', [Validators.required])
  });

  constructor(
    private apiService:ApiService
  ) { }

  ngOnInit(): void {
  }

  /////////////////FILE UPLOAD ///////////////////////////////////////////

  get f() {
    return this.myForm.controls;
  }

  onFileChange(event) {

    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.myForm.patchValue({
        fileSource: file
      });
    }
  }

  submit() {
    const formData = new FormData();
    formData.append('file', this.myForm.get('fileSource').value);
    formData.append('filepath','./archivos/VIVANZA/CRM/');

    this.apiService.uploadPhoto(formData).subscribe((response) => {
      let _response;
      _response = response;
      console.log(_response);
      alert('Uploaded Successfully.');
    })

  }

}
