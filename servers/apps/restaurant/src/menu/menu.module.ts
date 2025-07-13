import { Module } from "@nestjs/common";
import { MenuService } from "./menu.service";
import { MenuResolver } from "./menu.resolver";
import { SharedModule } from "../shared/shared.module";

@Module({
  imports: [SharedModule],
  providers: [MenuService, MenuResolver],
  exports: [MenuService],
})
export class MenuModule {} 