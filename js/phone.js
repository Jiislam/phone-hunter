const loadPhone = async (searchText) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
    const data = await res.json();
    const phones = data.data
    console.log(phones)
    displayPhones(phones)
}

const displayPhones = phones => {
    console.log(phones)

    const phoneContainer = document.getElementById('phone-container')
    // clear phone container before adding new cards
    phoneContainer.textContent = '';

    // display show all button if there are more than 12 phones 
/* 
    const showAllContainer = document.getElementById('show-all-container');

    if (phones.length > 12) {
        showAllContainer.classList.remove('hidden')
    }
    else {
        showAllContainer.classList.add('hidden')
    }

    // display first 12 items
    phones = phones.slice(0, 12) */
// display show all buttons if there are more than 12 phones
const showAllContainer = document.getElementById('show-all-container')
if(phones.length > 12){
    showAllContainer.classList.remove('hidden')
}
else{
    showAllContainer.classList.add('hidden')
}

phones = phones.slice(0,12);


    phones.forEach(phone => {
        console.log(phone)

        // 2. create a div 
        const phoneCard = document.createElement('div');
        phoneCard.classList = `card bg-gray-100 p-4 shadow-xl`
        // 3. inner html 
        phoneCard.innerHTML = `<figure><img src="${phone.image}" alt="Shoes" /></figure>
    <div class="card-body">
      <h2 class="card-title"> ${phone.phone_name} </h2>
      <p>If a dog chews shoes whose shoes does he choose?</p>
      <div class="card-actions justify-end">
        <button class="btn btn-primary">Buy Now</button>
      </div>
    </div>`
        // 4. appendchild
        phoneContainer.appendChild(phoneCard)
    })
    // hide loading spinner 
    toggleLoadingSpinner(false);
}


// handle search button 
const handleSearch = () => {
    toggleLoadingSpinner(true)
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    
    loadPhone(searchText)

}
//  handle search recap
const handleSearch2= () =>{
    toggleLoadingSpinner(true)
    const searchField = document.getElementById('search-field2');
    const searchText = searchField.value;
    loadPhone (searchText)
}

const toggleLoadingSpinner = (isLoading)=>{
   const LoadingSpinner= document.getElementById('loading-spinner');
    if (isLoading){
        LoadingSpinner.classList.remove('hidden')
    }
    else{
        LoadingSpinner.classList.add('hidden')
    }
}
// loadPhone()
