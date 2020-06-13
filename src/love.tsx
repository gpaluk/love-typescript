import {SpatialComponent} from 'components/SpatialComponent'
import {Entity} from 'core/entity'
import {ServiceRegistry} from 'core/ServiceRegistry'
import {PhysicsService} from 'services/PhysicsService'
import {Event} from 'events/Event'
import {EventType} from 'events/EventType'
import {WebService} from 'services/WebService'
import {Renderer, pluginscript} from 'Renderer'
import {Card} from 'Card'
import {Registry} from 'core/Registry'

// Add services to entities and dependency components are automatically injects
let entity: Entity = new Entity('test-entity')
entity.addService(PhysicsService)
entity.addService(WebService)
entity.addEventListener(entity.getComponent(SpatialComponent), EventType.DATA_UPDATED, (e: Event) => {
    document.getElementById('data').innerHTML = e.data.toString()
})

// Update all services upon clicking the Update button
document.getElementById('update-button').onclick = () => ServiceRegistry.update()

// Reset the SpatialComponent state and load the next web record
document.getElementById('reset-button').onclick = () => {
    entity.getComponent(SpatialComponent).reset()
}
//Registry.registerJSX(Card)
// Create an entity using JSX syntax
let card = <Card message="Hello, World!" id="my-card" />
Renderer.render(card, document.getElementById('card')) // FIX : This is currently the way to invoke the class constructor
