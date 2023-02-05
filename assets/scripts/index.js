const form = document.querySelector("#form-create-task");
const tbodyTasks = document.querySelector("#tbody-tasks");

const KEY_TASKS_LOCAL_STORAGE ="tasks";

var tasks =  getTasksLocalStore();

if(tasks !== null){
    updateViewTable(tasks);
}
else{
    tasks=[];
}
form.addEventListener("submit", (event) => {
//previne que o submit do formulário atualize a página
    event.preventDefault();
   //pega os dados no formulário
    const formValues = event.target;
    const{title, description} = formValues;

    //insere um objeto no array tasks
    tasks.push({
        title:title.value,
        description: description.value
    });

    //zera os campos do formulário
    title.value="";
    description.value="";

  //atualizar a tabela
  updateViewTable (tasks);
  //salva toda minha lista no local storage
  saveTasksLocalStorage();

});
function updateViewTable (list){
    //zerar tbody
    tbodyTasks.innerHTML = "";

    //percorre a lista para criar as tr`s
    list.forEach((item,index)=> {
        //criar tr(tag)
        const trElement = document.createElement("tr");
        
        //insere as colunas(td)dentro da tr (linha)criada
        trElement.innerHTML = `
            <td>${index +1 }</td>
            <td>${item.title}</td>
            <td>${item.description}</td>
            <td>ações</td>
        `;
           //insere a tr dentro do tbody    
        tbodyTasks.appendChild(trElement);
    });
}  
function saveTasksLocalStorage(){
    const listTasksString = JSON.stringify(tasks);
    localStorage.setItem(KEY_TASKS_LOCAL_STORAGE, listTasksString);
}

function getTasksLocalStore(){
    const dataString =localStorage.getItem(KEY_TASKS_LOCAL_STORAGE);
    const list= JSON.parse(dataString);
    return list;
}
