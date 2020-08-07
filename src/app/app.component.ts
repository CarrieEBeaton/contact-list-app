import { Component } from '@angular/core';
import { ContactService } from './contacts/services/contact.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(private contactService: ContactService) {
   this.contactService.getContacts().subscribe(contacts =>  console.log(contacts));
    
  }
}
