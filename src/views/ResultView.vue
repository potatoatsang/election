<script setup lang="ts">
import { useRouter } from 'vue-router';
import { ref, computed, onMounted } from 'vue';
import { useGameStore } from '@/stores/gameStore';
import html2canvas from 'html2canvas';
import { saveAs } from 'file-saver';

const gameStore = useGameStore();
const isHome = computed(() => {
  return gameStore.isHome;
});
const questions = computed(() => {
  return gameStore.questions;
});
const ansResults = computed(() => {
  return gameStore.ansResults;
});
const electionResult = computed(() => {
  return gameStore.electionResult;
});
const references = computed(() => {
  return gameStore.references;
});

const downloadAreaRef = ref(null);
const downloadResultImg = async () => {
  const downloadArea = downloadAreaRef.value;
  if(downloadArea !== null){
    const canvas = await html2canvas(downloadArea);
    const imageData = canvas.toDataURL('image/png');
    saveAs(imageData, 'potatoradio-lj.png');
  }
};

const isCopied = ref(false);
const copyToClipboard = () => {
  const urlToCopy = "https://potatoradio-lj.com";
  navigator.clipboard.writeText(urlToCopy).then(() => {
    isCopied.value = true;
    setTimeout(() => {
      isCopied.value = false;
    }, 1000);
  }).catch((err) => {
    console.error("複製連結失敗", err);
  });
};

const handleClickShare = () => {
  //gameStore.apiShare();
};

const percentageA1 = ref('0%');
const percentageA2= ref('0%');
const percentageA3 = ref('0%');
onMounted(async () => {
  if(isHome.value)
  {
    const router = useRouter();
    router.replace('/');
    return;
  }

  //await gameStore.apiAddqares();
  gameStore.getElectionResult();
  setTimeout(()=>{
    percentageA1.value = electionResult.value.percentage.A1;
    percentageA2.value = electionResult.value.percentage.A2;
    percentageA3.value = electionResult.value.percentage.A3;
  }, 100);
});
</script> 

