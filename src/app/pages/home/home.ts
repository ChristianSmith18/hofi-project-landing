import { Component } from '@angular/core';
import { Nav } from '../../components/nav/nav';
import { Hero } from '../../components/hero/hero';
import { Features } from '../../components/features/features';
import { HowItWorks } from '../../components/how-it-works/how-it-works';
import { CtaBand } from '../../components/cta-band/cta-band';

@Component({
  selector: 'app-home',
  imports: [Nav, Hero, Features, HowItWorks, CtaBand],
  templateUrl: './home.html',
  styles: ``,
})
export class Home {}
