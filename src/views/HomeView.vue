<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useGameStore } from '@/stores/gameStore';
import router from '@/router';

const selected = ref('A0');
const isReady = ref(false);
const candidateSelect = (id: string) => {
  if(selected.value === id)
    selected.value = 'A0';
  else
    selected.value = id;

  isReady.value = false;  
  if(selected.value !== 'A0')
    isReady.value = true;
}

const gameStore = useGameStore();
const directGoToGame = () => {
  selected.value = 'A0';
  goToGame();
}
const goToGame = () => {
  gameStore.isHome = false;
  gameStore.candidateId = selected.value;
  router.replace('/game');
}

const isPreload = ref(true);
const preloadProgress = ref(0);
const preloadImages = () => {
  const imageUrls = [
    './favicon.png',
    './images/slogan.png',
    './images/candidate/A0_home.png',
    './images/candidate/A1.png',
    './images/candidate/A1_back.png',
    './images/candidate/A1_icon.png',
    './images/candidate/A2.png',
    './images/candidate/A2_back.png',
    './images/candidate/A2_icon.png',
    './images/candidate/A3.png',
    './images/candidate/A3_back.png',
    './images/candidate/A3_icon.png',
  ];
  const totalImages = imageUrls.length;
  let loadedImages = 0;

  const updateProgress = () => {
    preloadProgress.value = (loadedImages / totalImages) * 100;
  };

  const imagePromises = imageUrls.map((imageUrl) => {
    return new Promise<void>((resolve, reject) => {
      const img = new Image();
      img.src = imageUrl;
      img.onload = () => {
        loadedImages++;
        updateProgress();
        resolve();
      };
      img.onerror = () => {
        loadedImages++;
        updateProgress();
        reject(new Error(`Image load error: ${imageUrl}`));
      };
    });
  });

  Promise.all(imagePromises)
    .then(() => {
      isPreload.value = false;
    })
    .catch((error) => {
      console.error('Image preLoad error:', error);
    });
}

onMounted(() => {
  preloadImages();
  gameStore.init();
  //gameStore.apiVisitor();
});
</script>

<template>
  <div v-if="isPreload" class="progress_bar">
    <div class="title">
      測驗載入中
    </div>
    <div class="current_bar">
      <i :style="{width: `${preloadProgress}%`}"></i>
    </div>
  </div>
  <div v-else class="container">
    <div class="logo">
      <img src="/favicon.png">
      <div class="name">
        <div>魔鬼藏在日常裡</div>
        <div>PotatoRadio543</div>
      </div>
    </div>
    <div class="title">
        <img src="/images/slogan.png">
    </div>
    <div class="content">
        <div class="describe">2024總統大選即將到來，讓我們褪去華麗的口號，只留下最真實的政見，暫時拋開你的信仰，選出和你最貼近的理念。</div>
        <div id="candidate_box" class="candidate_box" :class="{number_one:selected === 'A1', number_two:selected === 'A2', number_three:selected === 'A3'}">
          <div class="candidate_select">
            <div class="item number_one" :class="{ active:selected === 'A1' }" @click="candidateSelect('A1')"></div>
            <div class="item number_two" :class="{ active:selected === 'A2' }" @click="candidateSelect('A2')"></div>
            <div class="item number_three" :class="{ active:selected === 'A3' }" @click="candidateSelect('A3')"></div>
          </div>
        </div>
    </div>
    <div class="buttons">
      <div class="button direct"  @click="directGoToGame">直接測驗</div>
      <div class="button select" :class="{ active:isReady }" @click="goToGame">選好了</div>
    </div>
  </div>
</template>

<style scoped>
    .progress_bar {
      display: flex;
      flex-flow: column;
      gap: 10px;
      width: 700px;
      padding: 10px;
      margin: auto;
      transform: translateY(-20px);

      .title {
        font-size: 19px;
        font-weight: bold;
        text-align: center;
        color: white;
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

   .container {
      display: flex;
      flex-flow: column;
      justify-content: center;
      max-width: 700px;
      margin: 0 auto;
      padding: 10px;
      gap: 10px;

      .logo {
        display: flex;
        align-items: center;
        gap: 5px;
        position: absolute;
        top: 10px;
        left: 10px;

        > img {
          display: block;
          width: 43px;
          height: 43px;
          opacity: 0.6;
        }

        .name {
          font-size: 16px;
          font-weight: bold;
          color: white;
          opacity: 0.9;
        }
      }
     
      .title {
        margin-top: 40px;

        > img {
          display: block;
          width: 85%;
          margin: auto;
        }
      }

      .content {
        display: flex;
        flex-flow: column;
        flex-grow: 1;
        gap: 10px;

        .describe {
          font-weight: bold;
        }

        .candidate_box {
          display: flex;
          flex-flow: column;
          flex-grow: 1;
          border: 2px solid white;
          border-radius: 5px;
          padding: 10px;
          gap: 10px;
          background-color: var(--color-theme);
          background-image: url('/images/candidate/A0_home.png');
          background-position: -100px 0, left top;
          background-size: cover, 62% 100%;
          background-repeat: no-repeat;
          filter: drop-shadow(3px 3px 2px gray);
          position: relative;
          
          &.number_one {
            background-color: var(--color-theme-blue-green);
            background-image: url('/images/candidate/A1.png'), url('/images/candidate/A1_back.png');
          }

          &.number_two {
            background-color: var(--color-theme-green);
            background-image: url('/images/candidate/A2.png'), url('/images/candidate/A2_back.png');
          }

          &.number_three {
            background-color: var(--color-theme-blue);
            background-image: url('/images/candidate/A3.png'), url('/images/candidate/A3_back.png');
          }

          .candidate_select {
            display: flex;
            flex-flow: column;
            flex-grow: 1;
            align-items: end;
            gap: 10px;

            .item {
              width: 30%;
              padding-top: 25%;
              border: 2px solid white;
              border-radius: 10px;
              filter: drop-shadow(3px 3px 2px gray);
              cursor: pointer;
              background-color: blue;

              &.active {
                background-color: var(--color-theme);
                border: 5px solid var(--color-theme);  
              }

              &.number_one {
                background-color: var(--color-theme-blue-green);
                background-image: url('/images/candidate/A1_icon.png');
                background-size: 100%;
                background-position: center top;
              }

              &.number_two {
                background-color: var(--color-theme-green);
                background-image: url('/images/candidate/A2_icon.png');
                background-size: 98%;
                background-position: center top;
              }

              &.number_three {
                background-color: var(--color-theme-blue);
                background-image: url('/images/candidate/A3_icon.png');
                background-size: 97%;
                background-position: center top -4px;
              }
            }
          }
        }
      }

      .buttons {
        display: flex;
        gap: 10px;

        .button {
          display: flex;
          justify-content: center;
          border-radius: 10px;
          width: 50%;
          padding: 10px 0;
          margin: 0 auto;
          text-decoration: none;
          user-select: none;
          font-weight: bold;
          filter: drop-shadow(3px 3px 2px gray);

          &.direct {
            background-color: white;
            cursor: pointer;
          }
          &.select {
            background-color: darkgrey;
            pointer-events: none;
            color: white;

            &.active {
              background-color: var(--color-theme);
              pointer-events: initial;
              cursor: pointer;
              color: black;
            }
          }
        }
      }
    }

    @media (max-width: 720px) {
      .container {
        .logo {
          > img {
            width: 32px;
            height: 32px;
          }

          .name {
            font-size: 12px;
          }
        }

        .content {
          .candidate_box {
            background-position: -50px 0, left top;
          }
        }
      }
    }
</style>@/stores/gameStore