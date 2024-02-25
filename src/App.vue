<script setup lang="ts">
import { RouterView } from 'vue-router'
import { useGameStore } from '@/stores/gameStore';
import { useModalStore } from '@/stores/modalStore';
import { version } from '@/config';
import { onMounted, computed } from 'vue';
import Modal from '@/components/layout/ModalDialog.vue';
import LayoutFooter from '@/components/layout/LayoutFooter.vue';

const gameStore = useGameStore();
const modalStore = useModalStore();
const modal = computed(() => {
  return modalStore.modal;
});

const questions = [
  {
    'id': 'q1',
    'theme':'居住正義',
    'content':'台灣的房價水漲船高，許多年輕人被迫成為無殼蝸牛，甚至面臨租也租不起的窘境，即便有租屋補助也是看得到吃不到，所謂的居住正義彷彿是一場夢。以下針對房市提出的政見，你認為哪一個最為實際且有效呢？',
    'answers': [
      {
        'id': 'A2',
        'content':'提出在2032年要達成50萬戶社宅供給，租金補貼增加至每年50萬家戶補貼量，同年達成社會住宅、包租代管與租金補貼「百萬租屋家戶」總目標。針對青年購屋部分則將貸款額度提高至1000萬，加碼利息補貼並延長寬限期5年。',
      },
      {
        'id': 'A3',
        'content':'主張由行政院設置中央住宅委員會，提出完整國家住宅計畫，以及跨部會打炒房小組，檢討不動產交易所得稅。提供40歲以下青年購屋最高1500萬元全額貸款，前5年僅需繳利息，10年內不得轉售。並針對擁有4房以上者課囤房稅。',
      },
      {
        'id': 'A1',
        'content':'大量興建社宅，減少國有土地標售，避免政府帶頭炒地。課多屋稅，持有房屋越多者課稅越高，若願意將閒置空屋出租，則可降低利率，房東不怕被補稅才會願意誠實申報，釋出更多空屋，租客才能安心享有租屋補助。提供育兒家庭最高9成低利貸款，並由政府吸收前3年利息。',
      }
    ]
  },
  {
    'id': 'q2',
    'theme':'交通安全',
    'content':'在台灣，面臨各種大小交通狀況早已是你我的日常，出門就是一場冒險。據交通部統計，去年交通事故的傷亡人數竟創下10年來新高，究竟如何才能解決台灣的交通亂象呢？',
    'answers': [
      {
        'id': 'A3',
        'content':'未來將從交通法規、都市計畫、交通工程等開始，全面檢討交通號誌、標誌及標線，將不合時宜的規範改善並修正，國民也要有品德修養，車讓人，強讓弱是天經地義。',
      },
      {
        'id': 'A1',
        'content':'大幅修訂交通法規，由中央建立制度統一規範並持續修正。重大交通建設回歸專業評估，整合國家數據，推動智慧運輸發展策略；健全海空航網，落實數據治理及綠色營運。',
      },
      {
        'id': 'A2',
        'content':'落實行政院通過的「道路交通安全基本法」草案，並承諾未來會結合執政黨、在野黨共同努力，積極改善各縣市交通路況，主張在2040年達成交通事故死亡數歸零的目標。',
      },
      
    ] 
  },
  {
    'id': 'q3',
    'theme':'兩岸關係',
    'content':'近年兩岸關係日益緊張，如何面對兩岸議題成為了候選人的必考題，以下何者的態度最符合你的期待，將發生戰爭的可能降到最低呢？',
    'answers': [
      {
        'id': 'A1',
        'content':'台灣自主，兩岸和平，對等尊嚴，恢復兩岸溝通管道。以互相認識、了解、尊重、合作、諒解等5個互相與中國相處，在互相諒解的情形下，找出彼此都可以接受的方案。',
      },
      {
        'id': 'A2',
        'content':'永遠堅持民主自由的憲政體制；堅持中華民國和中華人民共和國互不隸屬；堅持主權不容侵犯併吞；堅持中華民國台灣的前途必須由2350萬人來決定。主張維持台海現狀。',
      },
      {
        'id': 'A3',
        'content':'接受合乎中華民國憲法的九二共識。當選後即釋放清楚訊息，面對大陸採取開放政策，包括陸客、陸生等，從對話交流中重啟兩岸之間的互信度，以降低風險。',
      }
    ] 
  },
  {
    'id': 'q4',
    'theme':'國防安全',
    'content':'去年美國眾議院議長裴洛西訪台後，引發中國強烈不滿，今年已對台數度展開軍演。面對中國脅迫式及生存式的威脅，台灣該如何應對？你認為怎樣的國防軍事方針更為恰當呢？',
    'answers': [
      {
        'id': 'A3',
        'content':'秉持強健國防、嚇阻戰爭原則，打造精銳、善戰、靈活的國軍。提供戰鬥單位志願役每月最多加薪萬元，達到有感加薪、榮感從軍， 估計每年約增106億元。成立行政院全民防衛動員委員會，改進軍事教育。',
      },
      {
        'id': 'A2',
        'content':'充實自我防衛的能力，強化經濟安全與科技實力，建立與全世界民主國家的夥伴關係，以及穩定的兩岸關係領導能力。將保全納入全民國防行列，與義務役一同增加民防能量，不需前往前線。',
      },
      {
        'id': 'A1',
        'content':'提升國防預算至GDP3%，但必須合理化、均衡分配。未來台灣面臨少子化影響，徵兵會遇到困難，應以募兵為主、徵兵為輔。提倡國軍實戰化、專業化、合理化、透明化、資訊化。備戰而不畏戰，能戰而不求戰。',
      }
    ] 
  },
  {
    'id': 'q5',
    'theme':'能源供需',
    'content':'近期美國帶頭宣言擁核，包含加、英、法等20多國響應。台灣有97%能源依賴進口，若遭遇短期封鎖將造成嚴重損害。你認為下列哪個能源政見較佳？',
    'answers': [
      {
        'id': 'A2',
        'content':'目前台灣供電量十分穩定沒有問題，雖不排除核能，但核四無法重啟，因為人民已做出決定，而目前已停機之核能機組則可留作緊急電力之用。',
      },
      {
        'id': 'A1',
        'content':'不應為了廢核而讓綠能倉促上路，造成國家發電空窗，應讓核二、核三延役，儘速體檢評估核四決定其去留，推動高階核廢料最終處置，作為再生能源發展的輔助過渡工具。',
      },
      {
        'id': 'A3',
        'content':'核能為乾淨能源，台灣應與國際同步，善用既有核電設備，以降低碳排量以及空汙問題。將儘速安排核一、核二、核三檢修並延役，以及推動核四安全重啟。',
      }
    ] 
  },
  {
    'id': 'q6',
    'theme':'育兒資源',
    'content':'2023年台灣創下全球生育率最低的紀錄，日前也被英國廣播公司（BBC）針對此事進行報導，「生不如死」已成為台灣社會最嚴峻的課題，總統候選人所提出的育兒政策更是至關重要，你認為哪一位的政見最為完善呢？',
    'answers': [
      {
        'id': 'A1',
        'content':'成立人口發展委員會專責處理，增設公立托幼機構，提供平日延托、假日臨托服務。代孕鬆綁，完善人工生殖法，落實女性身體自主權。懷孕3月即領好孕津貼5萬，生育再領10萬，將育兒津貼及育兒家庭減稅延長至12歲，並享租屋補助及社宅優先入住權。',
      },
      {
        'id': 'A2',
        'content':'擴大公共化及準公共托育量能，提升0-3歲家外送托率。0-2歲托育補助加碼，第一胎最高補助1萬3，提出由政府提供人力，延長平日和寒暑假托育時間及彈性育嬰假制度。強化托育品質，落實調降各年齡層托育師生比。針對新手父母提供育兒指導員的親善訪視服務。',
      },
      {
        'id': 'A3',
        'content':'成立少子化基金支持凍卵補助，不納入健保。公立、非營利、準公共化的托嬰、托育及幼兒園，一律免月費，若是自己帶或到私人機構，則提供每月1萬津貼。3胎以上家庭可領100萬補貼，但設排富條件，綜合所得稅率未達30%，名下不得有房產，或換屋重購者得一屋換一屋。',
      }
    ] 
  },
  {
    'id': 'q7',
    'theme':'長照服務',
    'content':'台灣即將在2025年邁入超高齡社會，平均每5人就有1位是長者，隨著老年人口急遽增長，長者以及照顧者的權益，該如何去完善呢？',
    'answers': [
      {
        'id': 'A1',
        'content':'成立中央長照保險局，解決長照收入不穩問題。設特約型長照機構，成為長者從出院到家庭照護之間的中繼站。聘請外籍看護也可享有長照保險照顧，享居家服務、夜間照顧、家庭托顧等服務。提供照顧者現金補助，住宿型機構補助提高到3萬，減輕長照家庭負擔。',
      },
      {
        'id': 'A3',
        'content':'開辦長照保險，發放重度失能家庭照顧者津貼，增加重度失能者住宿型機構補助費用，由每月1萬提高至每月2萬。住院看護統一由醫院聘僱，住院即有看護，並重新檢討長照機構的評鑑制度，減輕業者的負擔。',
      },
      {
        'id': 'A2',
        'content':'加強社區式服務據點的照顧服務功能，並增加住宿式機構服務供給，提供多元化住宿式機構的功能。擴大補助老舊公寓增設電梯與升降梯等設備。提高住宿式服務機構使用者補助，從現在每月1萬提高到每月最高1萬5，並取消原先的排富規定。',
      }
    ] 
  },
  {
    'id': 'q8',
    'theme':'醫療資源',
    'content':'台灣長年面臨醫療資源不足且分配不均，更有學者曾預言2030年將是台灣健保大限，下列哪位候選人的政見更符合你的想法呢？',
    'answers': [
      {
        'id': 'A3',
        'content':'提高醫療預算至GDP8%，並成立超過百億的癌症基金、擴充疫苗基金。80歲以上長者取消巴氏量表，70至79歲患有癌症2期以上長者，以及有特殊重大傷病長者，亦可取消巴氏量表。成立跨部會協調委員會，專責兒童健康。推動行政院層級國民心理健康計畫。',
      },
      {
        'id': 'A2',
        'content':'公務預算挹注健保，導入人工智慧，結合科技協助醫療體系提升品質及效率。支持護理師國考方式多元、增加護理科系招收名額，並將3班護病比入法。成立百億癌症新藥基金，健保永續重在開源節流，積極導入健康促進及疾病預防，如果國人更健康，健保的財務負擔也會減少。',
      },
      {
        'id': 'A1',
        'content':'提高醫療支出達到GDP8%。推廣戒菸、減重、癌症篩檢。增加公費疫苗種類，落實家醫、分級、轉診、論人計酬。提升護理師薪資待遇，提供全責醫護，住院看護免煩惱。老弱申請幫傭移工不需巴氏量表、65歲以上長者健保費全額補助、放寬自費醫療市場，減輕健保壓力。',
      },
    ] 
  },
  {
    'id': 'q9',
    'theme':'缺工低薪',
    'content':'近年來因少子化及各種勞動條件不佳，導致全台大缺工，人力銀行每月的職缺數屢創新高，針對台灣缺乏勞動力的現況，你認為哪一個政見更能對症下藥？',
    'answers': [
      {
        'id': 'A1',
        'content':'開放移工市場，但要依職業別課人頭稅。政府應著重加強輔導產業轉型、升級，提升獲利及附加價值，進而改善本國勞工的勞動環境及薪資，不過度依賴外籍勞動力。',
      },
      {
        'id': 'A3', 
        'content':'開設移工平台，彈性的運用移工勞動力並投入各項產業。放寬旅宿業與物流業聘僱移工，特赦失聯移工限期投案。另外鼓勵中國留學生畢業後續留台灣工作，也能解決缺工問題。',
      },
      {
        'id': 'A2',
        'content':'缺工是因為現在是民主社會，就業機會多元化，除引進外籍移工外，鼓勵婦女多投入職場，且應該要建構一個符合新時代的勞動法令。呼籲企業為勞工加薪以解決缺工問題。',
      }
    ] 
  },
  {
    'id': 'q10',
    'theme':'勞保權益',
    'content':'據最近一次的勞保局精算報告指出，若不啟動年金改革，勞保基金將會在2028年破產。此事攸關廣大勞工權益，你認為下列那個政見更符合你的看法？',
    'answers': [
    {
        'id': 'A2',
        'content':'只要政府在，勞保基金就不會倒，支持資方獲利分潤給勞工，將建立鼓勵機制讓資方提撥高於6%，年金改革則需要與社會討論取得共識，才能讓國家政策走得更長久。',
      },
      {
        'id': 'A3',
        'content':'勞保破產沒那麼快，將積極尋找財源，目標每年撥補1千億給勞保基金，亦可參考國外大型基金，優化勞保基金投資方式，提高委外比率。召開國是會議尋求各界共識。',
      },
      {
        'id': 'A1',
        'content':'年金改革勢在必行，除優先將多餘稅收補入外，將召開國是會議，全面檢討其永續性。提高勞動基金績效，監管公開透明。鼓勵雇主提高勞退提撥率超過6%，政府給予減稅。',
      }
    ] 
  }
]

