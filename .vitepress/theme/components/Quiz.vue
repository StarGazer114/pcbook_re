<script setup>
import { ref } from 'vue'

const props = defineProps({
  question: String,
  options: Array,
  answer: String,
  hint: String
})

const selectedOption = ref(null)
const isSubmitted = ref(false)
const isCorrect = ref(false)
const showHint = ref(false)

const submitAnswer = (option) => {
  if (isSubmitted.value) return
  selectedOption.value = option
  isSubmitted.value = true
  isCorrect.value = option === props.answer
}

const reset = () => {
  selectedOption.value = null
  isSubmitted.value = false
  isCorrect.value = false
  showHint.value = false
}
</script>

<template>
  <div class="quiz-container">
    <div class="quiz-question">{{ question }}</div>
    
    <div class="quiz-options">
      <button 
        v-for="option in options" 
        :key="option"
        @click="submitAnswer(option)"
        :class="{
          'option-btn': true,
          'selected': selectedOption === option,
          'correct': isSubmitted && option === answer,
          'wrong': isSubmitted && selectedOption === option && option !== answer,
          'disabled': isSubmitted
        }"
      >
        {{ option }}
      </button>
    </div>

    <div v-if="isSubmitted" class="quiz-result">
      <p v-if="isCorrect" class="result-success">🎉 回答正确！</p>
      <div v-else>
        <p class="result-error">❌ 回答错误，再想想？</p>
        <button v-if="hint && !showHint" @click="showHint = true" class="hint-toggle">查看提示</button>
        <p v-if="showHint" class="hint-text"><strong>提示：</strong>{{ hint }}</p>
      </div>
      <button @click="reset" class="reset-btn">重题</button>
    </div>
  </div>
</template>

<style scoped>
.quiz-container {
  margin: 2rem 0;
  padding: 1.5rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background-color: var(--vp-c-bg-soft);
}

.quiz-question {
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: var(--vp-c-text-1);
}

.quiz-options {
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
}

.option-btn {
  padding: 0.8rem 1rem;
  text-align: left;
  border: 1px solid var(--vp-c-brand);
  border-radius: 6px;
  background-color: var(--vp-c-bg);
  color: var(--vp-c-brand);
  cursor: pointer;
  transition: all 0.2s ease;
}

.option-btn:hover:not(.disabled) {
  background-color: var(--vp-c-brand-soft);
}

.option-btn.selected {
  background-color: var(--vp-c-brand);
  color: white;
}

.option-btn.correct {
  background-color: #42b883;
  border-color: #42b883;
  color: white;
}

.option-btn.wrong {
  background-color: #ed3c50;
  border-color: #ed3c50;
  color: white;
}

.option-btn.disabled {
  cursor: default;
}

.quiz-result {
  margin-top: 1.5rem;
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

.hint-toggle {
  font-size: 0.9rem;
  color: var(--vp-c-brand);
  text-decoration: underline;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
}

.hint-text {
  margin-top: 0.5rem;
  font-size: 0.95rem;
  font-style: italic;
  color: var(--vp-c-text-2);
}

.reset-btn {
  margin-top: 1rem;
  padding: 0.5rem 1rem;
  font-size: 0.9rem;
  border-radius: 4px;
  background-color: var(--vp-c-bg-mute);
  border: 1px solid var(--vp-c-divider);
  cursor: pointer;
}

.reset-btn:hover {
  background-color: var(--vp-c-bg-soft);
}
</style>
