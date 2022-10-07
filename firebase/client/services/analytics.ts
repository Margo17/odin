// import * as fbAnalytics from 'firebase/analytics'
// import * as shared from '@lastmile-lt/shared'
// import axios, { AxiosInstance } from 'axios'

// export interface AnalyticsSettings {
//   algolia: {
//     app_id: string
//     api_key: string
//   }
//   development: boolean
// }

// export class ClientAnalytics {
//   private settings: AnalyticsSettings
//   private analytics: fbAnalytics.Analytics
//   private algolia: AxiosInstance
//   private development: boolean

//   private userId: string | undefined
//   public initialized = false

//   constructor(settings: AnalyticsSettings, analytics: fbAnalytics.Analytics) {
//     this.settings = settings
//     this.analytics = analytics
//     this.algolia = axios.create({
//       baseURL: 'https://insights.algolia.io/1/',
//       headers: {
//         'X-Algolia-Application-Id': settings.algolia.app_id,
//         'X-Algolia-API-Key': settings.algolia.api_key,
//         'Content-Type': 'application/json',
//       },
//     })
//     this.development = settings.development
//   }

//   initialize() {
//     try {
//       fbAnalytics.setAnalyticsCollectionEnabled(this.analytics, true)
//       this.initialized = true
//     } catch (e) {
//       if (this.development)
//         console.error(new Error(`[ClientAnalytics] initialize`), e)
//     }
//   }

//   setCurrentScreen(name: string) {
//     try {
//       if (!this.initialized) return
//       fbAnalytics.setCurrentScreen(this.analytics, name)
//     } catch (e) {
//       if (this.development)
//         console.error(
//           new Error(`[ClientAnalytics] setCurrentScreen:
//           name: ${name},
//         `),
//           e
//         )
//     }
//   }

//   logSignUp(method: string) {
//     try {
//       if (!this.initialized) return
//       fbAnalytics.logEvent(this.analytics, 'sign_up', { method })
//     } catch (e) {
//       if (this.development)
//         console.error(
//           new Error(`[ClientAnalytics] logSignUp:
//           method: ${method},
//         `),
//           e
//         )
//     }
//   }

//   setUserId(userId?: string) {
//     this.userId = userId
//     try {
//       if (!this.initialized) return
//       if (userId) {
//         fbAnalytics.logEvent(this.analytics, 'login')
//         fbAnalytics.setUserId(this.analytics, userId)
//       } else {
//         fbAnalytics.setUserId(this.analytics, '')
//       }
//     } catch (e) {
//       if (this.development)
//         console.error(
//           new Error(`[ClientAnalytics] setUserId:
//           userId: ${userId},
//         `),
//           e
//         )
//     }
//   }

//   setUserData(data: {
//     name?: string
//     email?: string
//     phone?: string
//     language?: string
//     cityId?: string
//   }) {
//     try {
//       if (!this.initialized) return
//       const body: { [k: string]: string } = {}
//       if (data.name) body.name = data.name
//       if (data.email) body.email = data.email
//       if (data.phone) body.phone = data.phone
//       if (data.language) body.language = data.language
//       if (data.cityId) body.cityId = data.cityId
//       fbAnalytics.setUserProperties(this.analytics, body)
//       // webengage.updateUser(body);
//     } catch (e) {
//       if (this.development)
//         console.error(
//           new Error(`[ClientAnalytics] setUserData:
//           data: ${data},
//         `),
//           e
//         )
//     }
//   }

//   async logAddToCart(
//     product: shared.models.c.ViewProduct,
//     hasLoyaltyCard: boolean,
//     currency: string,
//     quantity: number
//   ) {
//     try {
//       if (!this.initialized) return
//       const body = this.convertProductEventToBody(
//         product,
//         hasLoyaltyCard,
//         currency,
//         quantity
//       )
//       fbAnalytics.logEvent(this.analytics, 'add_to_cart', body.analytics)

//       if (this.userId)
//         await this.algolia.post('events', {
//           eventType: 'conversion',
//           eventName: 'add_to_cart',
//           index: 'products',
//           userToken: this.userId,
//           objectIDs: [`${product.id}_${product.chainId}`],
//         })
//     } catch (e) {
//       if (this.development)
//         console.error(
//           new Error(`[ClientAnalytics] logAddToCart:
//           product: ${product},
//           currency: ${currency},
//           quantity: ${quantity}
//         `),
//           e
//         )
//     }
//   }

