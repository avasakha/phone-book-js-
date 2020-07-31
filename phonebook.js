function PhoneBookRecords(name,phone){
    this.name=name
    this.phone=phone
}
function PhoneBook(){
    this.records=[];
    this.add=function(name,phone){
const record=new PhoneBookRecords(name,phone);
this.records.push(record)

    };


    this.search=function(keyword){
        const filtersearch=this.records.filter(item=>item.name.toLowerCase().includes(keyword.toLowerCase()))
        // const filtersearch=this.records.filter(item=>item.name.toLowerCase()===keyword.toLowerCase())
        return filtersearch 

};
this.remove=function(name){
    const index=this.records.findIndex(item=>item.name===name);
    index!==-1?this.records.splice(index,1):this.records
  
}
   
}

function ElementBuilder(name) {
    this.element = document.createElement(name);

    this.text = function (text) {
        this.element.textContent = text;
        return this;
    }

    this.type = function (type) {
        this.element.type = type;
        return this;
    }

    this.appendTo = function (parent) {
        if (parent instanceof ElementBuilder) {
            parent
                .build()
                .appendChild(this.element);
        }
        else {
            parent.appendChild(this.element);
    }
        return this;
    }

    this.placeholder = function (text) {
        this.element.placeholder = text;
        return this;
    }

    this.hide = function () {
        this.element.style.display = 'none';
        return this;
    }

    this.show = function () {
        this.element.style.display = 'block';
        return this;
    }

    this.className = function (className) {
        this.element.className = className;
        return this;
    }

    this.onclick = function (fn) {
        this.element.onclick = fn;
        return this;
    }

    this.html = function (htmlvalue) {
        this.element.innerHTML = htmlvalue;
        return this;
    }

    this.value = function (value) {
        this.element.value = value;
        return this;
    }

    this.build = function () {
        return this.element;
    }
}

const builder = {
    create: function (name) {
        return new ElementBuilder(name);
    }
}

let list=null;


function Painter(container){
    
    const phoneBook=new PhoneBook();
    this.container=container;
    function showList(record){
        list.html('')
    record.forEach(item=>{
      
         const liAdd=builder.create('li')
        .text(`${item.name}      #${item.phone}`)
        .appendTo(list)

        builder.create('button')
        .text('x')
        .appendTo(liAdd).onclick(()=>{
            phoneBook.remove(item.name);
            showList(phoneBook.records);
        })
    })
    }
    
    this.init=function(){


builder.create('h1')
.text('PhoneBook')
.appendTo(this.container);


const searchPannel=builder.create('div')
.appendTo(this.container)


const searchBox=builder.create('div')
.appendTo(searchPannel)


const addPanel=builder.create('div')
.className('addPanel')
.appendTo(this.container).hide()

 const addName=builder.create('input')
.type('text')
.appendTo(addPanel)



 const addPhone=builder.create('input')
.type('text')
.appendTo(addPanel)



builder.create('button')
.text('Save')
.appendTo(addPanel).onclick(()=>{
    const name=addName.build().value
    const phone=addPhone.build().value
    phoneBook.add(name,phone)
    showList(phoneBook.records)
    addName.value('')
    addPhone.value('')

});


builder.create('button')
.text('Cancel')
.appendTo(addPanel).onclick(()=>{
    addPanel.hide();
    searchPannel.show()
});



 const inputSearch=builder.create('input')
.type('text')
.appendTo(searchBox)


const ul=builder.create('ul')
    .appendTo(searchPannel);

builder.create('button')
.text('Search')
.appendTo(searchBox).onclick(()=>{
    ul.html('')
    const keyword=inputSearch.build().value
     let filter=phoneBook.search(keyword);
   filter.forEach(item=>{
       builder.create('li').text(`${item.name} #${item.phone}`).appendTo(ul)
   })
   inputSearch.value('');
  filter=[];
 


});

builder.create('button')
.text('Add')
.appendTo(searchBox).onclick(()=>{
    searchPannel.hide();
    addPanel.show();
})


 list=builder.create('ul')
.appendTo(addPanel)

    }
} 
const builderApp=document.getElementById('CONTAINER');
const app=new Painter(builderApp);
app.init();