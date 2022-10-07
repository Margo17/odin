import IAsset from "../interfaces/IAsset";
import { Serializable } from "./serializable";

export class Asset extends Serializable<Asset> implements IAsset {
  id: string = "";
  name: string = "";
  symbol: string = "";
  totalQty: number = 0;
  availableQty: number = 0;
  account: number = 0;

  constructor(data?: Partial<IAsset>) {
    super();
    if (data) Object.assign(this, data);
  }

  protected create(data?: any): Asset {
    return new Asset(data);
  }
}
