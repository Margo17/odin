import { messaging } from 'firebase-admin'

import { INotification } from '../../../models/interfaces'

export class ServerCommunication {
  private messaging: messaging.Messaging

  constructor(messaging: messaging.Messaging) {
    this.messaging = messaging
  }

  async sendNotification(
    tokens: string[],
    notification: INotification,
    languageCode: string
  ) {
    try {
      if (!tokens || tokens.length === 0 || !tokens[0]) {
        throw new Error('No tokens.')
      } else {
        await this.messaging.sendToDevice(
          tokens,
          {
            data: notification.data,
            notification: {
              title: notification.title[languageCode],
              body: notification.body[languageCode],
              clickAction: 'FLUTTER_NOTIFICATION_CLICK',
              sound: 'default',
            },
          },
          {
            restrictedPackageName: notification.restrictedPackageName,
          }
        )
        return true
      }
    } catch (e) {
      console.error(
        new Error(`[ServerCommunication] sendNotification: 
          tokens: ${tokens},
          notification: ${notification},
        `),
        e
      )
      return false
    }
  }

  /**
   * Send Flow Notification
   * @param tokens tokens
   * @param notification notification with advanced params
   * @param languageCode language code
   * @returns boolean
   */
  async sendFlowNotification(
    tokens: string[],
    notification: INotification,
    languageCode: string
  ) {
    try {
      if (!tokens || tokens.length === 0 || !tokens[0]) {
        throw new Error('No tokens.')
      } else {
        const payload: messaging.MessagingPayload = {
          data: notification.data ? notification.data : {},
          notification: {
            title: notification.title[languageCode],
            body: notification.body[languageCode],
            click_action: 'FLUTTER_NOTIFICATION_CLICK',
            action: notification.action,
            sound: 'default',
          },
        }

        const stdOptions: messaging.MessagingOptions = {} as any
        if (notification.timeToLive)
          stdOptions.timeToLive = notification.timeToLive
        else stdOptions.timeToLive = 86400 // one day default
        if (notification.restrictedPackageName)
          stdOptions.restrictedPackageName = notification.restrictedPackageName
        if (notification.priority) stdOptions.priority = notification.priority

        const fcmResponsePromises: Promise<messaging.MessagingDevicesResponse>[] =
          []
        for (const token of tokens) {
          fcmResponsePromises.push(
            this.messaging.sendToDevice(token, payload, stdOptions)
          )
        }

        return await Promise.all(fcmResponsePromises)
      }
    } catch (e) {
      console.error(
        new Error(`[ServerCommunication] sendFlowNotification: 
          tokens: ${tokens},
          notification: ${notification},
          languageCode: ${languageCode}
        `),
        e
      )
      return null
    }
  }
}
