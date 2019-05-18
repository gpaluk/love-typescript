import { Entity } from "core/entity";
import { NameComponent } from "components/nameComponent";
import { ServiceRegistry } from "core/ServiceRegistry";
import { LogService } from "services/LogService";

let entity:Entity = new Entity()
entity.addComponent(NameComponent).name = "Hello World"

ServiceRegistry.addEntity(entity, LogService)
ServiceRegistry.update()