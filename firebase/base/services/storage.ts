import { ContentType } from "../../../models/enums";

export enum Bucket { // TODO: CHANGE TO ENV
  ui = "gs://odin-platform-ui",
}

export enum BucketName {
  ui = "odin-platform-ui",
}

export interface UploadOptions {
  destination: string;
  contentType: ContentType;
  public?: boolean;
}
