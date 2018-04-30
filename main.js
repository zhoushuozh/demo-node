button.addEventListener('click', (e)=>{
	let script = document.createElement('script')
	let functionName = 'query' + parseInt(Math.random()*100000,10)
	window[functionName] = function(){
		amount.innerText = parseInt(amount.innerText,10) - 1
	}
	script.setAttribute("type","text/javascript")
	script.src = '/pay?callback=' + functionName
	document.body.appendChild(script)
	script.onload = (e) => {
		e.currentTarget.remove()
		delete window[functionName]
	}
	script.onerror = (e) => {
		alert('fail')
		e.currentTarget.remove()
		delete window[functionName]
	}
})

