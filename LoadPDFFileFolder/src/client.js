console.log('Client-side code running');

const button = document.getElementById('ExecutarCmd');


button.addEventListener('click', function(e) {
  console.log('button was clicked');

	fetch('/clicked', {method: 'GET'})
    .then(function(response) {
		
		console.log("eeereerer")
		document.getElementById('ExecutarCmd_Id').innerHTML="Acabou";
	  return response.json();

    })
    .then(function(data) {
		console.log("aaaaaaa")
	  document.getElementById('ExecutarCmd_Id').innerHTML = "Processamento em curso";
	  
    })
    .catch(function(error) {
      console.log(error);
    });
});
