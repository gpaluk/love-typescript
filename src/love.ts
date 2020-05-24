import {SpatialComponent} from 'components/SpatialComponent'
import {Entity} from 'core/entity'
import {ServiceRegistry} from 'core/ServiceRegistry'
import {PhysicsService} from 'services/PhysicsService'
import {Event} from 'events/Event'

let entity: Entity = new Entity()
entity.addService(PhysicsService)

// add an event listener to the unique component bindId
let bindId: string = entity.getComponent(SpatialComponent).bindId
entity.addEventListener(bindId, (e: Event) => {
    document.getElementById('data').innerHTML = e.data.toString()
    console.log(bindId)
})

document.getElementById('update-button').onclick = () => {
    ServiceRegistry.update()
}

document.getElementById('reset-button').onclick = () => {
    entity.getComponent(SpatialComponent).reset()
    ServiceRegistry.update()
}
