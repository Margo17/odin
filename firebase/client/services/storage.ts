import { FirebaseApp } from "firebase/app";
import * as fsClient from "firebase/storage";

import * as base_services from "../../base/services/services";

export class ClientStorage {
  private app: FirebaseApp;

  constructor(app: FirebaseApp) {
    this.app = app;
  }

  async upload(
    bucket: base_services.Bucket,
    data: Blob | Uint8Array | ArrayBuffer,
    options: base_services.UploadOptions
  ) {
    try {
      const cloudBucket = fsClient.getStorage(this.app, bucket);
      const fileRef = fsClient.ref(cloudBucket, options.destination);
      const response = await fsClient.uploadBytes(fileRef, data, {
        contentType: options.contentType,
      });

      console.log(response);
      const { metadata } = response;
      console.log(metadata);
      if (metadata) {
        console.log("print tokens");
        const test = await this.getDownloadURL(bucket, metadata.fullPath);
        console.log(test);
        return test;
        // return metadata.downloadTokens[0];
      }
      return undefined;
    } catch (e) {
      console.log(e);
      console.error(
        new Error(`[ClientStorage] upload: 
          bucket: ${bucket},
          options: ${options},
        `),
        e
      );
      return undefined;
    }
  }

  async getDownloadURL(bucket: base_services.Bucket, path: string) {
    try {
      const cloudBucket = fsClient.getStorage(this.app, bucket);
      const fileRef = fsClient.ref(cloudBucket, path);
      const url = await fsClient.getDownloadURL(fileRef);
      return url;
    } catch (e) {
      console.error(
        new Error(`[ClientStorage] download: 
          bucket: ${bucket},
          path: ${path},
        `),
        e
      );
      return undefined;
    }
  }
}
