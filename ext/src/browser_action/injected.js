(function() {

setTimeout(function() {
	function getScores(text) {
		document.getElementById('rest').style.display = 'none';
		document.getElementById('result').style.display = 'none';
		document.getElementById('loading').style.display = 'block';
		axios.post('http://localhost:5000/parse', {
			textPayload: text
		}).then(function (response) {
			document.getElementById('result').style.display = 'block';
			document.getElementById('loading').style.display = 'none';
			console.log(response);
			document.getElementById('probabilityBox').innerText = response.data.fakeProbability+"%";
			document.getElementById('stanceBox').innerText = "Stance Detection      "+response.data.stanceDetection;
			document.getElementById('stanceBox').style.backgroundColor = response.data.factCheck ? "#90bf41" : "red"; 
			document.getElementById('factBox').innerText = "Fact Check      "+response.data.factCheck;
			document.getElementById('factBox').style.backgroundColor = response.data.factCheck ? "#90bf41" : "red"; 
			document.getElementById('sentimentBox').innerText = "Sentiment Score      "+response.data.sentiment[0];
			document.getElementById('sentimentBox').style.backgroundColor = response.data.sentiment < 0 ? "red" : "#90bf41"; 
			document.getElementById('reputationBox').innerText = "Reputation Score       "+response.data.reputation;
			document.getElementById('reputationBox').style.backgroundColor = response.data.sentiment < 0 ? "red" : "#90bf41"; 
		})
		.catch(function (error) {
			document.getElementById('rest').style.display = 'block';
			document.getElementById('loading').style.display = 'none';
			console.log(error);
		});
	}


	const elements = document.getElementsByClassName('tryButton');
	if (elements) {
		elements[0].innerText = 'Most Singapore Ministers agrees with MOE implementation of parking fees for teachers';
		elements[0].addEventListener('click', function(event) {
			event.preventDefault();
			getScores('Most Singapore Ministers agrees with MOE implementation of parking fees for teachers');
		}, true);

		elements[1].innerText = "Geylang Bazaar stall sells 'plastic' keropok";
		elements[1].addEventListener('click', function(event) {
			event.preventDefault();
			getScores("Geylang Bazaar stall sells 'plastic' keropok")
		}, true);

		elements[2].innerText = 'Singapores national reserves - Goverment says: We need to save what we can';
		elements[2].addEventListener('click', function(event) {
			event.preventDefault();
			getScores('Singapores national reserves - Goverment says: We need to save what we can')
		}, true);
	}
}, 1000);

})();