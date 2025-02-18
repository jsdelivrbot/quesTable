/**
 * Created by mating on 2017/4/24.
 */
import Vuex from 'vuex'
import Vue from 'vue'

import urlConfig from '../router/url'
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    account: [],
    table:{
      data:[],
      hospitalFilter:[],
      accountFilter:[]
    },
    page:{
      total:1,
      current:1
    },
    filters:{
      pageIndex:1,
      reportDate: '',
      product: '',
      module: '',
      hospitalName: '',
      people: '',
      accepter:'',
      needQuestion: '',
      level: '',
      resolve:''
    },
    hospital:[]
  },
  actions:{
    accountList({state,commit}){
      $.get(urlConfig.get('account'),(re)=>{
        if(re.status==0){
          commit('accountList',re.result);
        }
      },'json');
    },
    reportList:function({state,commit}){
      $.get(urlConfig.get('reportList'),state.filters,(re)=>{
        commit('reportList',re.result||[]);
      },'json').catch(()=>{
      });
    },
    hospitalList:function({state,commit}){
      $.get(urlConfig.get('hospitalList'),(re)=>{
        if(re.status==0){
          commit('hospitalList',re.result);
        }
      },'json');
    }
  },
  mutations: {
    changeFilters(state,f){
      if(f.name){
        state.filters[f.name]=f.value;
      }else{
        state.filters=f;
      }
    },
    changePage(state,p){
      state.page.current=p||1;
      state.filters.pageIndex=p||1;
    },
    reportList(state,data){
      state.table.data = data.reportInfos||[]
      state.page.total = Number(data.total)||1
    },
    hospitalList(state,data){
      state.hospital = data||[];
      state.table.hospitalFilter=(data||[]).map((v)=>{
        return {
          label:v.hospitalName,
          value:v.hospitalName
        }
      });
    },
    accountList(state,data){
      state.account=data||[];
      state.table.accountFilter=(data||[]).map((v)=>{
        return {
          label:v.userName,
          value:v.userName
        }
      });
    },
    SETUSER (state,p) {
      state.user=p;
    },
    setTableItem(state,p){
      state.table.data[p.row][p.column]=p.newValue;
    }
  }
})
