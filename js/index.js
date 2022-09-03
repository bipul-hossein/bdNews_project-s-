
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
        li.innerHTML = `<a id="click_btn" onclick="addToPlayer(this)"> ${singleData.category_name}
            <p class='d-none text-black'> ${singleData.category_id}</p></a>
          `
        divSelect.appendChild(li)

    })
}

displayApiForNav()



function addToPlayer(element) {

    const newsId = element.parentNode.children[0].children[0].innerText;


    loadData(newsId)

}

const loadData = async (id) => {
    //console.log(id)
    id.textContent=""
    fetch(`https://openapi.programming-hero.com/api/news/category/${id} `)
        .then(response => response.json())
        .then(data => displayLoadData(data.data))
    console.log(data.data)
}
loadData()


const displayLoadData = async (data) => {


    const cardContainer = document.getElementById("card-items");
    cardContainer.textContent =""

for(const infor of data){
        console.log(infor)
        //console.log(data)
     

        const { details, image_url, title } = infor;

        const containerDiv = document.createElement('div')
        containerDiv.innerHTML = `
                <div class="card card-side bg-base-100 shadow-xl">
                <figure><img class="h-64 w-64 p-4" src="${image_url}" alt="Shoes" /></figure>
                <div class="card-body">
                    <h2 class="card-title">"${title ? title : title}"</h2>
                    <p>${details.length > 20 ? details.slice(0, 70) + ".." : details}</p>
                    <p>price: </p>
                    <div class="card-actions justify-end">
                    <label for="my-modal-3" 
                    onclick="showModal('')"  class="btn btn-primary modal-button">Show Detail</label>
                    </div>
                </div>
            </div> 
                 `
        cardContainer.appendChild(containerDiv)

    }

}




