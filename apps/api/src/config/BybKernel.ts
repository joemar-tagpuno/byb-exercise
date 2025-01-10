import { AssetManagerModule } from '@byb/asset-manager-adapters'
import { Container } from 'inversify'
import type { Sequelize } from 'sequelize'
import { AssetManagerResolvers } from '../modules/asset-manager/AssetManagerResolvers'

/**
 * This id the kernel used to install and bootstrap
 * the application modules e.g. the AssetManager module
 * that exposes the secure customer file download usecase
 * into the file download resolver.
 */
export class BybKernel extends Container {
  constructor(private readonly sequelize: Sequelize) {
    super()
  }

  configure() {
    // install modules
    new AssetManagerModule(this).configure({ sequelizeInstance: this.sequelize })

    // bind resolvers
    this.bind(AssetManagerResolvers).toSelf()

    return this
  }
}
