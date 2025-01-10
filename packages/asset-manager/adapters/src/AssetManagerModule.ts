import { AssetManagerIdentifiers, CustomerSecureFileDownload } from '@byb/asset-manager-core'
import type { Container } from 'inversify'
import type { Sequelize } from 'sequelize'

import { DownloadableFileLoaderGateway } from './gateways/file-download/DownloadableFileLoaderGateway'
import { InMemoryDownloadableFileRepository } from './repositories/file-download/InMemoryDownloadableFileRepository'

export interface AssetManagerModuleConfiguration {
  sequelizeInstance: Sequelize
}

export class AssetManagerModule {
  constructor(private readonly container: Container) {}

  configure(config: AssetManagerModuleConfiguration) {
    // adapters
    this.container
      .bind(AssetManagerIdentifiers.downloadableFileLoader)
      .toConstantValue(new DownloadableFileLoaderGateway())
    this.container
      .bind(AssetManagerIdentifiers.downloadableFileRepository)
      .toConstantValue(new InMemoryDownloadableFileRepository(config.sequelizeInstance))

    // use-cases
    this.container.bind(CustomerSecureFileDownload).toSelf()
  }
}
