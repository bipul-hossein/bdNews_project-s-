
const loadApi = async () => {
    const response = await fetch(`https://openapi.programming-hero.com/api/news/categories`);
    const data = await response.json();
    //console.log(data)
    return data.data.news_category;

}


const displayApiForNav = async () => {
    const data = await loadApi()
    const divSelect = document.getElementById('nave_section');

    data.forEach(singleData => {
        const categoryId = singleData
        const li = document.createElement("li");
        li.innerHTML = `<a id="${singleData.category_id}" class="text-2xl mx-2" onclick="addToPlayer(this)"> ${singleData.category_name}</a>
          `
        divSelect.appendChild(li)

    })
}

displayApiForNav()

function addToPlayer(element) {
    const newsId = element.parentNode.children[0].id;
    loadData(newsId)
    const cetagoryName = element.parentNode.children[0].innerText//select cetagory name
    const selectCetagoryFeild = document.getElementById('items-category')//select cetagory feild
    const selectCetagoryString = selectCetagoryFeild.innerText;
    const selectCetagory = parseFloat(selectCetagoryString);
    selectCetagoryFeild.innerText = cetagoryName


}
function selectedCard(info) {
    const newsI = info.id;

    //console.log(newsI)
    loadNews(newsI)

}

const loadData = async (category_id = '01') => {
    //console.log(id)
    category_id.textContent = ""
    fetch(`https://openapi.programming-hero.com/api/news/category/${category_id} `)
        .then(response => response.json())
        .then(data => displayLoadData(data.data))
    //  console.log(data.data)
}




loadData()






const loadNews = async (news_id) => {
    //console.log(id)
    //category_id.textContent = ""
    fetch(`https://openapi.programming-hero.com/api/news/${news_id}`)
        .then(response => response.json())
        .then(data => newInfo(data.data))
   // console.log(data.data)
}
loadNews()

const newInfo = async (info) =>{

 const data =  info[0]
  
//console.log(data)

  const modelFieldSelect =document.getElementById("modal-body");
modelFieldSelect.textContent=""
  const divCreat = document.createElement("div");
  divCreat.innerHTML = `<h3>${data.title}</h3>
  <img class="" src="${data.image_url}" />
  <p class="text-2xl mx-2">${data.details}</p>
    `
    modelFieldSelect.appendChild(divCreat)
  
}
   





const displayLoadData = async (data) => {
//  const last = await newInfo()
//  console.log(last)
    //items no. assign
    const selectItemsFeild = document.getElementById('items-number')
    const selectItemsString = selectItemsFeild.innerText;
    const selectItems = parseFloat(selectItemsFeild)
    selectItemsFeild.innerText = data.length



    const cardContainer = document.getElementById("card-items");
    cardContainer.textContent = ""
    data.forEach(data => {

      console.log(data)
        const { details, image_url, title, author, total_view } = data;
      //  console.log(data._id)
      
        const containerDiv = document.createElement('div')
        containerDiv.innerHTML = `
                <div class="card card-side bg-base-100 shadow-xl">
                <figure><img class="h-64 w-64 p-4" src="${image_url}" alt="Shoes" /></figure>
                <div class="card-body">
                    <h2 class="card-title">${title ? title : title}</h2>
                    <p>${details.length > 20 ? details.slice(0, 150) + ".." : details}</p>
                  
                    <div class="card-actions justify-between">

                    
                    <div class="card-actions justify-between">
                   
                        <img class="w-10 rounded-full" src="${author.img}" />

                        <div>
                            <p> ${author.name}</p>
                            <p> ${author.published_date}</p>
                        </div>
                    </div>

                    <p class="text-center "><i class="fa-regular fa-eye"></i>  ${total_view} K</p>
                   

                    
                    <label for="my-modal-3">
                    <a id="${data._id}" " class="btn modal-button text-2xl mx-2" onclick="selectedCard(this)"> <i class="fa-solid fa-arrow-right"></i></a>
                    </div>
                </div>
            </div> 
                 `
        cardContainer.appendChild(containerDiv)
    })

}
/* showModal('${details}','${image_url}','${title}') */
const showModal = (details, image_url, title) => {
    console.log(details, image_url, title)
    const modalBody = document.getElementById("modal-body");
    modalBody.textContent = "";
    modalBody.innerHTML = `
    <p class="py-4 card-title text-primary">${title}</p>
    <img src="${image_url}"/>
    <p class="py-4">${details}</p>
    `
}


