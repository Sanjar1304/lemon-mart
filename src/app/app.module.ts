import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { InventoryModule } from './inventory/inventory.module'
import { ManagerModule } from './manager/manager.module'
import { MaterialModule } from './material.module';
import { PosModule } from './pos/pos.module';
import { UserModule } from './user/user.module';
import { HomeComponent } from './home/home.component'

@NgModule({
  declarations: [AppComponent, HomeComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    ManagerModule,
    InventoryModule,
    PosModule,
    UserModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
