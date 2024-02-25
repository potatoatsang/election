import { defineStore } from 'pinia';
import { isOnline, apiDefault } from '@/config';
import axios from 'axios';

export interface Question {
  id: string;
  theme: string;
  content: string;
  answers: Answer[]
}

export interface Answer {
  id: string;
  content: string;
}

export interface Percentage {
  candidateId: string;
  percent: string;
}

export interface AnsResults {
  Ans: Record<string, string>;
}

export interface ElectionResult {
  percentage: {
    A1: string;
    A2: string;
    A3: string;
  };
  finalCandidate: string;
  shareCount: number;
  visitorCount: number;
  originCandidateName: string;
  finalCandidateName: string;
}

export interface Reference {
  title: string;
  url: string;
}

export const useGameStore = defineStore({
  id: 'game',
  state: () => ({
    isHome: true,
    isLoading: true,
    candidateId: 'A0',
    questions: [] as Question[],
    ansResults: {} as Record<string, string>,
    electionResult: {
      percentage: {
        A1: '0%',
        A2: '0%',
        A3: '0%',
      },
      finalCandidate: 'A0',
      shareCount: 0,
      visitorCount: 0,
      originCandidateName: '',
      finalCandidateName: ''
    } as ElectionResult,
    references: [] as Reference[],
  }),
  actions: {
    init() {
      this.isHome = true;
      this.isLoading = true;
      this.candidateId = 'A0'
      this.ansResults = {};
    },
    async apiVisitor() {
      const logStore = this.logStore;
      const setVisitorCount = this.setVisitorCount;
      await axios.get(`${apiDefault}/qainfo/visitor`)
      .then(function (response) {
        const result = response.data;
        logStore('RESPONSE', result);
        setVisitorCount(result);
      })
      .catch(function (error) {
        logStore('ERROR', error);
      });
    },
    async apiShare() {
      const logStore = this.logStore;
      await axios.get(`${apiDefault}/qainfo/share`)
      .then(function (response) {
        const result = response.data;
        logStore('RESPONSE', result);
      })
      .catch(function (error) {
        logStore('ERROR', error);
      });
    },
    async apiAddqares() {
    const logStore = this.logStore;
      const setElectionResult = this.setElectionResult;
      const targetContent = { ...this.ansResults };
      const request = {
        userAns: targetContent,
        userPrimaries: this.candidateId
      };
      await axios.post(`${apiDefault}/qainfo/addqares`, request)
      .then(function (response) {
        const result = response.data;
        logStore('RESPONSE', result);
        setElectionResult(result);
      })
      .catch(function (error) {
        logStore('ERROR', error);
      })
    },
    setData(questions: Question[], references: Reference[]){
      this.questions = questions;
      this.references = references;
    },
    addAnswer(qaId: string, ansId: string) {
      this.ansResults[qaId] = ansId;
    },
    setVisitorCount(result: number) {
      this.electionResult.visitorCount = result;
    },
    setElectionResult(result: ElectionResult) {
      this.isLoading = false;
      this.electionResult.percentage = result.percentage;
      this.electionResult.finalCandidate = result.finalCandidate;
      this.electionResult.shareCount = result.shareCount;
      this.electionResult.originCandidateName =  this.getCandidateName(this.candidateId);
      this.electionResult.finalCandidateName =  this.getCandidateName(this.electionResult.finalCandidate);
    },
    getCandidateName(candidateId: string) {
      let candidateName = '';
      switch(candidateId){
        case 'A1':
          candidateName = '柯文哲'
          break;
        case 'A2':
          candidateName = '賴清德'
          break;
        case 'A3':
          candidateName = '侯友宜'
          break;
      }
      return candidateName;
    },
    logStore(method: string, data: any) {
      const today = new Date();
      const nowTime = today.toLocaleTimeString();
      if(!isOnline)
        console.log(`[${nowTime}][${method}] data：`, data);
    }
  },
});
