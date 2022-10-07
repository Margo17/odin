import * as models from '../../../models'

export type QueryConstraint =
  | WhereConstraint
  | OrderByConstraint
  | LimitConstraint
  | OffsetConstraint
  | StartAfterConstraint

interface WhereConstraint {
  type: 'where'
  field: string
  operator:
    | '<'
    | '<='
    | '=='
    | '!='
    | '>='
    | '>'
    | 'array-contains'
    | 'in'
    | 'array-contains-any'
    | 'not-in'
  value: unknown
}

interface OrderByConstraint {
  type: 'orderBy'
  field: string
  direction: 'desc' | 'asc'
}

interface LimitConstraint {
  type: 'limit'
  limit: number
}

interface OffsetConstraint {
  type: 'offset'
  offset: number
}

interface StartAfterConstraint {
  type: 'startAfter'
  afterId: string
}

const databaseFieldValueNames = [
  'ArrayUnionTransform',
  'ArrayRemoveTransform',
  'DeleteTransform',
  'NumericIncrementTransform',
  'du',
  'fu',
  'uu',
  'wu',
  'mu',
  'gu',
  'Hb',
  'Vb',
  'El',
]

export abstract class Database {
  async getUser(userId: string) {
    return this.getDocument(
      new models.c.User(),
      models.e.DatabaseCollection.users,
      userId
    )
  }

  abstract createDocument(
    data: { [k: string]: any },
    collection: models.e.DatabaseCollection,
    documentId?: string,
    subcollection?: models.e.DatabaseSubcollection,
    subdocumentId?: string
  ): Promise<string | undefined>

  abstract setDocument(
    data: { [k: string]: any },
    collection: models.e.DatabaseCollection,
    documentId: string,
    subcollection?: models.e.DatabaseSubcollection,
    subdocumentId?: string
  ): Promise<string | undefined>

  abstract getDocument<T extends models.c.Serializable<T>>(
    object: T,
    collection: models.e.DatabaseCollection,
    documentId: string,
    subcollection?: models.e.DatabaseSubcollection,
    subdocumentId?: string
  ): Promise<T | undefined>

  abstract updateDocument(
    data: { [k: string]: any },
    collection: models.e.DatabaseCollection,
    documentId: string,
    subcollection?: models.e.DatabaseSubcollection,
    subdocumentId?: string
  ): Promise<boolean>

  abstract deleteDocument(
    collection: models.e.DatabaseCollection,
    documentId: string,
    subcollection?: models.e.DatabaseSubcollection,
    subdocumentId?: string
  ): Promise<boolean>

  abstract getDocuments<T extends models.c.Serializable<T>>(
    object: T,
    collection: models.e.DatabaseCollection,
    queryConstraints: QueryConstraint[],
    documentId?: string,
    subcollection?: models.e.DatabaseSubcollection
  ): Promise<T[]>

  abstract getCollectionGroupDocuments<T extends models.c.Serializable<T>>(
    object: T,
    subcollection: models.e.DatabaseSubcollection,
    queryConstraints: QueryConstraint[]
  ): Promise<T[]>

  /**
   * Get document by ids array.
   * @param object Typed class
   * @param collection collection
   * @param ids ids to
   * @param documentId provide if query in subcollection
   * @param subcollection subcollection
   * @returns
   */
  async getDocumentsByIds<T extends models.c.Serializable<T>>(
    object: T,
    collection: models.e.DatabaseCollection,
    ids: string[],
    documentId?: string,
    subcollection?: models.e.DatabaseSubcollection
  ) {
    try {
      const results: T[] = []
      const promises: Promise<T | undefined>[] = []
      if (documentId && subcollection)
        for (const _id of ids) {
          promises.push(
            this.getDocument(object, collection, documentId, subcollection, _id)
          )
        }
      else
        for (const _id of ids) {
          promises.push(this.getDocument(object, collection, _id))
        }
      const _premRes = await Promise.all(promises)
      for (const _r of _premRes) if (_r) results.push(_r)
      return results
    } catch (e) {
      console.error(
        Error(`[Database] getDocumentsByIds:
        collection: ${collection}
        ids: ${JSON.stringify(ids)},
        documentId: ${documentId}
        subcollection: ${subcollection}`),
        e
      )
      return []
    }
  }

  abstract getFieldValueDelete(): any
  abstract getFieldValueIncrement(number: number): any
  abstract getFieldValueArrayUnion(elements: any[]): any
  abstract getFieldValueArrayRemove(elements: any[]): any
  protected abstract isDatabaseField(value: any): boolean
  protected abstract geopoint(latitude: number, longitude: number): any
  protected abstract timestamp(date: Date): any
  protected abstract unpackValue(value: any): any

  public packMap(data: { [k: string]: any }) {
    const newData: { [k: string]: any } = {}
    for (const key in data) {
      const value = data[key]
      if (value !== undefined) newData[key] = this.packValue(value)
    }
    return newData
  }

  protected packValue(value: any): any {
    if (typeof value === 'object') {
      if (value === null) {
        return null
      } else if (Array.isArray(value)) {
        return value.map((val) => this.packValue(val))
      } else if ('latitude' in value && 'longitude' in value) {
        return this.geopoint(value.latitude, value.longitude)
      } else if (value instanceof Date) {
        return this.timestamp(value)
      } else {
        if (this.isDatabaseField(value)) return value
        return this.packMap(value)
      }
    } else {
      return value
    }
  }

  // protected packValue(value: any): any {
  //   if (typeof value === 'object') {
  //     if (value === null) {
  //       return null
  //     }
  //     if (Array.isArray(value)) {
  //       return value.map((val) => this.packValue(val))
  //     }
  //     if ('latitude' in value && 'longitude' in value) {
  //       return this.geopoint(value.latitude, value.longitude)
  //     }
  //     if (value instanceof Date) {
  //       return this.timestamp(value)
  //     }
  //     console.log('PACK VALUE')
  //     console.log(value.constructor?.name)
  //     if (databaseFieldValueNames.includes(value.constructor?.name))
  //       return value
  //     return this.packMap(value)
  //   }
  //   return value
  // }

  protected unpackMap(data: any) {
    const newData: { [k: string]: any } = {}
    for (const key in data) {
      newData[key] = this.unpackValue(data[key])
    }
    return newData
  }
}