<template>
  <div class="loading_container" v-if="gameStore.isLoading">
    <svg version="1.1" id="loader-1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
     width="40px" height="40px" viewBox="0 0 50 50" style="enable-background:new 0 0 50 50;" xml:space="preserve">
      <path fill="#000" d="M43.935,25.145c0-10.318-8.364-18.683-18.683-18.683c-10.318,0-18.683,8.365-18.683,18.683h4.068c0-8.071,6.543-14.615,14.615-14.615c8.072,0,14.615,6.543,14.615,14.615H43.935z">
        <animateTransform attributeType="xml"
        attributeName="transform"
        type="rotate"
        from="0 25 25"
        to="360 25 25"
        dur="0.6s"
        repeatCount="indefinite"/>
      </path>
    </svg>
    <div class="title">取得結果中</div>
  </div>
  <div v-else class="result_container">
    <div class="election_container">
      <div ref="downloadAreaRef"
          class="result_img"
          :class="{
            number_one: electionResult.finalCandidate === 'A1',
            number_two: electionResult.finalCandidate === 'A2',
            number_three: electionResult.finalCandidate === 'A3'
          }">
        <img class="candidate" :src="`/images/candidate/${electionResult.finalCandidate}.png`">
        <div class="wrapper">
          <div class="title">
            <img src="/images/slogan.png">
          </div>
          <div v-if="gameStore.candidateId !== 'A0'" class="describe before">你本來想投{{gameStore.electionResult.originCandidateName}}</div>
          <div v-else class="describe before">你還沒決定投誰</div>
          <div class="describe after">
            <div>你選的政見</div>
            <div v-if="gameStore.electionResult.finalCandidate !== 'A0'">和<span>{{gameStore.electionResult.finalCandidateName}}</span>最接近！</div>
            <div v-else>不偏向特定候選人</div>
          </div>
        </div>
        <div class="logo">
          <img src="/favicon.png">
          <div class="name">
            <div>魔鬼藏在日常裡</div>
            <div>PotatoRadio543</div>
          </div>
        </div>
      </div>
      <div class="bar_chart">
        <div class="item">
          <div class="columnar">
            <div class="percentage number_one" :style="{ height: percentageA1 }"></div>
          </div>
          <div class="name">柯文哲 {{percentageA1}}</div>
        </div>
        <div class="item">
          <div class="columnar">
            <div class="percentage number_two" :style="{ height: percentageA2 }"></div>
          </div>
          <div class="name">賴清德 {{percentageA2}}</div>
        </div>
        <div class="item">
          <div class="columnar">
            <div class="percentage number_three" :style="{ height: percentageA3 }"></div>
          </div>
          <div class="name">侯友宜 {{percentageA3}}</div>
        </div>
      </div>
      <div class="buttons">
        <div class="two_buttons">
          <RouterLink to="/" class="button">重新測驗</RouterLink>
          <div class="button" @click="downloadResultImg">儲存結果</div>
        </div>
        <div class="wrapper">
          <div class="title">分享測驗</div>
          <div class="content">
            <a class="icon" href="http://line.naver.jp/R/msg/text/?https://potatoradio-lj.com" target="_blank" @click="handleClickShare()"><img src="/images/footer/line.png"></a>
            <a class="icon" href="https://www.facebook.com/sharer.php?u=https://potatoradio-lj.com" target="_blank" @click="handleClickShare()"><img src="/images/footer/fb.png"></a>
            <a  class="icon" href=" https://twitter.com/share?text=刻在你心中的信念 - 2024總統大選測驗&url=https://potatoradio-lj.com" target="_blank" @click="handleClickShare()"><img src="/images/footer/twitter.png"></a>
            <div class="icon" :class="{active: isCopied}" @click="copyToClipboard"><img src="/images/footer/link.png" @click="handleClickShare()"></div>
          </div>
        </div>
        <div class="two_buttons">
          <div class="wrapper">
            <div class="title">訪客次數</div>
            <div class="content">{{electionResult.visitorCount}}</div>
          </div>
          <div class="wrapper">
            <div class="title">分享次數</div>
            <div class="content">{{electionResult.shareCount}}</div>
          </div>
        </div>
      </div>
      <div class="questions">
        <div class="title">看看這些政見分別是誰提出的？</div>
        <div class="wrapper">
          <div v-for="(question) in questions"
              :key="question.id" class="question">
              <div class="theme">{{ question.theme }}</div>
              <div v-for="answer in question.answers" :key="answer.id"
                  class="item_ans" :class="{
                      number_one: answer.id === 'A1',
                      number_two: answer.id === 'A2',
                      number_three: answer.id === 'A3',
                      active: ansResults[question.id] === answer.id
                    }">
                  <div class="candidate_icon"><img :src="`/images/candidate/${answer.id}_icon.png`"></div>
                  <div class="ans_text">{{ answer.content }}</div>
              </div>
          </div>
        </div>
      </div>
      <div class="references">
        <div class="title">參考資料</div>
        <div class="wrapper">
          <div v-for="(reference, index) in references" :key="index" class="question">
              <a class="item" :href="reference.url" target="_blank" >{{ `${index + 1}. ${reference.title}` }}</a>
          </div>
        </div>
      </div>
    </div>
    <div class="info_container">
      <div class="wrapper">
        <div class="item">
          <div class="work">後端技術：</div>
          <div class="name">強森</div>
        </div>
        <div class="item">
          <div class="work">前端技術：</div>
          <div class="name">馬鈴薯蒼哥</div>
        </div>
        <div class="item">
          <div class="work">視覺設計：</div>
          <div class="name">馬鈴薯本人</div>
        </div>
        <div class="item">
          <div class="work">內容製作：</div>
          <div class="name">寂寞香蒜</div>
        </div>
        <div class="item">
          <div class="work">參考資料：</div>
          <div class="name">統計至2023年12月27日</div>
        </div>
        <a class="item community" href="https://www.instagram.com/potatoradio543" target="_blank" >
          <img class="icon" src="/images/footer/ig.png">
          <div class="name">PotatoRadio543</div>
        </a>
      </div>
    </div>
  </div>

</template>

