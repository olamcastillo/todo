const	section 			= document.getElementById('showTask'),
			template			= document.getElementById('template').content,
			form					= document.querySelector('#form'),
			alertTemp			= document.getElementById('alertTemp').content,
			alertSec			= document.getElementById('alert')


let tasks = [];


const processForm = (e) => {
	e.preventDefault();
	const data 	= new FormData(form) 
	const [ task ] = [...data.values()]
	if(!task.trim()){
		const fragment 	= document.createDocumentFragment()
		const clone 		= alertTemp.cloneNode(true)
		fragment.appendChild(clone)
		alertSec.className = 'alert alert-danger d-flex align-items-center'
		alertSec.appendChild(fragment)
	}else{
		alertSec.innerText = ''
		alertSec.className= ''
	}
	addTask(task)
	showTasks()
}

const addTask = (task) => {
	const objectTask = {
		name:task,
		id: `${Date.now()}`
	}
	tasks.push(objectTask)
}

const showTasks = () => {
	localStorage.setItem('tasks', JSON.stringify(tasks))
	section.textContent= ''
	const fragment 	= document.createDocumentFragment()
	tasks.forEach( (task) => {
		const clone 		= template.cloneNode(true)
		clone.querySelector('p').textContent = task.name
		clone.querySelector('.btn').dataset.id = task.id
		fragment.appendChild(clone)
	})
	section.appendChild(fragment)
}

document.addEventListener('click', (e) => {
	if(e.target.matches('.btn-danger')) {
		console.log(e.target.dataset.id);
		tasks = tasks.filter((item) => item.id !== e.target.dataset.id)
		showTasks();
	}
})

document.addEventListener('DOMContentLoaded', (e) => {
	if (localStorage.getItem("tasks")) {
		tasks = JSON.parse(localStorage.getItem("tasks"));
		showTasks();
	}
})


form.addEventListener('submit', processForm)