<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  // 题目列表: [{ question, options, answer, hint }]
  questions: {
    type: Array,
    required: true
  }
})

const currentIndex = ref(0)
const selectedOption = ref(null)
const userInput = ref('')
const isCorrect = ref(false)
const showFeedback = ref(false)
const isFinished = ref(false)
const hasSubmitted = ref(false)

const currentQuestion = computed(() => props.questions[currentIndex.value])

const checkAnswer = () => {
  const answerToCompare = currentQuestion.value.options 
    ? selectedOption.value 
    : userInput.value.trim().toLowerCase()
    
  if (answerToCompare === null || (typeof answerToCompare === 'string' && !answerToCompare.trim())) return
  
  hasSubmitted.value = true
  const correctAnswer = currentQuestion.value.answer.toString().trim().toLowerCase()
  
  if (answerToCompare.toString().trim().toLowerCase() === correctAnswer) {
    isCorrect.value = true
    showFeedback.value = true
  } else {
    isCorrect.value = false
    showFeedback.value = true
  }
}

const nextQuestion = () => {
  if (currentIndex.value < props.questions.length - 1) {
    currentIndex.value++
    userInput.value = ''
    selectedOption.value = null
    isCorrect.value = false
    showFeedback.value = false
    hasSubmitted.value = false
  } else {
    isFinished.value = true
  }
}

const selectOption = (opt) => {
  if (isCorrect.value) return
  selectedOption.value = opt
  hasSubmitted.value = false
  showFeedback.value = false
}

const restart = () => {
  currentIndex.value = 0
  selectedOption.value = null
  userInput.value = ''
  isCorrect.value = false
  showFeedback.value = false
  isFinished.value = false
  hasSubmitted.value = false
}
</script>

<template>
  <div class="quiz-container">
    <div v-if="!isFinished">
      <div class="quiz-header">
        <span class="quiz-progress">问题 {{ currentIndex + 1 }} / {{ questions.length }}</span>
      </div>
      
      <div class="quiz-question-box">
        <div class="quiz-question">{{ currentQuestion.question }}</div>
      </div>
      
      <!-- 选择题模式 -->
      <div v-if="currentQuestion.options" class="quiz-options">
        <button 
          v-for="(opt, idx) in currentQuestion.options" 
          :key="idx"
          @click="selectOption(opt)"
          class="option-btn"
          :class="{ 
            'active': selectedOption === opt,
            'correct': isCorrect && selectedOption === opt,
            'wrong': hasSubmitted && !isCorrect && selectedOption === opt
          }"
          :disabled="isCorrect"
        >
          <span class="option-index">{{ String.fromCharCode(65 + idx) }}.</span>
          <span class="option-text">{{ opt }}</span>
        </button>
      </div>

      <!-- 填空题模式 (备选) -->
      <div v-else class="quiz-input-group">
        <input 
          v-model="userInput" 
          @keyup.enter="!isCorrect ? checkAnswer() : null"
          placeholder="请输入你的答案..."
          :disabled="isCorrect"
          class="quiz-input"
          :class="{ 'input-success': isCorrect, 'input-error': hasSubmitted && !isCorrect }"
        />
      </div>

      <div class="quiz-actions">
        <button 
          v-if="!isCorrect"
          @click="checkAnswer" 
          :disabled="(currentQuestion.options ? !selectedOption : !userInput.trim())"
          class="submit-btn"
        >
          提交答案
        </button>
        <button 
          v-else
          @click="nextQuestion" 
          class="next-btn"
        >
          {{ currentIndex < questions.length - 1 ? '下一题' : '查看结果' }}
        </button>
      </div>

      <Transition name="fade">
        <div v-if="showFeedback" class="quiz-feedback">
          <div v-if="isCorrect" class="result-success">
            <span class="icon">✅</span> 恭喜你，答对了！
          </div>
          <div v-else class="result-error">
            <span class="icon">❌</span> 答案不太对，再试一次吧。
            <p v-if="currentQuestion.hint" class="hint-text">
              <strong>提示：</strong>{{ currentQuestion.hint }}
            </p>
          </div>
        </div>
      </Transition>
    </div>
    
    <div v-else class="quiz-finished">
      <div class="finish-icon">🏆</div>
      <p class="finish-msg">太棒了！你已经完成了所有练习。</p>
      <button @click="restart" class="reset-btn">重新挑战</button>
    </div>
  </div>
</template>

