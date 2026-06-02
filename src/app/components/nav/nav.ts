import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-nav',
  imports: [NgOptimizedImage, RouterLink],
  templateUrl: './nav.html',
  styleUrl: './nav.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class.scrolled]': 'isScrolled()',
    '(window:scroll)': 'onWindowScroll()',
  },
})
export class Nav {
  isScrolled = signal(false);
  isMenuOpen = signal(false);

  onWindowScroll() {
    this.isScrolled.set(window.scrollY > 80);
  }

  toggleMenu() {
    this.isMenuOpen.update((v) => !v);
  }

  closeMenu() {
    this.isMenuOpen.set(false);
  }
}