<style scoped>
  .loading_container {
    display: flex;
    flex-flow: column;
    align-items: center;
    gap: 10px;
    margin: auto;

    .title {
      font-size: 19px;
      font-weight: bold;
      text-align: center;
      color: white;
    }

    svg path {
      fill: var(--color-theme);
    }
  }
  
  .result_container {
    width: 100%;
    .election_container {
      display: flex;
      flex-flow: column;
      flex-grow: 1;
      max-width: 700px;
      margin: 0 auto;
      padding: 10px;
      gap: 10px;
    
      .result_img {
        display: flex;
        background-color: white;
        position: relative;
        padding: 10px;
        padding-bottom: 0;
        border: 2px solid white;
        border-radius: 5px;
        filter: drop-shadow(3px 3px 2px gray);

        &.number_one {
          background-color: var(--color-theme-blue-green);
        }

        &.number_two {
          background-color: var(--color-theme-green);
        }

        &.number_three {
          background-color: var(--color-theme-blue);
        }

        .candidate {
          width: 40%;
          transform: translateX(-5%);
        }

        .wrapper {
          display: flex;
          flex-flow: column;
          justify-content: center;
          transform: translateY(-25px);
          padding-right: 5px;
          gap: 5px;
    
          .title {
            > img {
              display: block;
              width: 100%;
              margin: auto;

            }
          }
          .describe {
            font-weight: bold;
            color: white;
            filter: drop-shadow(3px 3px 2px gray);

            &.before {
              font-size: 45px;
            }

            &.after {

              > div {
                font-weight: bold;
                font-size: 45px;

                > span {
                  font-size: 45px;
                  font-weight: bold;
                  color: var(--color-theme);
                }
              }
            }
          }
        }

        .logo {
          display: flex;
          align-items: center;
          gap: 5px;
          position: absolute;
          bottom: 10px;
          right: 10px;

          > img {
            display: block;
            width: 38px;
            height: 38px;
            opacity: 0.6;
          }

          .name {
            font-size: 15px;
            font-weight: bold;
            color: white;
            opacity: 0.9;
          }
        }
      }

      .bar_chart {
        display: flex;
        justify-content: space-evenly;
        background-color: var(--color-theme);
        border-radius: 10px;
        padding: 10px;
        filter: drop-shadow(3px 3px 2px gray);

        .item {
          display: flex;
          flex-flow: column;
          justify-content: center;
          align-items: center;
          width: 25%;
          height: 130px;
          gap: 5px;
         
          .columnar { 
            display: flex;
            justify-content: center;
            align-items: end;
            flex-grow: 1;
            width: 100%;
            
            .percentage {
              width: 100%;
              border: 2px solid white;
              transition: all 1s;

              &.number_one {
                background-color: var(--color-theme-blue-green);
              }
              &.number_two {
                background-color: var(--color-theme-green);
              }
              &.number_three {
                background-color: var(--color-theme-blue);
              }
            }
          }

          .name {
            font-size: 15px;
            font-weight: bold;
            text-align: center;
          }
        }
      }

      .buttons {
        display: flex;
        flex-flow: column;
        gap: 10px;

        .button {
          display: flex;
          justify-content: center;
          border-radius: 10px;
          background-color: var(--color-theme);
          width: 100%;
          padding: 10px 0;
          margin: 0 auto;
          text-decoration: none;
          user-select: none;
          cursor: pointer;
          font-weight: bold;
          color: black;
          filter: drop-shadow(3px 3px 2px gray);
        }

        .wrapper {
          width: 100%;
          background-color: var(--color-theme);
          border-radius: 10px;
          filter: drop-shadow(3px 3px 2px gray);

          .title {
            text-align: center;
            font-weight: bold;
            padding: 10px 0;
          }

          .content {
            display: flex;
            justify-content: space-evenly;
            padding: 0 0 15px 0;

            .icon {
              display: flex;
              justify-content: center;
              align-items: center;
              width: 50px;
              height: 50px;
              border-radius: 50%;
              background: white;
              cursor: pointer;

              > img {
                display: block;
                width: 50%;
              }

              &:last-child {
                position: relative;

                &::after {
                  content: "複製成功";
                  display: block;
                  position: absolute;
                  width: max-content;
                  -moz-width: max-content;
                  -webkit-width: max-content;
                  -ms-width: max-content;
                  bottom: 110%;
                  left: 50%;
                  transform: translateX(-50%);
                  background-color: green;
                  color: white;
                  padding: 5px;;
                  border-radius: 5px;
                  opacity: 0;
                  transition: all 0.3s ease-in;
                }

                &.active {
                  &::after {
                    opacity: 1;
                  }
                }
              }
            }
          }
        }

        .two_buttons {
          display: flex;
          gap: 10px;
        }
      }
      
      .questions {
        display: flex;
        flex-flow: column;
        gap: 10px;
        
        .title {
          display: flex;
          justify-content: center;
          border-radius: 10px;
          border: 2px solid white;
          background-color: var(--color-theme);
          width: 100%;
          padding: 10px 0;
          margin: 0 auto;
          text-decoration: none;
          user-select: none;
          font-weight: bold;
          color: black;
          filter: drop-shadow(3px 3px 2px gray);
        }

        .wrapper {
          display: flex;
          flex-flow: column;
          gap: 20px;

          .question {
            display: flex;
            flex-flow: column;
            gap: 10px;

            .theme {
              text-align: center;
              font-size: 20px;
              font-weight: bold;
            }
            .item_ans {
              display: flex;
              align-items: center;
              gap: 10px;

              &.active {
                .candidate_icon {
                  border: 2px solid var(--color-theme);
                }

                .ans_text {
                  font-weight: bold;
                  border: 2px solid var(--color-theme);
                }
              }

              &.number_one {
                .candidate_icon {
                  background-color: var(--color-theme-blue-green);
                }
                &.active {
                  .ans_text {
                    background-color: rgba(0, 160, 160);
                  }
                }
              }

              &.number_two {
                .candidate_icon {
                  background-color: var(--color-theme-green);
                }
                &.active {
                  .ans_text {
                    background-color: var(--color-theme-green);
                  }
                }
              }

              &.number_three {
                .candidate_icon {
                  background-color: var(--color-theme-blue);
                }
                &.active {
                  .ans_text {
                    background-color: var(--color-theme-blue);
                  }
                }
              }

              .candidate_icon {
                width: 60px;
                height: 60px;
                border-radius: 50%;
                border: 2px solid white;
                overflow: hidden;
                filter: drop-shadow(3px 3px 2px gray);

                > img {
                  display: block;
                  width: 120%;
                  transform: translate(-2.5px, 5px);
                }
              }
              
              .ans_text {
                display: flex;
                justify-content: center;
                align-items: center;
                text-align: left;
                border: 2px solid white;
                border-radius: 5px;
                background-color: rgba(0, 0, 0, 0.25);
                width: calc(100% - 70px);
                min-height: 120px;
                padding: 5px 10px;
                user-select: none;
                color: white;
                filter: drop-shadow(3px 3px 2px gray);
              }
            }
          }
        }
      }

      .references {
        display: flex;
        flex-flow: column;
        justify-content: center;
        border-radius: 10px;
        border: 2px solid white;
        background-color: var(--color-theme);
        width: 100%;
        padding: 10px;
        text-decoration: none;
        user-select: none;
        font-weight: bold;
        color: black;
        filter: drop-shadow(3px 3px 2px gray);
        margin-top: 10px;

        .title {
          text-align: center;
          font-weight: bold;
          color: black;
        }

        .wrapper {
          display: flex;  
          flex-flow: column;
          height: 150px;
          gap: 10px;
          padding-right: 10px;
          margin-top: 10px;
          overflow: auto;

          &::-webkit-scrollbar {
            width: 10px;
          } 
          &::-webkit-scrollbar-track {
            background: transparent;
          }
          &::-webkit-scrollbar-thumb {
            background: #888;
            border-radius: 5px;
          }
          &::-webkit-scrollbar-thumb:hover {
            background: #555;
          }
          &::-webkit-scrollbar-thumb:active {
            background: #222;
          }

          .item {
            text-decoration: none;
            color: black;
          }
        }
      }
    }

    .info_container {
      display: flex;
      justify-content: center;
      background-color: var(--color-theme-footer);
      padding: 15px 10px 0 10px;

      .wrapper {
        .item {
          display: flex;
          color: white;
          &.community {
            display: flex;
            align-items: center;
            text-decoration: none;
            margin-top: 10px;
            gap: 10px;

            > img {
              display: block;
              width: 24px;
              height: 24px;
            }

            .name {
              color: white;
            }
          }
        }
      }
    }
  }

  @media (max-width: 720px) {
    .result_container {
      .election_container {
        .result_img {
          .wrapper {
            .describe {
              &.before {
                font-size: 6vw;
              }

              &.after {

                > div {
                  font-size: 6vw;

                  > span {
                    font-size: 6vw;
                  }
                }
              }
            }
          }

          .logo {
            gap: 5px;
            bottom: 10px;
            right: 10px;

            > img {
              width: 28px;
              height: 28px;
            }

            .name {
              font-size: 11px;
            }
          }
        }
      }
    }
  }
</style>@/stores/gameStore