# love-typescript
ECS written in TypeScript

```import { LogService } from "services/LogService";
import { RenderService } from "services/RenderService";
import { ImageComponent } from "components/ImageComponent";

let entity:Entity = new Entity()
entity.addComponent(NameComponent).name = "Component 1"
entity.addService(LogService)
entity.addService(RenderService)

entity.getComponent(ImageComponent).image.src = "assets/game.png"
ServiceRegistry.update()
```