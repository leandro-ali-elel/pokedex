import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FooterModule } from "./components/footer/footer.module";

@NgModule({
  declarations: [],
  imports: [CommonModule, FooterModule],
  exports: [FooterModule],
})
export class SharedModule {}
