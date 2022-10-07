import * as fsClient from "firebase/firestore";
// import { FieldValue } from 'firebase/firestore'

import * as models from "../../../models";
import * as base_services from "../../base/services/services";

export class ClientDatabase extends base_services.Database {
  private firestore: fsClient.Firestore;

  constructor(firestore: fsClient.Firestore) {
    super();
    this.firestore = firestore;
  }

  getFieldValueDelete() {
    return fsClient.deleteField();
  }
  getFieldValueIncrement(number: number) {
    return fsClient.increment(number);
  }
  getFieldValueArrayUnion(elements: any[]) {
    return fsClient.arrayUnion(...elements);
  }
  getFieldValueArrayRemove(elements: any[]) {
    return fsClient.arrayRemove(...elements);
  }
  protected isDatabaseField(value: any): boolean {
    return value instanceof fsClient.FieldValue;
  }
  protected geopoint(latitude: number, longitude: number) {
    return new fsClient.GeoPoint(latitude, longitude);
  }
  protected timestamp(date: Date) {
    return fsClient.Timestamp.fromDate(date);
  }

  protected docToType<T extends models.c.Serializable<T>>(
    type: T,
    doc: fsClient.DocumentSnapshot
  ) {
    const data = doc.data();
    if (data) {
      data.id = doc.id;
      const unpacked = this.unpackMap(data);
      const object = type.fromJson(unpacked);
      return object;
    }
    return undefined;
  }

  async createDocument(
    data: { [k: string]: any },
    collection: models.e.DatabaseCollection,
    documentId?: string,
    subcollection?: models.e.DatabaseSubcollection,
    subdocumentId?: string
  ) {
    try {
      const json = this.packMap(data);
      let id = documentId;
      const paths: string[] = [];
      if (documentId && subcollection) {
        id = subdocumentId;
        paths.push(documentId);
        paths.push(subcollection);
      }
      if (id) {
        paths.push(id);
        const ref = fsClient.doc(this.firestore, collection, ...paths);
        return await fsClient.setDoc(ref, json).then(() => id);
      }
      const ref = fsClient.collection(this.firestore, collection, ...paths);
      return await fsClient.addDoc(ref, json).then((doc) => doc.id);
    } catch (e) {
      console.error(
        new Error(`[ClientDatabase] createDocument: 
          data: ${data},
          collection: ${collection},
          documentId: ${documentId},
          subcollection: ${subcollection},
          subdocumentId: ${subdocumentId}
        `),
        e
      );
      return undefined;
    }
  }

  async setDocument(
    data: { [k: string]: any },
    collection: models.e.DatabaseCollection,
    documentId: string,
    subcollection?: models.e.DatabaseSubcollection,
    subdocumentId?: string
  ) {
    try {
      const json = this.packMap(data);
      let id = documentId;
      const paths: string[] = [];
      if (documentId && subcollection && subdocumentId) {
        id = subdocumentId;
        paths.push(documentId);
        paths.push(subcollection);
      }

      paths.push(id);
      const ref = fsClient.doc(this.firestore, collection, ...paths);
      return await fsClient.setDoc(ref, json, { merge: true }).then(() => id);
    } catch (e) {
      console.error(
        new Error(`[ClientDatabase] setDocument: 
          data: ${data},
          collection: ${collection},
          documentId: ${documentId},
          subcollection: ${subcollection},
          subdocumentId: ${subdocumentId}
        `),
        e
      );
      return undefined;
    }
  }

  async getDocument<T extends models.c.Serializable<T>>(
    object: T,
    collection: models.e.DatabaseCollection,
    documentId: string,
    subcollection?: models.e.DatabaseSubcollection,
    subdocumentId?: string
  ) {
    try {
      const paths = [documentId];
      if (subcollection && subdocumentId) {
        paths.push(...[subcollection, subdocumentId]);
      }
      const doc = await fsClient.getDoc(
        fsClient.doc(this.firestore, collection, ...paths)
      );
      return this.docToType(object, doc);
    } catch (e) {
      console.error(
        new Error(`[ClientDatabase] getDocument:
          collection: ${collection},
          documentId: ${documentId},
          subcollection: ${subcollection},
          subdocumentId: ${subdocumentId}
        `),
        e
      );
      return undefined;
    }
  }

