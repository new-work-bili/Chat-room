
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// 外面使用需要进行暴露
export default new Vuex.Store({
	state:{
		clickName:localStorage.name,//默认值设为localStirage中存储的name，防止刷新后vuex中到值初始化为空而取不到值
	},
	mutations:{
		setName(state,name){
			state.clickName = name;
		}
		
	}
})