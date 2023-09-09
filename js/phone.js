const loadPhone = async (searchText = '13', isShowAll) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
    const data = await res.json();
    const phones = data.data
    // console.log(phones)
    displayPhones(phones, isShowAll)
}

const displayPhones = (phones, isShowAll) => {
    // console.log(phones)

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
    if (phones.length > 12 && !isShowAll) {
        showAllContainer.classList.remove('hidden')
    }
    else {
        showAllContainer.classList.add('hidden')
    }
    if (!isShowAll) {
        phones = phones.slice(0, 12);
    }


    phones.forEach(phone => {
        // console.log(phone)

        // 2. create a div 
        const phoneCard = document.createElement('div');
        phoneCard.classList = `card bg-gray-100 p-4 shadow-xl`
        // 3. inner html 
        phoneCard.innerHTML = `<figure><img src="${phone.image}" alt="Shoes" /></figure>
    <div class="card-body">
      <h2 class="card-title"> ${phone.phone_name} </h2>
      <p>If a dog chews shoes whose shoes does he choose?</p>
      <div class="card-actions justify-center">
        <button onclick="handleShowDetail('${phone.slug}')" class="btn btn-primary">Show Details</button>
      </div>
    </div>`
        // 4. appendchild
        phoneContainer.appendChild(phoneCard)
    })
    // hide loading spinner 
    toggleLoadingSpinner(false);
}

handleShowDetail = async (id) => {
    // load single data
    const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
    const data = await res.json()
    const phone = data.data
    showPhoneDetails(phone)
}

// display

const showPhoneDetails = (phone) => {
    console.log(phone)
    const phoneName = document.getElementById('show-detail-phone-name');
    phoneName.innerText = phone.name

    const showDetailContainer = document.getElementById('show-detail-container')
    showDetailContainer.innerHTML = `
    <img src ="${phone.image}" class="mx-auto" /> 
    <p> <span> Storage: ${phone?.mainFeatures?.storage} </span> </p>
    <p> <span> Display: ${phone?.mainFeatures?.displaySize} </span> </p>
    <p> <span> Memory : ${phone?.mainFeatures?.memory} </span> </p>    
    <p> <span> GPS : ${phone?.others?.GPS || 'NO GPS'} </span> </p>    
    ` 
    // show the modal
    show_details_modal.showModal();
}

// handle search button 
const handleSearch = (isShowAll) => {
    toggleLoadingSpinner(true)
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;

    loadPhone(searchText, isShowAll)

}
//  handle search recap
const handleSearch2 = () => {
    toggleLoadingSpinner(true)
    const searchField = document.getElementById('search-field2');
    const searchText = searchField.value;
    loadPhone(searchText)
}

const toggleLoadingSpinner = (isLoading) => {
    const LoadingSpinner = document.getElementById('loading-spinner');
    if (isLoading) {
        LoadingSpinner.classList.remove('hidden')
    }
    else {
        LoadingSpinner.classList.add('hidden')
    }
}

// showall functionality
const handleShowAll = () => {
    handleSearch(true);
}
loadPhone()