//   logRemoveFromCart(
//     product: shared.models.c.ViewProduct,
//     hasLoyaltyCard: boolean,
//     currency: string,
//     quantity: number
//   ) {
//     try {
//       if (!this.initialized) return
//       const body = this.convertProductEventToBody(
//         product,
//         hasLoyaltyCard,
//         currency,
//         quantity
//       )
//       fbAnalytics.logEvent(this.analytics, 'remove_from_cart', body.analytics)
//     } catch (e) {
//       if (this.development)
//         console.error(
//           new Error(`[ClientAnalytics] logRemoveFromCart:
//           product: ${product},
//           currency: ${currency},
//           quantity: ${quantity}
//         `),
//           e
//         )
//     }
//   }

//   logUpdateCarts(
//     cartHeaderId: string,
//     currency: string,
//     carts: shared.models.c.Cart[]
//   ) {
//     try {
//       if (!this.initialized) return
//       const body = this.convertCartsToBody(
//         'update_cart',
//         carts,
//         currency,
//         cartHeaderId
//       )
//       // webengage.trackEvent('update_cart', body.webEngage);
//     } catch (e) {
//       if (this.development)
//         console.error(
//           new Error(`[ClientAnalytics] logUpdateCarts:
//           cartHeaderId: ${cartHeaderId},
//           currency: ${currency},
//           carts: ${carts}
//         `),
//           e
//         )
//     }
//   }

//   logAddPaymentInfo() {
//     try {
//       if (!this.initialized) return
//       fbAnalytics.logEvent(this.analytics, 'add_payment_info')
//     } catch (e) {
//       if (this.development)
//         console.error(new Error(`[ClientAnalytics] logAddPaymentInfo`), e)
//     }
//   }

//   async logViewItem(
//     product: shared.models.c.ViewProduct,
//     hasLoyaltyCard: boolean,
//     currency: string
//   ) {
//     try {
//       if (!this.initialized) return
//       const body = this.convertProductEventToBody(
//         product,
//         hasLoyaltyCard,
//         currency
//       )
//       fbAnalytics.logEvent(this.analytics, 'view_item', body.analytics)

//       if (this.userId)
//         await this.algolia.post('events', {
//           events: [
//             {
//               eventType: 'view',
//               eventName: 'view_item',
//               index: 'products',
//               userToken: this.userId,
//               objectIDs: [`${product.id}_${product.chainId}`],
//             },
//           ],
//         })
//     } catch (e) {
//       if (this.development)
//         console.error(
//           new Error(`[ClientAnalytics] logViewItem:
//           product: ${product},
//           currency: ${currency},
//         `),
//           e
//         )
//     }
//   }

//   logViewItemList(category: shared.models.c.Category) {
//     try {
//       if (!this.initialized) return
//       fbAnalytics.logEvent(this.analytics, 'view_item_list', {
//         item_list_id: category.id,
//         item_list_name: category.name.en,
//       })
//       // webengage.trackEvent('view_item_list', {
//       //   item_category: category.id,
//       //   item_category_name: category.name.en,
//       // });
//     } catch (e) {
//       if (this.development)
//         console.error(
//           new Error(`[ClientAnalytics] logViewItemList:
//           category: ${category},
//         `),
//           e
//         )
//     }
//   }

//   logSelectContent(
//     contentType: 'mall' | 'banner' | 'chain',
//     contentId: string
//   ) {
//     try {
//       if (!this.initialized) return
//       fbAnalytics.logEvent(this.analytics, 'select_content', {
//         content_type: contentType,
//         item_id: contentId,
//       })
//       // webengage.trackEvent('select_content', {
//       //   content_type: contentType,
//       //   item_id: contentId,
//       // });
//     } catch (e) {
//       if (this.development)
//         console.error(
//           new Error(`[ClientAnalytics] logSelectContent:
//           contentType: ${contentType},
//           contentId: ${contentId},
//         `),
//           e
//         )
//     }
//   }

//   logSearch(searchTerm: string) {
//     try {
//       if (!this.initialized) return
//       fbAnalytics.logEvent(this.analytics, 'search', {
//         search_term: searchTerm,
//       })
//       // webengage.trackEvent('search', {
//       //   search_term: searchTerm,
//       // });
//     } catch (e) {
//       if (this.development)
//         console.error(
//           new Error(`[ClientAnalytics] logSearch:
//           searchTerm: ${searchTerm},
//         `),
//           e
//         )
//     }
//   }

//   async logBeginCheckout(
//     cartHeaderId: string,
//     currency: string,
//     carts: shared.models.c.Cart[]
//   ) {
//     try {
//       if (!this.initialized) return
//       const body = this.convertCartsToBody(
//         'begin_checkout',
//         carts,
//         currency,
//         cartHeaderId
//       )
//       fbAnalytics.logEvent(this.analytics, 'begin_checkout', body.analytics)
//       // webengage.trackEvent('begin_checkout', body.webEngage);
//       if (this.userId) await this.algolia.post('events', body.algolia)
//     } catch (e) {
//       if (this.development)
//         console.error(
//           new Error(`[ClientAnalytics] logBeginCheckout:
//           cartHeaderId: ${cartHeaderId},
//           currency: ${currency},
//           carts: ${carts},
//         `),
//           e
//         )
//     }
//   }

