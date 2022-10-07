import * as fs from "fs";
import * as os from "os";
import path from "path";
import * as stream from "stream";

import { storage } from "firebase-admin";
import { v4 as uuid } from "uuid";

import * as models from "../../../models";
import * as services from "../../base/services/services";

export class ServerStorage {
  private storage: storage.Storage;

  constructor(storage: storage.Storage) {
    this.storage = storage;
  }

  async uploadFromMemory(
    bucket: services.Bucket,
    data: any[],
    fullFileName: string,
    contentType: models.e.ContentType
  ) {
    const cloudBucket = this.storage.bucket(bucket);
    const dataStream = new stream.PassThrough();
    const gcFile = cloudBucket.file(fullFileName);

    for (const d of data) dataStream.push(d);
    dataStream.push(null);
    return new Promise((resolve, reject) => {
      dataStream
        .pipe(
          gcFile.createWriteStream({
            validation: false,
            metadata: contentType,
            resumable: false,
          })
        )
        .on("error", (error: Error) => {
          reject(error);
        })
        .on("finish", () => {
          resolve(true);
        });
    })
      .then((value) => value)
      .catch((reason) => {
        console.error(reason);
        return false;
      });
  }

  async transferFile(
    bucket: services.Bucket,
    localFileRelativeFullPath: string,
    options: services.UploadOptions
  ) {
    try {
      const cloudBucket = this.storage.bucket(bucket);
      const response = await cloudBucket.upload(localFileRelativeFullPath, {
        destination: options.destination,
        metadata: options,
        resumable: false,
      });
      fs.unlinkSync(localFileRelativeFullPath);

      const file = response[0];

      if (options.public)
        await file.isPublic().catch(async () => file.makePublic());
      return await this.getPrivateDownloadUrl(bucket, options.destination);
    } catch (error) {
      console.error(
        new Error(`[ServerStorage] transferFile: 
          bucket: ${bucket},
          options: ${JSON.stringify(options)},
        `),
        error
      );
      return undefined;
    }
  }

  async upload(
    bucket: services.Bucket,
    data: string,
    fileName: string,
    options: services.UploadOptions
  ) {
    try {
      const relativePath = `${os.tmpdir()}/${fileName}`;
      const writeOptions =
        options.contentType === models.e.ContentType.json ||
        options.contentType === models.e.ContentType.plain ||
        options.contentType === models.e.ContentType.csv ||
        options.contentType === models.e.ContentType.xml
          ? ({ encoding: "utf-8" } as fs.WriteFileOptions)
          : undefined;

      fs.writeFileSync(relativePath, data, writeOptions);
      return await this.transferFile(bucket, relativePath, options);
    } catch (e) {
      console.error(
        new Error(`[ServerStorage] upload: 
          bucket: ${bucket},
          options: ${JSON.stringify(options)},
        `),
        e
      );
      return undefined;
    }
  }

  /**
   * Takes in a base64 type binary Data, converts it into a buffer, writes it and transfers the file to firebase
   *
   * @param {Bucket} bucket firebase bucket
   * @param {string} base64Data parsed pure base64 data
   * @param {string} fileName file name for file
   * @param {UploadOptions} options upload options for file transfering
   */
  async uploadImage(
    bucket: services.Bucket,
    base64Data: string,
    fileName: string,
    options: services.UploadOptions
  ) {
    try {
      const relativePath = `${os.tmpdir()}/${fileName}`;
      const buffer = Buffer.from(base64Data, "base64");
      fs.writeFileSync(relativePath, buffer);
      return await this.transferFile(bucket, relativePath, options);
    } catch (e) {
      console.error(
        new Error(`[ServerStorage] upload: 
          bucket: ${bucket},
          options: ${JSON.stringify(options)},
        `),
        e
      );
      return undefined;
    }
  }

  async download(
    bucket: services.Bucket,
    bucketPath: string,
    fileName: string
  ) {
    try {
      const cloudBucket = this.storage.bucket(bucket);
      const bucketFilePath = `${bucketPath}/${fileName}`;
      const bucketFile = cloudBucket.file(bucketFilePath);
      const relativePath = `${os.tmpdir()}/${fileName}`;
      await bucketFile.download({ destination: relativePath });
      const rawdata = fs.readFileSync(relativePath);
      fs.unlinkSync(relativePath);
      return rawdata;
    } catch (e) {
      console.error(
        new Error(`[ServerStorage] download: 
          bucket: ${bucket},
          bucketPath: ${bucketPath},
          fileName: ${fileName}
        `),
        e
      );
      return undefined;
    }
  }

  async checkFile(bucket: services.Bucket, path: string) {
    const cloudBucket = this.storage.bucket(bucket);
    const bucketFile = cloudBucket.file(path);
    return bucketFile.exists();
  }

