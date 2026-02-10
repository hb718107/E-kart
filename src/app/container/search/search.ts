import { Component, ElementRef, EventEmitter, input, Output, ViewChild } from '@angular/core';
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
  @ViewChild('searchInput') searchInpulEl : ElementRef;

  onSearchTextChanged(){
    this.searchtextchanged.emit(this.searchText);
  }

  updateSearchText(){
    // console.log(inputElement.value);
    this.searchText = this.searchInpulEl.nativeElement.value;
    this.onSearchTextChanged();
    
  }

  icons ={
    search : faEye,
    buy:faCartShopping,
    disabled_search :faEyeSlash

  }

}
