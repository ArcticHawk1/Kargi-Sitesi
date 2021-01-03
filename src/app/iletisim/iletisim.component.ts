import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { ServicesService } from '../services.service';

@Component({
  selector: 'app-iletisim',
  templateUrl: './iletisim.component.html',
  styleUrls: ['./iletisim.component.css']
})
export class IletisimComponent implements OnInit{
  lat = 37.00850309346716;
  lng = 27.32525836435135;

  FormData: FormGroup;
  constructor(private builder: FormBuilder, private contact: ServicesService) { }

  ngOnInit() {
    this.FormData = this.builder.group({
      Name: new FormControl('', [Validators.required]),
      Email: new FormControl('', [Validators.compose([Validators.required, Validators.email])]),
      Phone: new FormControl('', [Validators.pattern("^[0-9]*$")]),
      Message: new FormControl('', [Validators.required])
    });
  }

  get Name() {return this.FormData.get('Name'); }
  get Email() {return this.FormData.get('Email'); }
  get Phone() {return this.FormData.get('Phone'); }
  get Message() {return this.FormData.get('Message'); }

  onSubmit(FormData) {
    console.log(FormData)
    this.contact.PostMessage(FormData)
      .subscribe(response => {
        location.href = 'https://mailthis.to/confirm'
        console.log(response)
      }, error => {
        console.warn(error.responseText)
        console.log({ error })
      })
  }
}
