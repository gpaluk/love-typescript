import {SpatialComponent} from 'components/SpatialComponent'
import {Entity} from 'core/entity'
import {ServiceRegistry} from 'core/ServiceRegistry'
import {PhysicsService} from 'services/PhysicsService'
import {Event} from 'events/Event'
import {EventType} from 'events/EventType'
import {Registry} from 'core/Registry'
import {AxiosComponent} from 'components/AxiosComponent'
import {WebService} from 'services/WebService'
import {Renderer, pluginscript} from 'Renderer'
import {Card} from 'Card'

// Add services to entities and dependency components are automatically injects
let entity: Entity = new Entity('test-entity')
entity.addService(PhysicsService)
entity.addService(WebService)
entity.addEventListener(entity.getComponent(SpatialComponent), EventType.DATA_UPDATED, (e: Event) => {
    document.getElementById('data').innerHTML = e.data.toString()
    Registry.auditEntity(entity)
})

/**
 * When a component state is updated, a DATA_UPDATED event is automatically dispatched.
 * We can retireve a component from the Entity also.
 */
let axiosComponent: AxiosComponent = entity.getComponent(AxiosComponent)
entity.addEventListener(axiosComponent, EventType.DATA_UPDATED, (e: Event) => {
    Registry.auditEntity(entity)
})
axiosComponent.get('todos/' + axiosComponent.nextRecord)

// Update all services upon clicking the Update button
document.getElementById('update-button').onclick = () => ServiceRegistry.update()

// Reset the SpatialComponent state and load the next web record
document.getElementById('reset-button').onclick = () => {
    entity.getComponent(SpatialComponent).reset()
    axiosComponent.get('todos/' + axiosComponent.nextRecord)
}

// Create an entity using JSX syntax
let card: HTMLElement = <Card message="Hello, World!" id="my-card" />
Renderer.render(card)

// Retrieve any entity from the registry
console.log(Registry.getEntityById('my-card'))
