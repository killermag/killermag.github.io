const Search = (() => {
    let searchInput = document.querySelector('.last div input'); 
    let lastItem = document.querySelector('.last');
    let searchLogo = document.querySelector('.last div i');
    let searchBar = document.querySelector('.last div'); 

    let styleSearch = () => {
        lastItem.style.flexBasis = '14%';
        searchLogo.style.color = 'gray';
        searchBar.style.background = 'white'; 
        searchInput.style.color = 'black';
    }
    let resetSearchStyle = () => {
        console.log(lastItem.style.flexBasis);
        lastItem.style.flex = '1';
        searchLogo.style.color = 'white';
        searchBar.style.background = 'none'; 
        searchInput.style.color = 'white';

    }

   
    searchInput.addEventListener('click', () => {
        styleSearch();
    })

    searchInput.addEventListener('focusout', () => {
        resetSearchStyle();
    })

})()

