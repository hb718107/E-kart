import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faSquareCaretLeft } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'top-header',
  imports: [FontAwesomeModule],
  templateUrl: './top-header.html',
  styleUrl: './top-header.css',
})
export class TopHeader {
hello : string = 'I am top header'


icon = {
  arrow:faSquareCaretLeft
}
}
