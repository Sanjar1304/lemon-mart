import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { MatToolbarModule } from '@angular/material/toolbar'

const modules = [MatToolbarModule]

@NgModule({
  declarations: [],
  imports: [CommonModule, modules],
  exports: modules,
})
export class MaterialModule {}
