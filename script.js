const JSON_PATH = '../../comment.json'
const LIMIT = 30
const app = Vue.createApp({
  setup() {
    document.body.removeAttribute('hidden')
  },
  data () {
    return {
      comments: []
    }
  },
  methods: {
    getClassName(comment) {
      if (comment.commentIndex % 2 === 0) {
        return 'comment even'
      }
      return 'comment odd'
    },
    getStyle(comment) {
      if (comment.service === 'youtube' && comment.data.colors) {
        const style = {
          '--lcv-background-color': comment.data.colors.bodyBackgroundColor,
          '--lcv-text-color': comment.data.colors.bodyTextColor,
          '--lcv-comment-shadow': 'none'
        }
        return style
      }
      if (comment.service === 'bilibili' && comment.data.colors) {
        const style = {
          '--lcv-background-color': comment.data.colors.backgroundBottomColor,
          '--lcv-text-color': comment.data.colors.messageFontColor,
          '--lcv-comment-shadow': 'none'
        }
        return style
      }
    }
  },
  mounted () {
    let cache = new Map()
    commentIndex = 0
    OneSDK.setup({
      jsonPath: JSON_PATH,
      commentLimit: LIMIT
    })
    OneSDK.subscribe({
      action: 'comments',
      callback: (comments) => {
        const newCache = new Map()
        comments.forEach(comment => {
          comment4mj(comment)
          const index = cache.get(comment.data.id)
          if (isNaN(index)) {
            comment.commentIndex = commentIndex
            newCache.set(comment.data.id, commentIndex)
            ++commentIndex
          } else {
            comment.commentIndex = index
            newCache.set(comment.data.id, index)
          }
        })
        cache = newCache
        this.comments = comments
      }
    })
    OneSDK.connect()
  },
})
OneSDK.ready().then(() => {
  app.mount("#container")
})
