
let Title = document.getElementById('title');
let Price = document.getElementById('price');
let Ads = document.getElementById('ads');
let Taxes = document.getElementById('taxes');
let Discount = document.getElementById('discount');
let Count = document.getElementById('count');
let Category = document.getElementById('category');
let Totale = document.getElementById('totale');

let Creer = document.getElementById('creer')
let deleteA = document.getElementById('deleteAll')
// ################### mode
let Mode = "creer"
let X;

// ######################################################################################## Totale

function  Totalee () {
    let TotalePrice = (
        +Price.value - +Ads.value - +Taxes.value - +Discount.value
    )
    Totale.innerHTML =  TotalePrice
    if (Price.value != ""){
        Totale.style.backgroundColor = "blue"
        Totale.style.border = '1px solid white'
    }else{
        Totale.style.color = "white"
        Totale.style.border = '1px solid blue'
        Totale.style.backgroundColor = 'black'
    }

}

// ########################################################################################### creer data
let Data;

if (localStorage.localData !=null) {
    Data = JSON.parse(localStorage.localData)
}else{
    Data = []
}
Creer.onclick = function () {
    
        let objData = {
            Title : Title.value.toLowerCase(),
            Price : Price.value,
            Ads : Ads.value,
            Discount : Discount.value,
            Taxes : Taxes.value,
            Count : Count.value,
            Category :Category.value.toLowerCase(),
            Totale : Totale.innerHTML
        }
    
        if (Title.value != '' && objData.Count < 100) {
            if (Mode === 'creer'){
                if (objData.Count > 1){
                    for (let x = 0; x<Count.value;x++){
                        Data.push(objData)
                    }
                }else{
                    Data.push(objData)
                }
            }else{
                    Data[X] = objData
                    Creer.innerHTML = "Creer"
                    Count.style.display = 'block'
                    Mode = "creer"
                    
               
            }
            ClearData()
        }

    
    localStorage.setItem('localData',   JSON.stringify(Data))

        // ############# function
    
        ShowData ()


}


// ########################################################################################### clear data

function ClearData  () {
    Title.value = "";
    Price.value = "";
    Ads.value = "";
    Taxes.value = "";
    Discount.value = "";
    Count.value = "";
    Category.value = "";
    Totale.innerHTML = ""
}

// ########################################################################################### lir data data

function ShowData () {
    let dataTbody = '';
    for (let i = 0; i < Data.length; i++){
        dataTbody += `
        <tr>
        <td>${i+1}</td>
        <td>${Data[i].Title}</td>
        <td>${Data[i].Price}</td>
        <td>${Data[i].Ads}</td>
        <td>${Data[i].Discount}</td>
        <td>${Data[i].Taxes}</td>
        <td>${Data[i].Totale}</td>
        <td>${Data[i].Category}</td>
        <td><button id = 'update' onclick = "UpdateData(${i})">Update</button></td>
        <td><button id = "delete" onclick = "DeleteMode ((${i})) ">Delete</button></td>
    </tr>
        `
 

    
    if (Data.length != ""){
        deleteA.innerHTML = `<button onclick = "DeleteAllMode (this.id,${i})">Delete All : ${Data.length}</button>`
    }else{
        deleteA.innerHTML = ""
    }

    let Tbody = document.getElementById('tbody')
    Tbody.innerHTML = dataTbody;

}

} ShowData ()

// ########################################################################################### deleteOn data*
function DeleteMode (i) {
    deleteA.innerHTML = `<button id = 'btndelete'>ar yous sure ? <span id = 'yes' onclick = 'DeleteOn (this.id,${i})'>Yes</span> OR <span id ='no' onclick = 'DeleteOn (${i})' > No</span></button>`
    scroll({
        top : 0,
        behavior : "smooth"
    })
}


function DeleteOn (mode,id) {
    if (mode == 'yes'){
        Data.splice(id,1)
        localStorage.localData = JSON.stringify(Data)
        ShowData ()
    }else{
        ShowData ()
    }

 }

 
// ########################################################################################### DeleteAll data*
function DeleteAllMode (i) {
    deleteA.innerHTML = `<button id = 'btndelete'>ar yous sure ? <span id = 'yes' onclick = 'DeleteAll (this.id)'>Yes</span> OR <span id ='no' onclick = 'DeleteAll(this.id)' > No</span></button>`

}

function DeleteAll (mode) {
    console.log(Data)
    if (mode == 'yes'){
        localStorage.clear()
        Data.splice(0)
        console.log(Data)
        if(Data =  0){
            ShowData()
        }
    }else{
        ShowData()
    }
   
} 
// ########################################################################################### update data*

function UpdateData (id) {
    Title.value = Data[id].Title
    Price.value = Data[id].Price
    Ads.value = Data[id].Ads
    Taxes.value = Data[id].Taxes
    Discount.value = Data[id].Discount
    Category.value = Data[id].Category
    // ###########
    Count.style.display = 'none'
    Creer.innerHTML = 'Update'
    Mode = 'update'
    X = id

    Totalee ()
    Search.value = ""

    scroll ({
        top : 0,
        behavior : "smooth"
    })
    deleteA.innerHTML = ""
}

// ########################################################################################### search data
let Search = document.getElementById('search');

let mode = 'Title'
function SearchMode(id){
    if(id == "searchByTitle"){
        mode = 'Title'
    }else{
        mode = 'Category'
    }
    Search.focus()
    Search.placeholder = `Search By ${mode}`
    Search.value = ""
 ShowData ()
    
    // Search.innerHTML = `Search By ${mode}`
}


function SearchData  (data) {
    let b = 0;
    let dataTbody = '';
    for(let i = 0; i<Data.length;i++){

    if (mode == 'Title'){
           if (Data[i].Title.includes(data.toLowerCase())){
            b++
            dataTbody += `
            <tr>
            <td>${i+1}</td>
            <td>${Data[i].Title}</td>
            <td>${Data[i].Price}</td>
            <td>${Data[i].Ads}</td>
            <td>${Data[i].Discount}</td>
            <td>${Data[i].Taxes}</td>
            <td>${Data[i].Totale}</td>
            <td>${Data[i].Category}</td>
            <td><button id = 'update' onclick = "UpdateData(${i})">Update</button></td>
            <td><button id = "delete" onclick = "DeleteOn (${i}) ">Delete</button></td>
        </tr>
            `
           
            
           }

        
    }
    
    else{
        if (Data[i].Category.includes(data.toLowerCase())){
            b++
            dataTbody += `
            <tr>
            <td>${i+1}</td>
            <td>${Data[i].Title}</td>
            <td>${Data[i].Price}</td>
            <td>${Data[i].Ads}</td>
            <td>${Data[i].Discount}</td>
            <td>${Data[i].Taxes}</td>
            <td>${Data[i].Totale}</td>
            <td>${Data[i].Category}</td>
            <td><button id = 'update' onclick = "UpdateData(${i})">Update</button></td>
            <td><button id = "delete" onclick = "DeleteOn (${i}) ">Delete</button></td>
        </tr>
            `
           }

        }

        
        if (b > 0){
            deleteA.innerHTML = `<td><button onclick = "DeleteAll ()">Delete All : ${b}</button></td>`
        }else{
            deleteA.innerHTML = ""
        }
    }

    document.getElementById('tbody').innerHTML = dataTbody;
}

