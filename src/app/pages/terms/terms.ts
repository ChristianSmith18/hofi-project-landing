import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-terms',
  imports: [RouterLink],
  templateUrl: './terms.html',
  styles: ``,
})
export class Terms {
  env = environment;
}
