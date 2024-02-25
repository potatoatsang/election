<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useGameStore } from '@/stores/gameStore';
import { useRouter } from 'vue-router';

const gameStore = useGameStore();
const isHome = computed(() => {
  return gameStore.isHome;
});
const questions = computed(() => {
  return gameStore.questions;
});

const currentWith = ref(10);
const index = ref(0);
const selectAnsId = ref('');
const setSelectAnsId = (select: string) => {
  selectAnsId.value = select;
}
const nextQuestion = (qaId: string, ansId: string) => {
  currentWith.value += 10;
  gameStore.addAnswer(qaId, ansId);
  if(index.value < questions.value.length - 1) {
    index.value++;
    selectAnsId.value = '';
  }
}

onMounted(() => {
if(isHome.value)
{
  const router = useRouter();
  router.replace('/');
  return;
}
});
</script> 

<template>
  <div class="question_container">
      <div class="progress_bar">
        <div class="current_num">
          <div>第{{index+1}}題</div>
          <div>／共10題</div>
        </div>
        <div class="current_bar">
          <i :style="{width: `${currentWith}%`}"></i>
        </div>
      </div>
      <div class="theme">{{ questions[index].theme }}</div>
      <div class="title">{{ questions[index].content }}</div>
      <div class="contents">
        <div v-for="answer in questions[index].answers"
          :key="answer.id" class="item"
          :class="{ active: selectAnsId === answer.id }"
          @click="setSelectAnsId(answer.id)">
            {{ answer.content }}
        </div>
      </div>
      <div v-if="index < questions.length - 1"
        class="button next" :class="{ active: selectAnsId != '' }"
        @click="nextQuestion(questions[index].id, selectAnsId)">
          下一題
      </div>
      <RouterLink v-else
        to="/result"
        class="button result" :class="{ active: selectAnsId != '' }"
        @click="nextQuestion(questions[index].id, selectAnsId)">
          查看結果
      </RouterLink>
  </div>
</template>

<style scoped>
  .question_container {
    display: flex;
    flex-flow: column;
    justify-content: center;
    max-width: 700px;
    margin: 0 auto;
    gap: 10px;
    padding: 10px;

    .progress_bar {
      display: flex;
      flex-flow: column;
      gap: 5px;

      .current_num {
        display: flex;
        font-size: 15px;
      }

      .current_bar {
        position: relative;
        width: 100%;
        height: 10px;
        background: rgba(255, 255, 255, 0.8);
        filter: drop-shadow(3px 3px 2px gray);
        border-radius: 5px;
        overflow: hidden;

        > i {
          position: absolute;
          height: 10px;
          background: var(--color-theme);
          border-radius: 5px;
          transition: all .5s;
        }
      }
    }

    .theme {
      display: flex;
      justify-content: center;
      align-items: center;
      border: 2px solid white;
      border-radius: 5px;
      background: var(--color-theme);
      filter: drop-shadow(3px 3px 2px gray);
      padding: 5px 15px;
      margin: 0 auto;
      margin-top: 10px;
      font-weight: bold;
    }

    .title {
      display: flex;
      align-items: center;
      flex-grow: 1;
      font-weight: bold;
    }

    .contents {
      display: flex;
      flex-flow: column;
      gap: 10px;
      
      .item {
        display: flex;
        justify-content: center;
        align-items: center;
        border: 2px solid white;
        border-radius: 5px;
        background: rgba(0, 0, 0, 0.25);
        min-height: 120px;
        padding: 5px 10px;
        user-select: none;
        cursor: pointer;
        color: white;
        filter: drop-shadow(3px 3px 2px gray);

        &.active {
          font-weight: bold;
          border: 2px solid var(--color-theme);
          color: var(--color-theme);
          cursor: initial;
        }
      }
    }

    .button {
      display: flex;
      justify-content: center;
      border-radius: 10px;
      background-color: darkgray;
      width: 100%;
      padding: 10px 0;
      margin: 0 auto;
      text-decoration: none;
      pointer-events: none;
      user-select: none;
      font-weight: bold;
      color: white;
      filter: drop-shadow(3px 3px 2px gray);

      &.active {
        background-color: var(--color-theme);
        pointer-events: initial;
        cursor: pointer;
        color:black;
      }
    }
  }
</style>@/stores/gameStore