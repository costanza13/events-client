import { fetchJson, fetchUploadImage } from './api-helpers'
import { red } from 'logger'
import { pink } from 'logger'

export default {
  events: {
    async create(event) {
      try {
        const data = await fetchJson(
          '/events',
          {
            method: 'POST',
            body: JSON.stringify(event)
          }
        )
        return data
      }
      catch (e) {
        red('api.events.create', e)
      }
      
    },
    async read() {
      try {
        const data = await fetchJson(
          '/events',
          {
            method: 'GET',
          }
        )
        return data
      }
      catch (e) {
        red('api.events.read', e)
      }
    },
    async patch(event) {
      try {
        // pink('api.patch: event', event)
        const _id = event._id
        const data = await fetchJson(
          `/events/${_id}`,
          {
            method: 'PATCH',
            body: JSON.stringify(event)
          }
        )
        // pink('api.patch: event', event)
        return data
      }
      catch (e) {
        red('api.events.patch', e)
      }
      
    },
    async search(event) {
      const searchUrl = '/search?searchTerm=' + JSON.stringify(event)
      const data = await fetchJson(
        searchUrl,
        {
          method: 'GET',
        }
      )
      return data
    },
  },
  images: {
    create(formData) {
      // pink('api.images: formData', formData)
      return fetchUploadImage(
        '/images',
        {
          method: 'POST',
          body: formData
        }
      ).then(data => {
        // pink('/images/create', data)
        return data
      }).catch(e => {
        red('api.images.create: ERROR: ', e)
      })
    },
    getTest() {
      return fetchJson(
        '/images/test',
        { method: 'GET' }
      ).then(data => {
        // pink('api.images.getTest: data', data)
        return data
      }).catch(e => {
        red('api.images.getTest ERROR: ', e)
      })
    }
  },
  // for possible future use
  // tags: {
  //   async create(tag) {
  //     try {
  //       // pink('tag', tag)
  //       const data = await fetchJson(
  //         '/tags',
  //         {
  //           method: 'POST',
  //           body: JSON.stringify(tag)
  //         }
  //       )
  //       return data
  //     }
  //     catch (e) {
  //       red('api.images.getTest ERROR: ', e)
  //     }
  //   }
  // }
}
