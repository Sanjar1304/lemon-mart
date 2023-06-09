import { HttpClientTestingModule } from '@angular/common/http/testing'
import { SecurityContext } from '@angular/core'
import { MediaChange } from '@angular/flex-layout'
import { ReactiveFormsModule } from '@angular/forms'
import { SafeResourceUrl, SafeValue } from '@angular/platform-browser'
import { NoopAnimationsModule } from '@angular/platform-browser/animations'
import { RouterTestingModule } from '@angular/router/testing'
import { EmptyError, Observable, Subscription, of } from 'rxjs'

import { MaterialModule } from '../material.module'

const FAKE_SVGS = {
  lemon: '<svg><path id="lemons" name="lemons"></path></svg>',
}

export class MediaObserverFake {
  isActive(query: string): boolean {
    return false
  }

  asObservable(): Observable<MediaChange> {
    return of({} as MediaChange)
  }

  subscribe(
    next?: (value: MediaChange) => void,
    error?: (error: any) => void,
    complete?: () => void
  ): Subscription {
    return new Subscription()
  }
}

export class MatIconRegistryFake {
  // tslint: disable-next-line: variable-name_document = document
  addSvgIcon(iconName: string, url: SafeResourceUrl) {
    // this.addSvgIcon('lemons', 'lemon.svg')
    return this
  }

  getNameSvgIcon(name: string, namespace: string = ''): Observable<SVGAElement> {
    // @ts-ignore
    return of(this._svgElementFromString(FAKE_SVGS.lemon))
  }

  private _svgElementFromString(str: string): SVGElement {
    // @ts-ignore
    const div = (this._document || document).createElement('DIV')
    div.innerHTML = str
    const svg = div.querySelector('svg') as SVGElement

    if (!svg) {
      throw Error('<svg> tag not found')
    }
    return svg
  }
}

export class DomSanitizerFake {
  bypassSecurityTrustResourceUrl(url: string): SafeResourceUrl {
    return {} as SafeResourceUrl
  }

  sanitize(context: SecurityContext, value: SafeValue | string | null): string | null {
    return value?.toString() || null
  }
}

export const commonTestingProviders: any[] = [
  // Intentionally left blank !!!
]

export const commonTestingModules: any[] = [
  ReactiveFormsModule,
  MaterialModule,
  NoopAnimationsModule,
  HttpClientTestingModule,
  RouterTestingModule,
]