  /**
   * Get File Download URL placed in bucket.
   * @param destinationFilePath Bucket File Destination directory with filename and extension (use slash for path)
   * @returns Download URL string longlive
   */
  async getPrivateDownloadUrl(
    _bucket: services.Bucket,
    destinationFilePath: string
  ) {
    const bucket = storage().bucket(_bucket);
    const _file = bucket.file(destinationFilePath);
    const _file_metadata = await _file.getMetadata();
    const new_uuid = uuid();
    _file_metadata[0].metadata = { firebaseStorageDownloadTokens: new_uuid };
    await _file.setMetadata(_file_metadata[0]).catch((e) => {
      console.error(Error(e));
    });
    const subUrlConverted = destinationFilePath.replace(/\//g, "%2F");
    const _bucket_split = _bucket.split("/");
    const _bucket_name = _bucket_split[_bucket_split.length - 1];
    const _file_Download_url = `https://firebasestorage.googleapis.com/v0/b/${_bucket_name}/o/${subUrlConverted}?alt=media&token=${new_uuid}`;
    return _file_Download_url;
  }

  /**
   * Upload/Hang File in Bucket 'lastmile-ui' and receive firebase download url with token.
   * @param fileToHangPath Local file to upload
   * @param destinationFilePath Bucket Destination directory with filename and extension (use slash for path)
   * @param contentTypeMIME MIME content type (not mandatory, default: 'text/plain') Common MIME type string like 'application/pdf', 'text/plain', 'application/json', image/jpeg etc.
   * @returns Download URL string longlive
   */
  async uploadFileAndGetDownloadUrl(
    filePathToUpload: string,
    destinationFilePath: string,
    contentTypeMIME?: string, // Common MIME type
    _bucket: services.Bucket = services.Bucket.ui
  ): Promise<string | null> {
    try {
      const bucket = storage().bucket(_bucket);
      const new_uuid = uuid();
      await bucket
        .upload(filePathToUpload, {
          destination: destinationFilePath,
          metadata: {
            contentType: contentTypeMIME || "text/plain",
            metadata: { firebaseStorageDownloadTokens: new_uuid },
          }, // text/plain | application/pdf
        })
        .catch((e) =>
          console.error(
            new Error(e),
            `Cannot upload file as '${destinationFilePath}'`
          )
        ); // FIXME: upload handles error, so there is nothing to catch
      const subUrlConverted = destinationFilePath.replace(/\//g, "%2F");
      const _bucket_split = _bucket.split("/");
      const _bucket_name = _bucket_split[_bucket_split.length - 1];
      const _file_Download_url = `https://firebasestorage.googleapis.com/v0/b/${_bucket_name}/o/${subUrlConverted}?alt=media&token=${new_uuid}`;
      return _file_Download_url;
    } catch (e) {
      console.error(
        Error(
          `[ServerStorage]: uploadFileAndGetDownloadUrl: filePathToUpload: '${filePathToUpload}', destinationFilePath: '${destinationFilePath}', contentTypeMIME: '${contentTypeMIME}', _bucket: '${_bucket}'`
        )
      );
      return null;
    }
  }

  async deleteFiles(bucketName: string, fileList: string[]) {
    for (const file of fileList) {
      try {
        await this.storage
          .bucket(bucketName)
          .file(file)
          .exists()
          .then(async (exist) => {
            if (exist.length > 0 && exist[0]) {
              await this.storage.bucket(bucketName).file(file).delete();
            } else {
              console.error(`[ServerStorage] deleteFiles:
              File ${file} does not exist`);
            }
          });
      } catch (e) {
        console.error(
          new Error(`[ServerStorage] deleteFiles: 
          Failed to delete file ${file}
        `),
          e
        );
      }
    }
  }

  async moveFileBetweenBuckets(
    from: { filePath: string; bucketName: string },
    to: { filePath: string; bucketName: string }
  ) {
    console.log(
      `INFO: moveFileBetweenBuckets =>`,
      JSON.stringify(from),
      JSON.stringify(to)
    );

    const fileName = path.basename(from.filePath);
    const tempLocalFilePath = path.join(os.tmpdir(), fileName);
    let metadata01: any = null;

    // REDO
    {
      const bucket01 = this.storage.bucket(from.bucketName);
      const file01 = bucket01.file(from.filePath);

      // Download file from bucket.
      await file01
        .download({ destination: tempLocalFilePath })
        .catch((e: any) =>
          console.error(
            new Error(`Cannot moveFileBetweenBuckets => download
            ${JSON.stringify(from)}
            ${JSON.stringify(to)}`),
            e
          )
        );
      metadata01 = file01.metadata;
    }

    {
      const bucket02 = this.storage.bucket(to.bucketName);

      // Upload file to another bucket.
      await bucket02
        .upload(tempLocalFilePath, {
          destination: to.filePath,
          metadata: metadata01,
        })
        .catch((e: any) =>
          console.error(
            new Error(e),
            `Cannot moveFileBetweenBuckets() => upload
            ${JSON.stringify(from)},
            ${JSON.stringify(to)}`,
            e
          )
        );
    }
  }

  async getMediaLink(bucket: services.Bucket, filePath: string) {
    const cloudBucket = this.storage.bucket(bucket);
    const file = cloudBucket.file(filePath);

    const metaData = await file.getMetadata();

    return metaData[0].mediaLink;
  }
}