<style scoped>
.quiz-container {
  margin: 2rem 0;
  padding: 2rem;
  border: 2px solid var(--vp-c-brand);
  border-radius: 16px;
  background-color: var(--vp-c-bg-soft);
  box-shadow: 0 8px 24px rgba(0,0,0,0.08);
  transition: all 0.3s ease;
}

.quiz-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.quiz-progress {
  font-size: 0.9rem;
  font-weight: bold;
  color: var(--vp-c-brand);
  background: var(--vp-c-brand-soft);
  padding: 4px 12px;
  border-radius: 20px;
}

.quiz-question-box {
  min-height: 80px;
  display: flex;
  align-items: center;
  margin-bottom: 2rem;
}

.quiz-question {
  font-size: 1.4rem;
  font-weight: 700;
  color: var(--vp-c-text-1);
  line-height: 1.5;
}

.quiz-options {
  display: grid;
  grid-template-columns: 1fr;
  gap: 0.8rem;
  margin-bottom: 1.5rem;
}

.option-btn {
  display: flex;
  align-items: center;
  padding: 1rem 1.2rem;
  border: 2px solid var(--vp-c-divider);
  border-radius: 12px;
  background-color: var(--vp-c-bg);
  text-align: left;
  cursor: pointer;
  transition: all 0.2s;
}

.option-btn:hover:not(:disabled) {
  border-color: var(--vp-c-brand);
  background-color: var(--vp-c-bg-mute);
}

.option-btn.active {
  border-color: var(--vp-c-brand);
  background-color: var(--vp-c-brand-soft);
}

.option-btn.correct {
  border-color: #42b883;
  background-color: rgba(66, 184, 131, 0.1);
}

.option-btn.wrong {
  border-color: #ed3c50;
  background-color: rgba(237, 60, 80, 0.1);
}

.option-index {
  font-weight: bold;
  margin-right: 0.8rem;
  color: var(--vp-c-brand);
}

.option-text {
  flex: 1;
  color: var(--vp-c-text-1);
  font-size: 1rem;
}

.quiz-actions {
  display: flex;
  justify-content: center;
  margin-bottom: 1.5rem;
}

.quiz-input-group {
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.quiz-input {
  flex: 1;
  padding: 1rem 1.2rem;
  border: 2px solid var(--vp-c-divider);
  border-radius: 12px;
  background-color: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  font-size: 1.1rem;
  transition: border-color 0.2s, box-shadow 0.2s;
}

.quiz-input:focus {
  outline: none;
  border-color: var(--vp-c-brand);
  box-shadow: 0 0 0 3px var(--vp-c-brand-soft);
}

.input-success {
  border-color: #42b883 !important;
  background-color: rgba(66, 184, 131, 0.05);
}

.input-error {
  border-color: #ed3c50 !important;
}

.submit-btn, .next-btn {
  padding: 0 2rem;
  border-radius: 12px;
  font-weight: 700;
  cursor: pointer;
  transition: transform 0.1s, opacity 0.2s;
  border: none;
}

.submit-btn {
  background-color: var(--vp-c-brand);
  color: white;
}

.submit-btn:hover {
  opacity: 0.9;
}

.submit-btn:active {
  transform: scale(0.95);
}

.submit-btn:disabled {
  background-color: var(--vp-c-gray-3);
  cursor: not-allowed;
}

.next-btn {
  background-color: #42b883;
  color: white;
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
}

.quiz-feedback {
  padding: 1rem;
  border-radius: 12px;
  background-color: var(--vp-c-bg-mute);
}

.result-success {
  color: #42b883;
  font-weight: 700;
  font-size: 1.1rem;
}

.result-error {
  color: #ed3c50;
  font-weight: 700;
  font-size: 1.1rem;
}

.hint-text {
  margin-top: 0.8rem;
  font-size: 0.95rem;
  color: var(--vp-c-text-2);
  font-weight: normal;
  border-left: 4px solid var(--vp-c-brand);
  padding-left: 1rem;
}

.quiz-finished {
  text-align: center;
  padding: 2rem 0;
}

.finish-icon {
  font-size: 4rem;
  margin-bottom: 1rem;
}

.finish-msg {
  font-size: 1.5rem;
  color: var(--vp-c-brand);
  font-weight: 800;
  margin-bottom: 2rem;
}

.reset-btn {
  padding: 0.8rem 2.5rem;
  background-color: transparent;
  border: 2px solid var(--vp-c-brand);
  color: var(--vp-c-brand);
  border-radius: 30px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s;
}

.reset-btn:hover {
  background-color: var(--vp-c-brand);
  color: white;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>
