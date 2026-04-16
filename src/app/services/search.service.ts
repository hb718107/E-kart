import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject, merge } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private searchTextSubject = new BehaviorSubject<string>('');
  searchText$ = this.searchTextSubject.asObservable();

  private searchBufferSubject = new Subject<string>();

  constructor() {
    this.searchBufferSubject.pipe(
      debounceTime(5000),
      distinctUntilChanged()
    ).subscribe(text => {
      this.searchTextSubject.next(text);
    });
  }

  setSearchText(text: string) {
    this.searchBufferSubject.next(text);
  }

  setSearchTextImmediate(text: string) {
    this.searchTextSubject.next(text);
  }

  getSearchText(): string {
    return this.searchTextSubject.value;
  }
}
