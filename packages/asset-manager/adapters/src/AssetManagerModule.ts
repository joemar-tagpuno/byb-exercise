import { AssetManagerIdentifiers, CustomerSecureFileDownload } from '@byb/asset-manager-core'
import type { Container } from 'inversify'
import type { Sequelize } from 'sequelize'

// import { DownloadableFileLoaderGateway } from './gateways/file-download/DownloadableFileLoaderGateway'
import { LocalFileLoaderGateway } from './gateways/file-download/LocalFileLoaderGateway'
import { InMemoryDownloadableFileRepository } from './repositories/file-download/InMemoryDownloadableFileRepository'
// import { MySQLDownloadableFileRepository } from './repositories/file-download/MySQLDownloadableFileRepository'

export interface AssetManagerModuleConfiguration {
  sequelizeInstance: Sequelize
}

export class AssetManagerModule {
  constructor(private readonly container: Container) {}

  configure(_config: AssetManagerModuleConfiguration) {
    // adapters
    this.container.bind(AssetManagerIdentifiers.downloadableFileLoader).toConstantValue(new LocalFileLoaderGateway())
    //  .toConstantValue(new DownloadableFileLoaderGateway())
    this.container
      .bind(AssetManagerIdentifiers.downloadableFileRepository)
      .toConstantValue(new InMemoryDownloadableFileRepository())
    //  .toConstantValue(new MySQLDownloadableFileRepository(config.sequelizeInstance))

    // use-cases
    this.container.bind(CustomerSecureFileDownload).toSelf()
  }
}
