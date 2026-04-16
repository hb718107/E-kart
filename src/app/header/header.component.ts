import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';
import { SearchService } from '../services/search.service';
import { NavigationService } from '../services/navigation.service';
import { AuthService } from '../services/auth.service';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { ProfileService } from '../services/profile.service';
import { User } from '@supabase/supabase-js';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  cartCount: number = 0;
  isCategoriesOpen = false;
  currentUser: User | null = null;
  isProfileMenuOpen = false;
  isProfileIncomplete = false;

  categoryGroups = [
    {
      name: 'Fashion',
      icon: 'styler',
      sections: [
        {
          title: 'Mens Archive',
          links: [
            { name: 'Shirts & Suits', slug: 'mens-shirts' },
            { name: 'Architecture Footwear', slug: 'mens-shoes' },
            { name: 'Precision Watches', slug: 'mens-watches' },
            { name: 'Technical Eyewear', slug: 'sunglasses' }
          ]
        },
        {
          title: 'Womens Suite',
          links: [
            { name: 'Vanguard Dresses', slug: 'womens-dresses' },
            { name: 'Signature Tops', slug: 'tops' },
            { name: 'Footwear Collection', slug: 'womens-shoes' },
            { name: 'High-Fidelity Jewellery', slug: 'womens-jewellery' },
            { name: 'Accessory Modules', slug: 'womens-bags' }
          ]
        }
      ]
    },
    {
      name: 'Electronics',
      icon: 'devices',
      sections: [
        {
          title: 'Tech Grid',
          links: [
            { name: 'Smartphones', slug: 'smartphones' },
            { name: 'Professional Laptops', slug: 'laptops' },
            { name: 'Tablets', slug: 'tablets' },
            { name: 'Mobile Infrastructure', slug: 'mobile-accessories' }
          ]
        }
      ]
    },
    {
      name: 'Home & Living',
      icon: 'chair',
      sections: [
        {
          title: 'Interior Space',
          links: [
            { name: 'Structural Furniture', slug: 'furniture' },
            { name: 'Decorative Accents', slug: 'home-decoration' },
            { name: 'Utility Hardware', slug: 'kitchen-accessories' }
          ]
        },
        {
          title: 'Wellness Archive',
          links: [
            { name: 'Beauty Suite', slug: 'beauty' },
            { name: 'Fragrance Precision', slug: 'fragrances' },
            { name: 'Dermal Care', slug: 'skin-care' }
          ]
        }
      ]
    },
    {
      name: 'Essentials',
      icon: 'database',
      sections: [
        {
          title: 'Life Support',
          links: [
            { name: 'Bio-Groceries', slug: 'groceries' },
            { name: 'Athletic Infrastructure', slug: 'sports-accessories' }
          ]
        },
        {
          title: 'Transfers',
          links: [
            { name: 'Automotive Units', slug: 'vehicle' },
            { name: 'Motorcycles', slug: 'motorcycle' }
          ]
        }
      ]
    }
  ];

  constructor(
    private cartService: CartService,
    private searchService: SearchService,
    private navService: NavigationService,
    private auth: AuthService,
    private profile: ProfileService,
    private router: Router
  ) {}

  ngOnInit() {
    this.cartService.cartItems$.subscribe(() => {
      this.cartCount = this.cartService.getCartCount();
    });

    this.auth.currentUser$.subscribe(user => {
      this.currentUser = user;
    });

    this.profile.isComplete$.subscribe(complete => {
      this.isProfileIncomplete = this.currentUser ? !complete : false;
    });
  }

  onSearchChange(event: any) {
    const text = event.target.value;
    // Only pulse the signal if there is a query or if we need to clear an existing search
    if (text.trim() || this.searchService.getSearchText()) {
      this.searchService.setSearchText(text);
      if (text.trim()) {
        this.navService.setSearchMode();
      }
    }
  }

  onSearchEnter(event: any) {
    const text = event.target.value;
    // Block the pulse if the input is empty to avoid redundant 'All Products' API loads
    if (text.trim()) {
      this.searchService.setSearchTextImmediate(text);
      this.navService.setSearchMode();
    }
  }

  selectCategory(slug: string) {
    this.navService.setCategory(slug);
    this.isCategoriesOpen = false;
  }

  viewAll() {
    this.navService.setAllMode();
  }

  viewOffers() {
    this.navService.setOffersMode();
  }

  toggleCategories() {
    this.isCategoriesOpen = !this.isCategoriesOpen;
  }

  logout() {
    this.auth.signOut();
    this.isProfileMenuOpen = false;
  }

  toggleProfileMenu() {
    this.isProfileMenuOpen = !this.isProfileMenuOpen;
  }
}
