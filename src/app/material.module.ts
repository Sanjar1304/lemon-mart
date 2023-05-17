import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { MatIconModule } from '@angular/material/icon'
import { MatToolbarModule } from '@angular/material/toolbar'
import { MatButtonModule } from '@angular/material/button'

const modules = [MatToolbarModule, MatIconModule, MatButtonModule]

@NgModule({
  declarations: [],
  imports: [CommonModule, modules],
  exports: modules,
})
export class MaterialModule {}
