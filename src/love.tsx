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

let entity: Entity = new Entity('test-entity')
entity.addService(PhysicsService)
entity.addService(WebService)
entity.addEventListener(entity.getComponent(SpatialComponent), EventType.DATA_UPDATED, (e: Event) => {
    document.getElementById('data').innerHTML = e.data.toString()
    Registry.auditEntity(entity)
})

let axiosComponent: AxiosComponent = entity.getComponent(AxiosComponent)
entity.addEventListener(axiosComponent, EventType.DATA_UPDATED, (e: Event) => {
    // run an audit when the API responce is returned
    Registry.auditEntity(entity)
})

axiosComponent.get('todos/' + axiosComponent.nextRecord)

document.getElementById('update-button').onclick = () => ServiceRegistry.update()

document.getElementById('reset-button').onclick = () => {
    entity.getComponent(SpatialComponent).reset()
    axiosComponent.get('todos/' + axiosComponent.nextRecord)
    ServiceRegistry.update()
}

Renderer.render(<Card name="Hello, World!" />)
