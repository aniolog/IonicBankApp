import {NgModule, ModuleWithProviders} from "@angular/core";
import {CommonModule} from "@angular/common";
import {CryptoService} from "./src/crypto.service";
export * from './src/crypto.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  exports: []
})
export class CryptoModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: CryptoModule,
      providers: [CryptoService]
    };
  }
}
