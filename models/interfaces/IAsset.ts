export default interface IAsset {
  id: string;
  name: string;
  symbol: string;
  totalQty: number;
  availableQty: number;
  account?: number;
}
