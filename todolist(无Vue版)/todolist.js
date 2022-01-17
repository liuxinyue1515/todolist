// todo事项
// {
//     "title" : 代办事项名称,
//     "done" : 是否完成标志
// }

// 获取文档节点
function $(id){
    return document.getElementById(id);
}
 
// 将todo事项从本地存储中读取出来, 并返回
// 多个todo事项保存在 数组 中
function loadData(){
    let collection = localStorage.getItem("todo");
    if(collection != null){
        return JSON.parse(collection);
    }
    else return [];
}

// 将todo事项保存到本地存储中
function saveData(data){
    localStorage.setItem("todo",JSON.stringify(data));
}

function load(){

    let collection = localStorage.getItem("todo");
    if(collection != null){
        let data = JSON.parse(collection);
        let todoString = "";
        let doneString = "";
        let todoCount = 0;
        let doneCount = 0;
        for(let i=0;i<data.length;i++){
            if(data[i].done){
                doneString += "<li><input type='checkbox' onchange='javascript:update("+i+",\"done\",false"+")' checked><p id='p-"+i+"' onclick='javascript:edit("+i+")'>"+data[i].title+"</p><a href='javascript:remove("+i+")'>X</a></li>";
                doneCount += 1;
            }else{
                todoString += "<li><input type='checkbox' onchange='javascript:update("+i+",\"done\",true"+")'><p id='p-"+i+"' onclick='javascript:edit("+i+")'>"+data[i].title+"</p><a href='javascript:remove("+i+")'>X</a></li>";
                todoCount += 1;
            }
        }
        $('todolist').innerHTML = todoString;
        $('todocount').innerText = todoCount;
        $('donelist').innerHTML = doneString;
        $('donecount').innerText = doneCount;
    }else{
        $('todolist').innerHTML = '';
        $('todocount').innerText = 0;
        $('donelist').innerHTML = '';
        $('donecount').innerText = 0;
    }
    
    // 重置输入框
    title.value = '';
}

// 读取 input 输入框中的内容, 并保存到 todo事项数组中
function postaction(){
    let title = $('title');
    if(title.value == ''){
        alert("内容不能为空");
    }else{
        let data = loadData();
        let todo = {"title":title.value,"done":false};
        data.push(todo);
        saveData(data);
        title.value = ""
        load();
    }
}
 

// 更新 todo对象 中的 键 更新为 值 
function update(i,field,value){
    let data = loadData();
    // 删除
    let todo = data.splice(i,1)[0];
    todo[field] = value;
    // 增加
    data.splice(i,0,todo);
    saveData(data);
    // 重写加载
    load();
}
 
function remove(i){
    let data = loadData();

    data.splice(i,1)[0];
    saveData(data);
    // 重新加载
    load();
}
 
function edit(i)
{
    // load();
    let p = document.getElementById("p-"+i);
    title = p.innerHTML;
    p.innerHTML="<input id='input-"+i+"' value='"+title+"' />";
    let input = document.getElementById("input-"+i);
    
    // 全选input内的文字
    input.setSelectionRange(0,input.value.length);
    input.focus();
    
    // 失焦
    input.onblur = function(){
        if(input.value == ''){
            p.innerHTML = title;
            alert("内容不能为空");
        }
        else{
            update(i,'title',input.value);
        }
    };
}

// 清空本地存储
function clear(){
    localStorage.clear();
    load();
}
 
window.onload = load;