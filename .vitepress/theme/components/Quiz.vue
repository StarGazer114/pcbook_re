<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  // 兼容单题模式
  question: String,
  answer: String,
  hint: String,
  // 多题模式：[{ question, answer, hint }]
  questions: {
    type: Array,
    default: null
  }
})

const currentIndex = ref(0)
const userInput = ref('')
const isCorrect = ref(false)
const showFeedback = ref(false)
const isFinished = ref(false)

const currentQuestions = computed(() => {
  if (props.questions && props.questions.length > 0) {
    return props.questions
  }
  return [{
    question: props.question,
    answer: props.answer,
    hint: props.hint
  }]
})

const currentQuestion = computed(() => currentQuestions.value[currentIndex.value])

const checkAnswer = () => {
  if (!userInput.value.trim()) return
  
  const userAnswer = userInput.value.trim().toLowerCase()
  const correctAnswer = currentQuestion.value.answer.toString().trim().toLowerCase()
  
  if (userAnswer === correctAnswer) {
    isCorrect.value = true
    showFeedback.value = true
    
    // 延迟进入下一题
    setTimeout(() => {
      if (currentIndex.value < currentQuestions.value.length - 1) {
        currentIndex.value++
        userInput.value = ''
        isCorrect.value = false
        showFeedback.value = false
      } else {
        isFinished.value = true
      }
    }, 1000)
  } else {
    isCorrect.value = false
    showFeedback.value = true
  }
}

const restart = () => {
  currentIndex.value = 0
  userInput.value = ''
  isCorrect.value = false
  showFeedback.value = false
  isFinished.value = false
}
</script>

<template>
  <div class="quiz-container">
    <div v-if="!isFinished">
      <div class="quiz-header">
        <span class="quiz-progress">进度: {{ currentIndex + 1 }} / {{ currentQuestions.length }}</span>
      </div>
      
      <div class="quiz-question">{{ currentQuestion.question }}</div>
      
      <div class="quiz-input-group">
        <input 
          v-model="userInput" 
          @keyup.enter="checkAnswer"
          placeholder="请输入你的答案..."
          :disabled="isCorrect && showFeedback"
          class="quiz-input"
        />
        <button 
          @click="checkAnswer" 
          :disabled="(isCorrect && showFeedback) || !userInput.trim()"
          class="submit-btn"
        >
          提交
        </button>
      </div>

      <div v-if="showFeedback" class="quiz-feedback">
        <p v-if="isCorrect" class="result-success">
          🎉 回答正确！{{ currentIndex < currentQuestions.length - 1 ? '即将进入下一题...' : '' }}
        </p>
        <div v-else>
          <p class="result-error">❌ 不太对，再想想？</p>
          <p v-if="currentQuestion.hint" class="hint-text">
            <strong>提示：</strong>{{ currentQuestion.hint }}
          </p>
        </div>
      </div>
    </div>
    
    <div v-else class="quiz-finished">
      <p class="finish-msg">🎊 太棒了！你已经完成了本节的所有练习。</p>
      <button @click="restart" class="reset-btn">重新开始</button>
    </div>
  </div>
</template>

<style scoped>
.quiz-container {
  margin: 2rem 0;
  padding: 1.5rem;
  border: 2px solid var(--vp-c-brand-soft);
  border-radius: 12px;
  background-color: var(--vp-c-bg-soft);
  box-shadow: 0 4px 6px rgba(0,0,0,0.05);
}

.quiz-header {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 0.5rem;
}

.quiz-progress {
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
  background: var(--vp-c-bg-mute);
  padding: 2px 8px;
  border-radius: 10px;
}

.quiz-question {
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  color: var(--vp-c-text-1);
  line-height: 1.4;
}

.quiz-input-group {
  display: flex;
  gap: 0.5rem;
}

.quiz-input {
  flex: 1;
  padding: 0.8rem 1rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background-color: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  font-size: 1rem;
}

.quiz-input:focus {
  outline: none;
  border-color: var(--vp-c-brand);
}

.submit-btn {
  padding: 0.8rem 1.5rem;
  background-color: var(--vp-c-brand);
  color: white;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: opacity 0.2s;
}

.submit-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.quiz-feedback {
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px dashed var(--vp-c-divider);
}

.result-success {
  color: #42b883;
  font-weight: bold;
}

.result-error {
  color: #ed3c50;
  font-weight: bold;
}

.hint-text {
  margin-top: 0.5rem;
  font-size: 0.9rem;
  color: var(--vp-c-text-2);
  background: var(--vp-c-bg-mute);
  padding: 0.5rem;
  border-radius: 4px;
}

.quiz-finished {
  text-align: center;
  padding: 1rem 0;
}

.finish-msg {
  font-size: 1.2rem;
  color: var(--vp-c-brand);
  font-weight: bold;
  margin-bottom: 1rem;
}

.reset-btn {
  padding: 0.5rem 1.5rem;
  background-color: var(--vp-c-bg-mute);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  cursor: pointer;
}

.reset-btn:hover {
  background-color: var(--vp-c-bg-soft);
}
</style>
