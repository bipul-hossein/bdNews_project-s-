
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

const loadData = async (id='01') => {
    //console.log(id)
    id.textContent = ""
    fetch(`https://openapi.programming-hero.com/api/news/category/${id} `)
        .then(response => response.json())
        .then(data => displayLoadData(data.data))
    //  console.log(data.data)
}
loadData()

const displayLoadData = async (data) => {
    //items no. assign
    const selectItemsFeild = document.getElementById('items-number')
    const selectItemsString = selectItemsFeild.innerText;
    const selectItems = parseFloat(selectItemsFeild)
    selectItemsFeild.innerText = data.length


    const cardContainer = document.getElementById("card-items");
    cardContainer.textContent = ""
    data.forEach(data => {

        //console.log(data)
        const { details, image_url, title } = data;

        const containerDiv = document.createElement('div')
        containerDiv.innerHTML = `
                <div class="card card-side bg-base-100 shadow-xl">
                <figure><img class="h-64 w-64 p-4" src="${image_url}" alt="Shoes" /></figure>
                <div class="card-body">
                    <h2 class="card-title">"${title ? title : title}"</h2>
                    <p>${details.length > 20 ? details.slice(0, 70) + ".." : details}</p>
                    <p>price: </p>
                    <div class="card-actions justify-end">
                    
                    <label for="my-modal-3">
                    <a id="" class="btn modal-button text-2xl mx-2" onclick="showModal('${details}','${image_url}','${title}')"> <i class="fa-solid fa-arrow-right"></i></a>
                    </div>
                </div>
            </div> 
                 `
        cardContainer.appendChild(containerDiv)
    })

}

const showModal = (details, image_url, title) => {
    //console.log(details, image_url, title)
    const modalBody = document.getElementById("modal-body");
    modalBody.textContent = "";
    modalBody.innerHTML = `
    <p class="py-4 card-title text-primary">${title}</p>
    <img src="${image_url}"/>
    <p class="py-4">${details}</p>
    `
}


