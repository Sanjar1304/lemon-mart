import { Component, OnInit } from '@angular/core'

@Component({
  selector: 'app-home',
  template: `
    <div class="home-container">
      <span class="home-title">Hello, Limoncu !</span>
      <button mat-raised-button color="primary">Login</button>
    </div>
  `,
  styles: [
    `
      .home-container {
        margin-top: 32px;
        display: flex;
        justify-content: center;
        flex-direction: column;
        align-items: center;
      }
      .home-title {
        display: flex;
        align-items: center;
        justify-content: center;
        margin-top: 2rem;
        margin-bottom: 2rem;
      }
    `,
  ],
})
export class HomeComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
