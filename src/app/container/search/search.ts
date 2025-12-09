import { Component, EventEmitter, input, Output } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCartShopping,faEye,faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-search',
  imports: [FontAwesomeModule, FormsModule, CommonModule],
  templateUrl: './search.html',
  styleUrl: './search.css',
})

export class Search {
  searchText : string = ''
  @Output()
  searchtextchanged: EventEmitter<string> = new EventEmitter<string>();

  onSearchTextChanged(){
    this.searchtextchanged.emit(this.searchText);
  }

  updateSearchText(inputElement: HTMLInputElement){
    // console.log(inputElement.value);
    this.searchText = inputElement.value;
    this.searchtextchanged.emit(this.searchText);
  }

  icons ={
    search : faEye,
    buy:faCartShopping,
    disabled_search :faEyeSlash

  }

}
