import * as remoteConfig from 'firebase/remote-config'

export class ClientRemoteConfig {
  private config: remoteConfig.RemoteConfig

  constructor(config: remoteConfig.RemoteConfig) {
    this.config = config
  }

  async initSevice() {
    this.config.settings.minimumFetchIntervalMillis = 60 * 60 * 1000
    try {
      await remoteConfig.fetchAndActivate(this.config)
    } catch (e) {
      console.error(new Error(`[ClientRemoteConfig] initSevice`), e)
    }
  }

  private getString(key: string) {
    return remoteConfig.getString(this.config, key)
  }

  private getNumber(key: string) {
    return remoteConfig.getNumber(this.config, key)
  }

  private getBoolean(key: string) {
    return remoteConfig.getBoolean(this.config, key)
  }

  private getJson(key: string): { [k: string]: any } {
    const value = this.getString(key)
    if (value) return JSON.parse(value)
    return {}
  }

  private getList(key: string): any[] {
    const value = this.getString(key)
    if (value) return JSON.parse(value)
    return []
  }

  localizedValues() {
    return this.getJson('localizedValues')
  }

  assetImages() {
    return this.getJson('assetImages')
  }

  supportedLanguages() {
    return this.getJson('supportedLanguages')
  }

  localizedUnitsOfMeasure() {
    return this.getJson('localizedUnitsOfMeasure')
  }

  orderStatusCodes() {
    return this.getJson('orderStatusCodes')
  }

  orderPickupStatusCodes() {
    return this.getJson('orderPickupStatusCodes')
  }

  companyDetails() {
    return this.getJson('companyDetails')
  }

  webEmailLinkUrl() {
    return this.getJson('webEmailLinkUrl')
  }

  bannerRollSpeed() {
    return this.getNumber('bannerRollSpeed')
  }

  productsFetchBatch() {
    return this.getNumber('productsFetchBatch')
  }

  catalogFetchBatch() {
    return this.getNumber('catalogFetchBatch')
  }

  deliveryPriceRefreshTime() {
    return this.getNumber('deliveryPriceRefreshTime')
  }

  availableStoresRefreshTime() {
    return this.getNumber('availableStoresRefreshTime')
  }

  tooFarMapDistance() {
    return this.getNumber('tooFarMapDistance')
  }

  tipRatingThreshold() {
    return this.getNumber('tipRatingThreshold')
  }

  locatedAddressRefreshInterval() {
    return this.getNumber('locatedAddressRefreshInterval')
  }

  mapStyle() {
    return this.getString('mapStyle')
  }

  dynamicLinkDomain() {
    return this.getString('dynamicLinkDomain')
  }

  useDocumentNumberCheck() {
    return this.getBoolean('useDocumentNumberCheck')
  }

  feedbackTags() {
    return this.getList('feedbackTags')
  }

  suborderCancellationStatusCodes() {
    return this.getList('suborderCancellationStatusCodes')
  }

  vehicleTypeSelectValues() {
    return this.getList('vehicleTypeSelectValues')
  }

  addToOrderStatusCodes() {
    return this.getList('addToOrderStatusCodes')
  }

  tipValues() {
    return this.getList('tipValues')
  }

  pricingTypes() {
    return this.getList('pricingTypes')
  }

  mainTags() {
    return this.getList('mainTags')
  }
}