const references = [
  {
    title:'侯友宜、柯文哲、賴清德 10大主題政策精華版總整理',
    url:'https://tw.news.yahoo.com/2024%E7%B8%BD%E7%B5%B1%E5%A4%A7%E9%81%B8%E6%94%BF%E8%A6%8B%E4%B8%80%E6%AC%A1%E7%9C%8B%EF%BD%9C%E4%BE%AF%E5%8F%8B%E5%AE%9C%E3%80%81%E6%9F%AF%E6%96%87%E5%93%B2%E3%80%81%E8%B3%B4%E6%B8%85%E5%BE%B7-10%E5%A4%A7%E4%B8%BB%E9%A1%8C%E6%94%BF%E7%AD%96%E7%B2%BE%E8%8F%AF%E7%89%88%E7%B8%BD%E6%95%B4%E7%90%86-010050330.html'
  },
  {
    title:'侯友宜政見一次看｜「戰爭與和平的選擇」能源政策拚無煤台灣',
    url:'https://tw.news.yahoo.com/2024%E9%81%B8%E8%88%89-%E7%B8%BD%E7%B5%B1%E5%A4%A7%E9%81%B8-%E7%B8%BD%E7%B5%B1%E9%81%B8%E8%88%89-%E4%BE%AF%E5%8F%8B%E5%AE%9C%E6%94%BF%E8%A6%8B%E7%B8%BD%E6%95%B4%E7%90%86-%E4%B8%80%E6%AC%A1%E7%9C%8B-010055925.html'
  },
  {
    title:'賴清德政見一次看｜推動「國家希望工程」：民主和平、創新繁榮、公義永續塑造台灣',
    url:'https://tw.news.yahoo.com/2024%E9%81%B8%E8%88%89-%E7%B8%BD%E7%B5%B1%E5%A4%A7%E9%81%B8-%E7%B8%BD%E7%B5%B1%E9%81%B8%E8%88%89-%E8%B3%B4%E6%B8%85%E5%BE%B7%E6%94%BF%E8%A6%8B%E7%B8%BD%E6%95%B4%E7%90%86-%E4%B8%80%E6%AC%A1%E7%9C%8B-130057191.html'
  },
  {
    title:'候選人「兩岸」政見總整理，誰能阻止兩岸發生戰爭？',
    url:'https://www.businessweekly.com.tw/focus/blog/3013557'
  },
  {
    title:'2024台灣總統大選一文了解三位候選人及他們的兩岸政策',
    url:'https://www.bbc.com/zhongwen/trad/chinese-news-66945816.amp'
  },
  {
    title:'柯文哲政見—產業能源｜未來20年發展AI拚高薪 主張核一及核三延役 核四重啟安全體檢',
    url:'https://tw.news.yahoo.com/2024%E9%81%B8%E8%88%89-%E7%B8%BD%E7%B5%B1%E5%A4%A7%E9%81%B8-%E7%B8%BD%E7%B5%B1%E9%81%B8%E8%88%89-%E6%9F%AF%E6%96%87%E5%93%B2%E7%94%A2%E6%A5%AD%E8%83%BD%E6%BA%90%E6%94%BF%E8%A6%8B-ai-%E6%A0%B8%E5%9B%9B%E9%87%8D%E5%95%9F-010056139.html'
  },
  {
    title:'賴清德政見—交通通訊｜2030道路死亡案例降低50%、2040目標零死亡',
    url:'https://tw.news.yahoo.com/2024%E9%81%B8%E8%88%89-%E7%B8%BD%E7%B5%B1%E5%A4%A7%E9%81%B8-%E7%B8%BD%E7%B5%B1%E9%81%B8%E8%88%89-%E8%B3%B4%E6%B8%85%E5%BE%B7%E4%BA%A4%E9%80%9A%E9%80%9A%E8%A8%8A%E6%94%BF%E8%A6%8B-010014883.html'
  },
  {
    title:'柯文哲提5大交通改革 侯友宜拋6至12歲課後輔導政策',
    url:'https://news.pts.org.tw/article/670977/amp'
  },
  {
    title:'柯文哲政見—交通通訊｜任台北市長3年傷亡人數降低60% 將推全國道路統一設計規範',
    url:'https://tw.news.yahoo.com/2024%E9%81%B8%E8%88%89-%E7%B8%BD%E7%B5%B1%E5%A4%A7%E9%81%B8-%E7%B8%BD%E7%B5%B1%E9%81%B8%E8%88%89-%E6%9F%AF%E6%96%87%E5%93%B2%E4%BA%A4%E9%80%9A%E9%80%9A%E8%A8%8A%E6%94%BF%E8%A6%8B-010034094.html'
  },
  {
    title:'柯文哲政見一次看｜承諾選民「把國家還給你」稱2024選舉為「改變政治文化的社會運動」',
    url:'https://tw.news.yahoo.com/2024%E9%81%B8%E8%88%89-%E7%B8%BD%E7%B5%B1%E5%A4%A7%E9%81%B8-%E7%B8%BD%E7%B5%B1%E9%81%B8%E8%88%89-%E6%9F%AF%E6%96%87%E5%93%B2%E6%94%BF%E8%A6%8B%E7%B8%BD%E6%95%B4%E7%90%86-%E4%B8%80%E6%AC%A1%E7%9C%8B-010053127.html'
  },
  {
    title:'2028勞保破產？侯友宜估「沒那麼快」　當選將開國是會議檢討',
    url:'https://www.ettoday.net/news/20231127/2631653.htm'
  },
  {
    title:'總統候選人柯文哲、不分區立委提名人 政見懶人包',
    url:'https://www.tpp.org.tw/newsdetail/3120'
  },
  {
    title:'KP政策總表',
    url:'https://2024kpromise.tw/political/?tab=national'
  },
  {
    title:'與民政策-侯友宜、趙少康',
    url:'https://2024houyuih.tw/policies/'
  },
  {
    title:'有感政見-賴清德、蕭美琴',
    url:'https://taiwan2024.tw/policies/'
  },
  {
    title:'侯友宜：兩岸重啟交流不能拖 當選後立刻開放陸客',
    url:'https://udn.com/news/amp/story/123307/7602078'
  },
  {
    title:'台灣大選︱侯友宜發布兩岸政見：三項監督、四大戰略推動兩岸關係',
    url:'https://www.hk01.com/%E5%8F%B0%E7%81%A3%E6%96%B0%E8%81%9E/973915/%E5%8F%B0%E7%81%A3%E5%A4%A7%E9%81%B8-%E4%BE%AF%E5%8F%8B%E5%AE%9C%E7%99%BC%E5%B8%83%E5%85%A9%E5%B2%B8%E6%94%BF%E8%A6%8B-%E4%B8%89%E9%A0%85%E7%9B%A3%E7%9D%A3-%E5%9B%9B%E5%A4%A7%E6%88%B0%E7%95%A5%E6%8E%A8%E5%8B%95%E5%85%A9%E5%B2%B8%E9%97%9C%E4%BF%82'
  },
  {
    title:'侯友宜拋兩岸政見 保障台灣人民人權最優先',
    url:'https://www.cna.com.tw/news/aipl/202312210143.aspx'
  },
  {
    title:'提三大移工政策 侯友宜：讓台灣不缺工、減少治安死角',
    url:'https://tw.news.yahoo.com/%E6%8F%90%E4%B8%89%E5%A4%A7%E7%A7%BB%E5%B7%A5%E6%94%BF%E7%AD%96-%E4%BE%AF%E5%8F%8B%E5%AE%9C-%E8%AE%93%E5%8F%B0%E7%81%A3%E4%B8%8D%E7%BC%BA%E5%B7%A5-%E6%B8%9B%E5%B0%91%E6%B2%BB%E5%AE%89%E6%AD%BB%E8%A7%92-083535267.html'
  },
  {
    title:'農業缺工問題嚴重 侯友宜：成立移工平台媒合解決',
    url:'https://udn.com/news/amp/story/123307/7518026'
  },
  {
    title:'賴清德提出經濟目標 企業界籲開放外國移工',
    url:'https://news.pts.org.tw/article/669282/amp'
  },
  {
    title:'談缺工和低薪 賴清德：政府有責建構新時代勞動法令',
    url:'https://www.rti.org.tw/news/view/id/2188191'
  },
  {
    title:'回應勞團 賴清德：支持資方分潤、勞保基金不會倒',
    url:'https://www.cna.com.tw/news/aipl/202311290316.aspx'
  },
  {
    title:'全國勞工後援總會成立 侯友宜宣布五大勞工政策搶選票',
    url:'https://tw.yahoo.com/trendr/%E5%85%A8%E5%9C%8B%E5%8B%9E%E5%B7%A5%E5%BE%8C%E6%8F%B4%E7%B8%BD%E6%9C%83%E6%88%90%E7%AB%8B-%E4%BE%AF%E5%8F%8B%E5%AE%9C%E5%AE%A3%E5%B8%83%E4%BA%94%E5%A4%A7%E5%8B%9E%E5%B7%A5%E6%94%BF%E7%AD%96%E6%90%B6%E9%81%B8%E7%A5%A8-161907521.html'
  },
  {
    title:'護理師薪資低爆出走潮　柯文哲：提高待遇',
    url:'https://www.pinview.com.tw/News/19500.html?hl=zh_TW_%23Hant'
  },
  {
    title:'批國防預算創新高卻未均衡分配！柯文哲軍人節喊：我主張要達GDP的3%',
    url:'https://www.storm.mg/amparticle/4863181'
  },
  {
    title:'侯友宜國防政見 續推潛艦國造、志願役每月最高加薪1萬',
    url:'https://www.cna.com.tw/news/aipl/202312110216.aspx'
  },
  {
    title:'賴清德喊納全民國防 遭質疑要保全上戰場',
    url:'https://www.chinatimes.com/amp/newspapers/20230904000305-260118'
  },
  {
    title:'侯友宜國防政見：打造可嚇阻戰力',
    url:'https://udn.com/news/amp/story/123307/7634267'
  },
  {
    title:'《各報要聞》賴清德：停機核能機組 維持可緊急使用',
    url:'https://tw.stock.yahoo.com/news/%E5%90%84%E5%A0%B1%E8%A6%81%E8%81%9E-%E8%B3%B4%E6%B8%85%E5%BE%B7-%E5%81%9C%E6%A9%9F%E6%A0%B8%E8%83%BD%E6%A9%9F%E7%B5%84-%E7%B6%AD%E6%8C%81%E5%8F%AF%E7%B7%8A%E6%80%A5%E4%BD%BF%E7%94%A8-233742983.html'
  },
  {
    title:'賴清德拋緊急時啟用停運核能機組 綠盟：發展分散式電力才對',
    url:'https://news.ltn.com.tw/amp/news/life/breakingnews/4316451'
  },
  {
    title:'賴清德拋「核電備用說」前核四廠長大讚不簡單',
    url:'https://tw.news.yahoo.com/%E8%B3%B4%E6%B8%85%E5%BE%B7%E6%8B%8B%E3%80%8C%E6%A0%B8%E9%9B%BB%E5%82%99%E7%94%A8%E8%AA%AA%E3%80%8D%E5%89%8D%E6%A0%B8%E5%9B%9B%E5%BB%A0%E9%95%B7%E5%A4%A7%E8%AE%9A%E4%B8%8D%E7%B0%A1%E5%96%AE%E3%80%90%E9%A2%A8%E5%90%91%E5%8F%B0%E7%81%A3%E3%80%91-075217563.html'
  },
  {
    title:'台灣面臨重大安全風險：97%的能源依靠進口',
    url:'https://cn.wsj.com/amp/articles/%E5%8F%B0%E7%81%A3%E9%9D%A2%E8%87%A8%E9%87%8D%E5%A4%A7%E5%AE%89%E5%85%A8%E9%A2%A8%E9%9A%AA-97-%E7%9A%84%E8%83%BD%E6%BA%90%E4%BE%9D%E9%9D%A0%E9%80%B2%E5%8F%A3-e7b62b03'
  },
  {
    title:'《華爾街日報》台灣安全的重大風險：97%的能源依靠進口',
    url:'https://www.storm.mg/amparticle/4828403'
  },
  {
    title:'侯友宜公布能源政策 核一二三延役、安全重啟核四',
    url:'https://www.cna.com.tw/news/aipl/202308090062.aspx'
  },
  {
    title:'安全核廢可解決不排除核電 賴清德：既有核能延役考慮法律民意執行3問題',
    url:'https://www.ctee.com.tw/news/20231019700909-430101'
  },
  {
    title:'賴清德提能源5政策：核安、核廢若解決，不排除核能',
    url:'https://esg.gvm.com.tw/article/35639'
  },
  {
    title:'賴清德：核四沒有重啟問題 若解決核安與核廢料 不會排除核電',
    url:'https://tw.news.yahoo.com/%E8%B3%B4%E6%B8%85%E5%BE%B7%EF%BC%9A%E6%A0%B8%E5%9B%9B%E6%B2%92%E6%9C%89%E9%87%8D%E5%95%9F%E5%95%8F%E9%A1%8C-%E8%8B%A5%E8%A7%A3%E6%B1%BA%E6%A0%B8%E5%AE%89%E8%88%87%E6%A0%B8%E5%BB%A2%E6%96%99-%E4%B8%8D%E6%9C%83%E6%8E%92%E9%99%A4%E6%A0%B8%E9%9B%BB-063933396.html'
  },
  {
    title:'美日等宣言增核電 侯友宜：賴清德與國際趨勢背道而馳',
    url:'https://www.cna.com.tw/news/aipl/202312030066.aspx'
  },
  {
    title:'賴清德鬆口了！若要用核電「有這前提」　「人民已經決定讓核四不重啟」',
    url:'https://tw.nextapple.com/politics/20231019/FDB8FE952135CDC9DB9364EEC14CCF8C'
  },
  {
    title:'COP28氣候大會回顧：除了脫離化石燃料還談成了什麼？',
    url:'https://e-info.org.tw/node/238173'
  },
  {
    title:'總統候選人們「氣候政見」最主要的異同為何？還缺了什麼核心思考？',
    url:'https://csr.cw.com.tw/article/43478'
  },
  {
    title:'賴清德提「0-22歲」政策　拋「育兒指導員」、增「身心適應假」、推囤房稅2.0',
    url:'https://www.ftnn.com.tw/news/77897#google_vignette'
  },
  {
    title:'賴清德：若當選 推「長照3.0」與「0-6歲國家一起養2.0」',
    url:'https://www.rti.org.tw/news/view/id/2175105'
  },
  {
    title:'總統候選人給問嗎？托育支持、平等分工、友善家庭企業政見，3位候選人這樣回',
    url:'https://www.parenting.com.tw/article/5096712'
  },
  {
    title:'賴清德：落實3大承諾 全面改善道路交通安全',
    url:'https://www.cna.com.tw/news/aipl/202308200162.aspx'
  },
  {
    title:'細數長照政績 侯友宜：津貼重度失能照顧者每月5000',
    url:'https://www.chinatimes.com/amp/realtimenews/20231101005943-260407'
  },
  {
    title:'高齡化社會來臨！侯友宜提長照三支箭',
    url:'https://tw.news.yahoo.com/%E9%AB%98%E9%BD%A1%E5%8C%96%E7%A4%BE%E6%9C%83%E4%BE%86%E8%87%A8-%E4%BE%AF%E5%8F%8B%E5%AE%9C%E6%8F%90%E9%95%B7%E7%85%A7%E4%B8%89%E6%94%AF%E7%AE%AD-025635379.html'
  },
  {
    title:'賴清德提醫療與長照政見 推打造「居家、社區、機構、醫療、社福一體式服務」',
    url:'https://tw.news.yahoo.com/%E8%B3%B4%E6%B8%85%E5%BE%B7%E6%8F%90%E9%86%AB%E7%99%82%E8%88%87%E9%95%B7%E7%85%A7%E6%94%BF%E8%A6%8B-%E6%8E%A8%E6%89%93%E9%80%A0-%E5%B1%85%E5%AE%B6-%E7%A4%BE%E5%8D%80-%E6%A9%9F%E6%A7%8B-081300367.html'
  },
  {
    title:'與賴清德「長照3.0」打對台 柯文哲推長照7大處方箋 直言賴沒講錢從哪來',
    url:'https://www.cmmedia.com.tw/home/articles/42489'
  },
  {
    title:'賴清德VS柯文哲「醫療長照政見」 百億癌症基金、中央長照保險局',
    url:'https://tw.news.yahoo.com/%E6%87%B6%E4%BA%BA%E5%8C%85-%E8%B3%B4%E6%B8%85%E5%BE%B7vs%E6%9F%AF%E6%96%87%E5%93%B2-%E9%86%AB%E7%99%82%E9%95%B7%E7%85%A7%E6%94%BF%E8%A6%8B-%E7%99%BE%E5%84%84%E7%99%8C%E7%97%87%E5%9F%BA%E9%87%91-%E4%B8%AD%E5%A4%AE%E9%95%B7%E7%85%A7%E4%BF%9D%E9%9A%AA%E5%B1%80-103829970.html'
  },
  {
    title:'賴清德長照3.0政見 住宿式機構補助目標提高至18萬',
    url:'https://www.cna.com.tw/news/aipl/202309210083.aspx'
  },
  {
    title:'兩岸持續緊張！ 盤點台灣「國防產業」現況',
    url:'https://tw.news.yahoo.com/%E5%85%A9%E5%B2%B8%E6%8C%81%E7%BA%8C%E7%B7%8A%E5%BC%B5-%E7%9B%A4%E9%BB%9E%E5%8F%B0%E7%81%A3-%E5%9C%8B%E9%98%B2%E7%94%A2%E6%A5%AD-%E7%8F%BE%E6%B3%81-144339923.html'
  },
  {
    title:'去年交通事故奪3085命 10年新高',
    url:'https://news.ltn.com.tw/amp/news/life/paper/1573879.'
  },
  {
    title:'國家發展委員會-高齡化時程',
    url:'https://www.ndc.gov.tw/Content_List.aspx?n=D527207EEEF59B9B'
  },
  {
    title:'老年人口突破14% 內政部：臺灣正式邁入高齡社會',
    url:'https://www.moi.gov.tw/News_Content.aspx?n=2&s=11663&hl=zh_TW_%23Hant'
  },
  {
    title:'《總統政見會》柯文哲：「5個互相」與中國相處 找出彼此可接受方案',
    url:'https://news.ltn.com.tw/news/politics/breakingnews/4527131'
  },
  {
    title:'解決缺工問題 賴清德籲企業界加薪',
    url:'https://www.cna.com.tw/news/firstnews/201710220173.aspx'
  }
]

onMounted(() => {
  console.log(`Version：${version}`);
  gameStore.setData(questions, references);
});
</script>

<template>
  <main>
    <RouterView />
  </main>
  <LayoutFooter />
  <Modal v-model:show="modal.show" :title="modal.title" :message="modal.message" @closeModal="modal.show = false"/>
</template>

<style scoped>
  main {
    display: flex;
    flex-grow: 1;
    width: 100%;
  }
</style>
@/stores/gameStore