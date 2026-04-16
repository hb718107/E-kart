import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export type ViewMode = 'ALL' | 'CATEGORY' | 'OFFERS' | 'SEARCH';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {
  private viewModeSubject = new BehaviorSubject<ViewMode>('ALL');
  viewMode$ = this.viewModeSubject.asObservable();

  private selectedCategorySubject = new BehaviorSubject<string>('');
  selectedCategory$ = this.selectedCategorySubject.asObservable();

  setCategory(category: string) {
    this.selectedCategorySubject.next(category);
    this.viewModeSubject.next('CATEGORY');
  }

  setOffersMode() {
    this.selectedCategorySubject.next('');
    this.viewModeSubject.next('OFFERS');
  }

  setAllMode() {
    this.selectedCategorySubject.next('');
    this.viewModeSubject.next('ALL');
  }

  setSearchMode() {
    this.selectedCategorySubject.next('');
    this.viewModeSubject.next('SEARCH');
  }

  getCurrentMode(): ViewMode {
    return this.viewModeSubject.value;
  }
}
