# chatroom

> A Vue.js project

###socket.io + vue.js 实现简易的聊天室


###技术栈：
1.  sass:css预处理器，利于后期的维护.
	如:如果要更改整体的主题颜色，只需要改变src/style/attributes.scss下的$themeColor就行了
2.	vuex:通过vuex来实现各组件之间数据的传递
	..
3.	localStorage:长期储存-->聊天记录
	vuex 的数据是存储在浏览器维护的内存中，页面刷新会重新初始化
	localStorage 的数据是存储在浏览器维护的一个简单数据库里面，在本地文件中存储，所以可以“持久化”存在。
4.	socket.io:[https://socket.io/] 通过其提供的接口，可以完成实时通信
	






## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

## 回车进入群聊