//   logCheckoutSelectAddress(clientOrderHeaderId: string) {
//     try {
//       if (!this.initialized) return
//       fbAnalytics.logEvent(this.analytics, 'checkout_select_address', {
//         transaction_id: clientOrderHeaderId,
//       })
//       // webengage.trackEvent('checkout_select_address', {
//       //   transaction_id: clientOrderHeaderId,
//       // });
//     } catch (e) {
//       if (this.development)
//         console.error(
//           new Error(`[ClientAnalytics] logCheckoutSelectAddress:
//           clientOrderHeaderId: ${clientOrderHeaderId},
//         `),
//           e
//         )
//     }
//   }

//   logCheckoutSelectDeliveryTime(clientOrderHeaderId: string) {
//     try {
//       if (!this.initialized) return
//       fbAnalytics.logEvent(this.analytics, 'checkout_select_delivery_time', {
//         transaction_id: clientOrderHeaderId,
//       })
//       // webengage.trackEvent('checkout_select_delivery_time', {
//       //   transaction_id: clientOrderHeaderId,
//       // });
//     } catch (e) {
//       if (this.development)
//         console.error(
//           new Error(`[ClientAnalytics] logCheckoutSelectDeliveryTime:
//           clientOrderHeaderId: ${clientOrderHeaderId},
//         `),
//           e
//         )
//     }
//   }

//   logCheckoutSelectPaymentMethod(clientOrderHeaderId: string) {
//     try {
//       if (!this.initialized) return
//       fbAnalytics.logEvent(this.analytics, 'checkout_select_payment_method', {
//         transaction_id: clientOrderHeaderId,
//       })
//       // webengage.trackEvent('checkout_select_payment_method', {
//       //   transaction_id: clientOrderHeaderId,
//       // });
//     } catch (e) {
//       if (this.development)
//         console.error(
//           new Error(`[ClientAnalytics] logCheckoutSelectPaymentMethod:
//           clientOrderHeaderId: ${clientOrderHeaderId},
//         `),
//           e
//         )
//     }
//   }

//   async logEcommercePurchase(
//     clientOrderHeaderId: string,
//     currency: string,
//     carts: shared.models.c.Cart[],
//     promoCode?: string,
//     cityId?: string
//   ) {
//     try {
//       if (!this.initialized) return
//       const body = this.convertCartsToBody(
//         'ecommerce_purchase',
//         carts,
//         currency,
//         clientOrderHeaderId,
//         promoCode,
//         cityId
//       )
//       fbAnalytics.logEvent(this.analytics, 'purchase', body.analytics)
//       // webengage.trackEvent('ecommerce_purchase', body.webEngage);

//       if (this.userId) await this.algolia.post('events', body.algolia)
//     } catch (e) {
//       if (this.development)
//         console.error(
//           new Error(`[ClientAnalytics] logEcommercePurchase:
//           clientOrderHeaderId: ${clientOrderHeaderId},
//           currency: ${currency},
//           carts: ${carts},
//           promoCode: ${promoCode},
//           cityId: ${cityId},
//         `),
//           e
//         )
//     }
//   }

//   private convertProductEventToBody(
//     product: shared.models.c.ViewProduct,
//     hasLoyaltyCard: boolean,
//     currency: string,
//     quantity?: number
//   ) {
//     const body = this.convertProductToBody(product, hasLoyaltyCard, quantity)

//     return {
//       analytics: {
//         currency,
//         value: body.webEngage.value,
//         items: [body.analytics],
//       },
//     }
//   }

//   private convertProductToBody(
//     product: shared.models.c.ViewProduct,
//     hasLoyaltyCard: boolean,
//     quantity?: number
//   ) {
//     const analytics: AnalyticsItem = {
//       item_id: product.id,
//       item_name: product.name.en,
//       item_category: product.categoryId,
//       price: product.actualPrice(hasLoyaltyCard),
//     }
//     if (quantity) {
//       analytics.quantity = quantity
//     }
//     return {
//       analytics,
//     }
//   }
// }

// interface AnalyticsItem {
//   item_id: string
//   item_name: string
//   item_category: string
//   price: number
//   quantity?: number
// }

// interface AlgoliaEvent {
//   eventType: 'conversion' | 'view'
//   eventName: string
//   index: 'products'
//   userToken: string
//   objectIDs: string[]
// }
export {}
