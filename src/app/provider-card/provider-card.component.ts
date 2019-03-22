import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-provider-card',
  templateUrl: './provider-card.component.html',
  styleUrls: ['./provider-card.component.css']
})
export class ProviderCardComponent implements OnInit {
  @Input() provider: { id: string, name: string, address: string, phone: string};
  @Input() isSaved: boolean;
  @Output() onClick = new EventEmitter();

  public phoneNumber = null;

  sendDataToParent(e): void {
    this.onClick.emit(e);
  }

  formatPhoneNumber(provider): void {
    let area = provider.phone.substring(0,3);
    let mid = provider.phone.substring(3,6);
    let end = provider.phone.substring(6,10);
    this.phoneNumber = `(${area}) ${mid}-${end}`;
  }

  constructor() { }


  ngOnInit() {
    this.formatPhoneNumber(this.provider);
  }
}
