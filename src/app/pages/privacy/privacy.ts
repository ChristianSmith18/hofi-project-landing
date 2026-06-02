import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-privacy',
  imports: [RouterLink],
  templateUrl: './privacy.html',
  styles: ``,
})
export class Privacy {
  env = environment;
}
