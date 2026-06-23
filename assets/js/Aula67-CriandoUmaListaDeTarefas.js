function getTasks(){
    const inputTarefa = document.querySelector('.input-text');
    const btnTarefa = document.querySelector('.btn-tarefa');
    const listaTarefa = document.querySelector('.lista');

    function createLI() {
        const li = document.createElement('li');
        return li;
    }
    
    function limpaInput() {
        inputTarefa.value = '';
        inputTarefa.focus();
    };

    function btnErase(li) {
        li.innerText += ' ';
        const buttonErase = document.createElement('button');
        buttonErase.innerText = 'Apagar';
        buttonErase.setAttribute('class','btnApagar');
        buttonErase.setAttribute('title','Apagar aqui');
        li.appendChild(buttonErase);
    }

    function createTask(textInput) {
        const li = createLI();
        li.innerText = textInput;
        listaTarefa.appendChild(li);  
        limpaInput(); 
        btnErase(li);
        SaveTasks();
    };
    

    inputTarefa.addEventListener('keypress', function(e) {
        if (e.keyCode === 13) {
            if (!inputTarefa.value) return;
            createTask(inputTarefa.value);
        };
    });


    btnTarefa.addEventListener('click', function(){
        if (!inputTarefa.value) return;
        createTask(inputTarefa.value);
    });

    document.addEventListener('click', function(e){
        const el = e.target;
        if (el.classList.contains('btnApagar')) {
            el.parentElement.remove();
            SaveTasks();
        }
    });

    function SaveTasks(){
        const liTasks = listaTarefa.querySelectorAll('li');
        const listTasks = [];

        for (let tasks of liTasks) {
            let tasksText = tasks.innerText;
            tasksText = tasksText.replace('Apagar','').trim();
            listTasks.push(tasksText);
        }
        
        const tastsJSON = JSON.stringify(listTasks);
        localStorage.setItem('listaTarefa',tastsJSON);
    }

    function addSavedTasks() {
        const savedTasks = localStorage.getItem('listaTarefa');
        const listTasks = JSON.parse(savedTasks);

        for (let tarefa of listTasks) {
            createTask(tarefa);
        }
    }
    addSavedTasks();

};
getTasks();