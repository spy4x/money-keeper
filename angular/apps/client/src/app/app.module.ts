import { NgModule } from '@angular/core';
import { CoreModule } from './+core/core.module';
import { SharedModule } from './+shared/shared.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [CoreModule],
  providers: [],
  entryComponents: [...SharedModule.getEntryComponents()],
  bootstrap: [AppComponent],
})
export class AppModule {}