  streamDocument<T extends models.c.Serializable<T>>(
    onDocument: (doc: T | undefined) => void,
    object: T,
    collection: models.e.DatabaseCollection,
    documentId: string,
    subcollection?: models.e.DatabaseSubcollection,
    subdocumentId?: string
  ) {
    try {
      const paths = [documentId];
      if (subcollection && subdocumentId) {
        paths.push(...[subcollection, subdocumentId]);
      }
      return fsClient.onSnapshot(
        fsClient.doc(this.firestore, collection, ...paths),
        (snap) => {
          const doc = this.docToType(object, snap);
          onDocument(doc);
        }
      );
    } catch (e) {
      console.error(
        new Error(`[ClientDatabase] streamDocument:
          collection: ${collection},
          documentId: ${documentId},
          subcollection: ${subcollection},
          subdocumentId: ${subdocumentId}
        `),
        e
      );
      return undefined;
    }
  }

  async updateDocument(
    data: { [k: string]: any },
    collection: models.e.DatabaseCollection,
    documentId: string,
    subcollection?: models.e.DatabaseSubcollection,
    subdocumentId?: string
  ) {
    try {
      const json = this.packMap(data);
      const paths = [documentId];
      if (subcollection && subdocumentId) {
        paths.push(subcollection);
        paths.push(subdocumentId);
      }
      const ref = fsClient.doc(this.firestore, collection, ...paths);
      await fsClient.updateDoc(ref, json);

      return true;
    } catch (e) {
      console.error(
        new Error(`[ClientDatabase] updateDocument:
          data: ${data},
          collection: ${collection},
          documentId: ${documentId},
          subcollection: ${subcollection},
          subdocumentId: ${subdocumentId}
        `),
        e
      );
      return false;
    }
  }

  async deleteDocument(
    collection: models.e.DatabaseCollection,
    documentId: string,
    subcollection?: models.e.DatabaseSubcollection,
    subdocumentId?: string
  ) {
    try {
      const paths = [documentId];
      if (subcollection && subdocumentId) {
        paths.push(...[subcollection, subdocumentId]);
      }
      await fsClient.deleteDoc(
        fsClient.doc(this.firestore, collection, ...paths)
      );
      return true;
    } catch (e) {
      console.error(
        new Error(`[ClientDatabase] deleteDocument:
          collection: ${collection},
          documentId: ${documentId},
          subcollection: ${subcollection},
          subdocumentId: ${subdocumentId}
        `),
        e
      );
      return false;
    }
  }

  async getDocuments<T extends models.c.Serializable<T>>(
    object: T,
    collection: models.e.DatabaseCollection,
    queryConstraints: base_services.QueryConstraint[],
    documentId?: string,
    subcollection?: models.e.DatabaseSubcollection
  ) {
    try {
      const paths: string[] = [];
      if (documentId && subcollection) {
        paths.push(...[documentId, subcollection]);
      }
      const ref = fsClient.collection(this.firestore, collection, ...paths);
      const constraints = queryConstraints
        .map((value) => {
          switch (value.type) {
            case "limit": {
              return fsClient.limit(value.limit);
            }
            case "offset": {
              return fsClient.startAfter(value.offset);
            }
            case "orderBy": {
              return fsClient.orderBy(value.field, value.direction);
            }
            case "where": {
              return fsClient.where(value.field, value.operator, value.value);
            }
            default: {
              return undefined;
            }
          }
        })
        .filter((value) => value !== undefined) as fsClient.QueryConstraint[];
      const query = fsClient.query(ref, ...constraints);
      const snap = await fsClient.getDocs(query);
      return snap.docs
        .map((doc) => this.docToType(object, doc))
        .filter((doc) => doc !== undefined) as T[];
    } catch (e) {
      console.error(
        new Error(`[ClientDatabase] getDocuments:
          collection: ${collection},
          queryConstraints: ${queryConstraints},
          documentId: ${documentId},
          subcollection: ${subcollection},
        `),
        e
      );
      return [];
    }
  }

