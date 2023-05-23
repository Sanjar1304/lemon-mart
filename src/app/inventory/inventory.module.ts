import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'

import { MaterialModule } from '../material.module'
import { InventoryRoutingModule } from './inventory-routing.module'
import { InventoryComponent } from './inventory.component'

@NgModule({
  declarations: [InventoryComponent],
  imports: [CommonModule, InventoryRoutingModule, MaterialModule],
})
export class InventoryModule {}
