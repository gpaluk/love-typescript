import {SpatialComponent} from 'components/SpatialComponent'
import {Entity} from 'core/entity'
import {ServiceRegistry} from 'core/ServiceRegistry'
import {PhysicsService} from 'services/PhysicsService'
import {Event} from 'events/Event'
import {EventType} from 'events/EventType'
import {Registry} from 'core/Registry'
import {AxiosComponent, AxiosComponentData} from 'components/AxiosComponent'
import {WebService} from 'services/WebService'

let entity: Entity = new Entity()
entity.addService(PhysicsService)
entity.addService(WebService)

console.log(Registry.getEntityById(entity.id).id)

entity.addEventListener(
    entity.getComponent(SpatialComponent),
    EventType.DATA_UPDATED,
    (e: Event) => (document.getElementById('data').innerHTML = e.data.toString())
)

let axiosComponent: AxiosComponent = entity.getComponent(AxiosComponent)
entity.addEventListener(axiosComponent, EventType.DATA_UPDATED, (e: Event) => {
    console.log((e.data as AxiosComponentData).response.data)
})

axiosComponent.get('todos/' + axiosComponent.nextRecord)

document.getElementById('update-button').onclick = () => ServiceRegistry.update()

document.getElementById('reset-button').onclick = () => {
    entity.getComponent(SpatialComponent).reset()
    axiosComponent.get('todos/' + axiosComponent.nextRecord)
    ServiceRegistry.update()
}
