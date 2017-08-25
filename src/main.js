import Vue from 'vue';
import './style.scss';
import genres from './util/genres';
import MovieList from './components/MovieList.vue';
import MovieFilter from './components/MovieFilter.vue';

import VueResource from 'vue-resource';
Vue.use(VueResource);

import moment from 'moment-timezone';
moment.tz.setDefault("UTC");
Object.defineProperty(Vue.prototype, '$moment', { get() { return this.$root.moment; }});

const bus = new Vue({});
Object.defineProperty(Vue.prototype, '$bus', { get() { return this.$root.bus; }});

import {checkFilter} from './util/bus';

new Vue({
	el: "#app",
	data: {
		genre: [],
		time: [],
		movies: [], 
		moment,
		day: moment(),
		bus
	},
	methods: {
	},
	components: {
		MovieList,
		MovieFilter
	},
	created(){
		this.$http.get('/api')
		.then(response => {
			//console.log(response.data);
			this.movies = response.data;
		});
		this.$bus.$on('check-filter', checkFilter.bind(this));
	}
});