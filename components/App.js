var prefix = "https://cors-anywhere.herokuapp.com/",
	GIPHY_API_URL = 'https://api.giphy.com',
	GIPHY_PUB_KEY = 'mGJMdJDFVy5GARHhYPTA45ieSalI8RFm';

App = React.createClass({
	getInitialState() {
		return {
			loading: false,
			searchingText: '',
			gif: {}
		}
	},

	handleSearch: function(searchingText) {  
	    this.setState({
	      loading: true  
	    });
	    this.getGif(searchingText).then(gif => {  
	      this.setState({ 
	        loading: false, 
	        gif: gif, 
	        searchingText: searchingText 
	      });
	    }.bind(this));
	},

	getGif: function(searchingText, callback) {
		return new Promise((resolve, reject) => {
		    const url = prefix + GIPHY_API_URL + '/v1/gifs/random?api_key=' + GIPHY_PUB_KEY + '&tag=' + searchingText;  
		    const xhr = new XMLHttpRequest();
		    xhr.open('GET', url);
		    xhr.onload =  function() {
		    	if(xhr.status === 200) {
		    		const data = JSON.parse(xhr.responseText).data;
		    		const gif = {  
		                url: data.fixed_width_downsampled_url,
		                sourceUrl: data.url
		            };
		            resolve(gif);
		    	} else {
		    		reject('Wystąpił błąd!');
		    	}
		    }
		    xhr.send();
		});
	},

	// getGif: function(searchingText, callback) {  
	//     var url = prefix + GIPHY_API_URL + '/v1/gifs/random?api_key=' + GIPHY_PUB_KEY + '&tag=' + searchingText;  
	//     var xhr = new XMLHttpRequest();  
	//     xhr.open('GET', url);
	//     xhr.onload = function() {
	//         if (xhr.status === 200) {
	//            var data = JSON.parse(xhr.responseText).data; 
	//             var gif = {  
	//                 url: data.fixed_width_downsampled_url,
	//                 sourceUrl: data.url
	//             };
	//             callback(gif);  
	//         }
	//     };
	//     xhr.send();
	// },

	render: function() {

		var styles = {
			margin: '0 auto',
            textAlign: 'center',
            width: '90%'
		};

		return (
			<div style={styles}>
				<h1>Wyszukiwarka Gifow!</h1>
				<p>Znajdź gifa na <a href='http://giphy.com'>giphy</a>. Naciskaj enter, aby pobrać kolejne gify.</p>
				<Search 
					onSearch={this.handleSearch}
				/>
				<Gif
					loading={this.state.loading}
				    url={this.state.gif.url}
				    sourceUrl={this.state.gif.sourceUrl}
				/>
			</div>
		)
	}
});