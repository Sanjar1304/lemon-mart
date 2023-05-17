import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { MatIconModule } from '@angular/material/icon'
import { MatToolbarModule } from '@angular/material/toolbar'

const modules = [MatToolbarModule, MatIconModule]

@NgModule({
  declarations: [],
  imports: [CommonModule, modules],
  exports: modules,
})
export class MaterialModule {}
