import Vue from 'vue';
import './style.scss';
import genres from './util/genres';

new Vue({
	el: "#app",
	data: {
		genre: [],
		time: []
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
		'movie-list': {
			template: `<div id="movie-list">
						<div v-for="movie in filterdMovies" class="movie">
							{{movie.title}}
						</div>
					   </div>`,
			data(){
				return {
				   movies: [
					{title: 'pulp fiction', genre: genres.CRIME},
					{title: 'Home Alone', genre: genres.COMEDY},
					{title: 'Austin Powers', genre: genres.COMEDY}
				    ]
			     }
			},
			props: ['genre', 'time'],
			methods: {
				moviePassesGenreFilter(movie){
					return true;
				}
			},
			computed: {
				filterdMovies() {
					// return this.movies.filter(moviePassesGenreFilter);
					//console.log(typeof(this.movies))
					return this.movies.filter(this.moviePassesGenreFilter);
				}
			}
		},

		'movie-filter': {
			 data(){
			 	return {
			 		genres
			 	};
			 },
			 template: `<div id="movie-filter">
						 <h2> filter results</h2>
						 <div class="filter-group" >
						 	<check-filter v-for="genre in genres" v-bind:title="genre" @check-filter="checkFilter"></check-filter>
						 </div>
					   </div>`,
			 methods: {
			 	checkFilter(category, title, checked) {
			 		this.$emit('check-filter', category, title, checked);
			 		//console.log('genre', title, checked);
			 	}
			 },
			 components: {
			 	'check-filter': {
			 		data(){
			 			return {
			 				checked: false
			 			}
			 		},
			 		template: `<div v-bind:class="{'check-filter': true, active: checked}"  @click="checkFilter"> 
			 						<span class="checkbox"></span>
			 						<span class="check-filter-title"> {{title}}  </span>
			 		           </div>`,
			 		props: ['title'],
			 		methods: {
			 			checkFilter(){
			 				this.checked = !this.checked;
			 				this.$emit('check-filter', 'genre', this.title, this.checked);
			 				// console.log('genre', this.title, this.checked);
			 			}
			 		}
			 	}
			 }
		}
	}
});