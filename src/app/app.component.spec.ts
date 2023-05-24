import { TestBed } from '@angular/core/testing'
import { RouterTestingModule } from '@angular/router/testing'

import { AppComponent } from './app.component'
import { MediaObserver } from '@angular/flex-layout/core'
import { MatIconRegistry } from '@angular/material/icon'
import { DomSanitizer } from '@angular/platform-browser'
import {
  DomSanitizerFake,
  MatIconRegistryFake,
  MediaObserverFake,
  commonTestingModules,
  commonTestingProviders,
} from './common/common.testing'

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, commonTestingModules],
      providers: commonTestingProviders.concat([
        { provide: MediaObserver, useClass: MediaObserverFake },
        { provide: MatIconRegistry, useClass: MatIconRegistryFake },
        { provide: DomSanitizer, useClass: DomSanitizerFake },
      ]),
      declarations: [AppComponent],
    }).compileComponents()
  })

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent)
    const app = fixture.componentInstance
    expect(app).toBeTruthy()
  })

  it(`should have as title 'lemon-mart'`, () => {
    const fixture = TestBed.createComponent(AppComponent)
    const app = fixture.componentInstance
    expect(app.title).toEqual('lemon-mart')
  })

  it('should render title', () => {
    const fixture = TestBed.createComponent(AppComponent)
    fixture.detectChanges()
    const compiled = fixture.nativeElement as HTMLElement
    expect(compiled.querySelector('.content span')?.textContent).toContain(
      'lemon-mart app is running!'
    )
  })
})
