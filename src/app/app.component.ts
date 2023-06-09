import { Component } from '@angular/core'
import { MatIconRegistry } from '@angular/material'
import { DomSanitizer } from '@angular/platform-browser'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'lemon-mart'

  constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
    iconRegistry.addSvgIcon(
      'lemons',
      sanitizer.bypassSecurityTrustResourceUrl('assets/img/icons/lemons-citrus-pd.svg')
    )
  }
}
