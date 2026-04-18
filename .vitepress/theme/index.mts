import DefaultTheme from 'vitepress/theme'
import Quiz from './components/Quiz.vue'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    // 注册全局组件
    app.component('Quiz', Quiz)
  }
}
