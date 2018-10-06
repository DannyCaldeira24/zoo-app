import { Component, OnInit } from '@angular/core';
import { MessageService } from '../services/message.service';
import swal from'sweetalert2';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  constructor(public _MessageService: MessageService) { }

  ngOnInit() {
  }

	contactForm(form) {
		this._MessageService.sendMessage(form).subscribe(() => {
			swal("Formulario de contacto", "Mensaje enviado correctamente", 'success');
		});
 	}
}
