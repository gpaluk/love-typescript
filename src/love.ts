import { ImageComponent } from 'components/ImageComponent'
import { NameComponent } from 'components/nameComponent'
import { SpatialComponent } from 'components/SpatialComponent'
import { Entity } from 'core/entity'
import { ServiceRegistry } from 'core/ServiceRegistry'
import { EventType } from 'events/EventType'
import { LogService } from 'services/LogService'
import { PhysicsService } from 'services/PhysicsService'
import { RenderService } from 'services/RenderService'

let entity: Entity = new Entity()
entity.addComponent(NameComponent).name = 'Component 1'
entity.addService(RenderService)
entity.addService(PhysicsService)

// adding an event to a service
entity.addService(LogService).addEventListener(EventType.LOADED, (e: CustomEvent) => {
    console.log("The notification was also received from the service!", e.detail);
})
// adding an event to an entity
entity.addEventListener(EventType.LOADED, (e: CustomEvent) => {
    console.log("The notification was received!", e.detail);
})
// adding an event to a component
entity.getComponent(SpatialComponent).addEventListener(EventType.DATA_UPDATE, (e: CustomEvent) => {
    let component: SpatialComponent = (e.detail as SpatialComponent)
    //console.log(component.entity.);
    console.log("Data updated: " + component.data.matrix)
})

entity.getComponent(ImageComponent).image.src = 'assets/game.png'

ServiceRegistry.update()
ServiceRegistry.update()
ServiceRegistry.update()

let entity2: Entity = new Entity()
entity2.dispatchEvent(EventType.LOADED)