import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { combineLatest, tap } from 'rxjs'
import { filter } from 'rxjs/operators'

import { AuthService } from '../auth/auth.service'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {}

  login() {
    this.authService.login('manager@test.com', '12345')

    combineLatest([this.authService.authStatus$, this.authService.currentUser$])
      .pipe(
        // @ts-ignore
        filter(([authStatus, user]) => {
          authStatus.isAuthenticated && user?._id !== ''
        }),
        tap(([authStatus, user]) => {
          this.router.navigate(['/manager'])
        })
      )
      .subscribe()
  }
}
