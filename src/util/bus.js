function checkFilter(category, title, checked) {
			//console.log(category, title, checked);
			if(checked) {
				this[category].push(title);
			} else {
				this[category] = this[category].filter( _title => title != _title); 
			}
			//console.log(JSON.stringify(this[category]));
}

export { checkFilter };