  async getCollectionGroupDocuments<T extends models.c.Serializable<T>>(
    object: T,
    subcollection: models.e.DatabaseSubcollection,
    queryConstraints: base_services.QueryConstraint[]
  ): Promise<T[]> {
    try {
      const ref = fsClient.collectionGroup(this.firestore, subcollection);
      const constraints = queryConstraints
        .map((value) => {
          switch (value.type) {
            case "limit": {
              return fsClient.limit(value.limit);
            }
            case "offset": {
              return fsClient.startAfter(value.offset);
            }
            case "orderBy": {
              return fsClient.orderBy(value.field, value.direction);
            }
            case "where": {
              return fsClient.where(value.field, value.operator, value.value);
            }
            default: {
              return undefined;
            }
          }
        })
        .filter((value) => value !== undefined) as fsClient.QueryConstraint[];
      const query = fsClient.query(ref, ...constraints);
      const snap = await fsClient.getDocs(query);
      return snap.docs
        .map((doc) => this.docToType(object, doc))
        .filter((doc) => doc !== undefined) as T[];
    } catch (e) {
      console.error(
        new Error(`[ClientDatabase] getCollectionGroupDocuments:
          subcollection: ${subcollection},
          queryConstraints: ${queryConstraints}
        `),
        e
      );
      return [];
    }
  }

  streamDocuments<T extends models.c.Serializable<T>>(
    onDocuments: (docs: T[]) => void,
    object: T,
    collection: models.e.DatabaseCollection,
    queryConstraints: base_services.QueryConstraint[],
    documentId?: string,
    subcollection?: models.e.DatabaseSubcollection
  ) {
    try {
      const paths: string[] = [];
      if (documentId && subcollection) {
        paths.push(...[documentId, subcollection]);
      }
      const ref = fsClient.collection(this.firestore, collection, ...paths);
      const constraints = queryConstraints
        .map((value) => {
          switch (value.type) {
            case "limit": {
              return fsClient.limit(value.limit);
            }
            case "orderBy": {
              return fsClient.orderBy(value.field, value.direction);
            }
            case "where": {
              return fsClient.where(value.field, value.operator, value.value);
            }
            default: {
              return undefined;
            }
          }
        })
        .filter((value) => value !== undefined) as fsClient.QueryConstraint[];
      const query = fsClient.query(ref, ...constraints);
      return fsClient.onSnapshot(query, (snap) => {
        const docs = snap.docs
          .map((doc) => this.docToType(object, doc))
          .filter((doc) => doc !== undefined) as T[];
        onDocuments(docs);
      });
    } catch (e) {
      console.error(
        new Error(`[ClientDatabase] streamDocuments:
          collection: ${collection},
          queryConstraints: ${queryConstraints},
          documentId: ${documentId},
          subcollection: ${subcollection},
        `),
        e
      );
      return undefined;
    }
  }

  streamDocumentsFromCollectionGroup<T extends models.c.Serializable<T>>(
    onDocuments: (docs: T[]) => void,
    object: T,
    collectionGroup: models.e.DatabaseSubcollection,
    queryConstraints: base_services.QueryConstraint[]
  ) {
    try {
      const ref = fsClient.collectionGroup(this.firestore, collectionGroup);
      const constraints = queryConstraints
        .map((value) => {
          switch (value.type) {
            case "limit": {
              return fsClient.limit(value.limit);
            }
            case "orderBy": {
              return fsClient.orderBy(value.field, value.direction);
            }
            case "where": {
              return fsClient.where(value.field, value.operator, value.value);
            }
            default: {
              return undefined;
            }
          }
        })
        .filter((value) => value !== undefined) as fsClient.QueryConstraint[];
      const query = fsClient.query(ref, ...constraints);
      return fsClient.onSnapshot(query, (snap) => {
        const docs = snap.docs
          .map((doc) => this.docToType(object, doc))
          .filter((doc) => doc !== undefined) as T[];
        onDocuments(docs);
      });
    } catch (e) {
      console.error(
        new Error(`[ClientDatabase] streamDocumentsFromCollectionGroup:
          collectionGroup: ${collectionGroup},
          queryConstraints: ${queryConstraints}
        `),
        e
      );
      return undefined;
    }
  }

  protected unpackValue(value: any): any {
    if (typeof value === "object") {
      if (Array.isArray(value)) {
        return value.map((val) => this.unpackValue(val));
      }
      if (value instanceof fsClient.GeoPoint) {
        return {
          latitude: value.latitude,
          longitude: value.longitude,
        } as models.i.GeoPoint;
      }
      if (value instanceof fsClient.Timestamp) {
        return value.toDate();
      }
      if (value === null) {
        return null;
      }
      return this.unpackMap(value);
    }
    return value;
  }
}
