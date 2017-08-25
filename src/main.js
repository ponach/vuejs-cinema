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

new Vue({
	el: "#app",
	data: {
		genre: [],
		time: [],
		movies: [], 
		moment,
		day: moment()
	},
	methods: {
		checkFilter(category, title, checked) {
			//console.log(category, title, checked);
			if(checked) {
				this[category].push(title);
			} else {
				this[category] = this[category].filter( _title => title != _title); 
			}
			//console.log(JSON.stringify(this[category]));
		}
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
	}
});