import DefaultTheme from 'vitepress/theme'
import Quiz from './components/Quiz.vue'
import QuizSequential from './components/QuizSequential.vue'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    // 注册全局组件
    app.component('Quiz', Quiz)
    app.component('QuizSequential', QuizSequential)
  }
}
