import * as i from '../interfaces'
import { Serializable } from './serializable'

export class Notification
  extends Serializable<Notification>
  implements i.INotification
{
  id: string = ''

  action: string = ''

  body: { [k: string]: string } = {}

  data: { [key: string]: string } = {}

  isUrgent: boolean = false

  restrictedPackageName: string = ''

  timeToLive?: number

  priority?: 'high'

  title: { [k: string]: string } = {}

  constructor(data?: Partial<i.INotification>) {
    super()
    if (data) Object.assign(this, data)
  }

  protected create(data?: any): Notification {
    return new Notification(data)
  }

  // public rebuild(
  //   additionalData: { [k: string]: string },
  //   selectedLanguageCode: string = 'en'
  // ) {
  //   for (const replaceKey in additionalData) {
  //     if (replaceKey.startsWith('_sharp')) {
  //       this.body[selectedLanguageCode] = this.body[
  //         selectedLanguageCode
  //       ].replace('#', additionalData[replaceKey])
  //     } else {
  //       for (const key in this.data) {
  //         this.data[key] = this.data[key].replace(
  //           `__${replaceKey}__`,
  //           additionalData[replaceKey]
  //         )
  //       }
  //     }
  //   }
  // }
}

export class NotificationLog
  extends Serializable<NotificationLog>
  implements i.INotificationLog
{
  constructor(data?: Partial<i.INotificationLog>) {
    super()
    if (data) Object.assign(this, data)
  }

  id: string = ''

  caller: string = ''

  status: 'DONE' | 'SENDING' = 'SENDING'

  tag: string = ''

  date: Date = new Date()

  data: { [key: string]: string } | null = null

  userId: string = ''

  isOpened: boolean = false

  isUrgent: boolean = false

  message: string = ''

  stack: any

  groupedClientOrderIds?: string[] | undefined

  protected create(data?: any): NotificationLog {
    return new NotificationLog(data)
  }
}
