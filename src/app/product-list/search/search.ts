import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCartShopping,faEye } from '@fortawesome/free-solid-svg-icons';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search',
  imports: [FontAwesomeModule,FormsModule],
  templateUrl: './search.html',
  styleUrl: './search.css',
})

export class Search {
  searchText : string = 'What are you looking for ?'

  // updateSearchText(event : any){
  //   this.searchText = event.target.value;
  // }

  icons ={
    search : faEye,
    buy:faCartShopping

  }

}
