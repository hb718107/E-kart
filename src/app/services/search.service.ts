import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private searchTextSubject = new BehaviorSubject<string>('');
  searchText$ = this.searchTextSubject.asObservable();

  setSearchText(text: string) {
    this.searchTextSubject.next(text);
  }

  getSearchText(): string {
    return this.searchTextSubject.value;
  }
}
