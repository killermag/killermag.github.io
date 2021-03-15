const Module = (() => {
    let smallItems = document.querySelectorAll('.sm-item');

    let closed = (first, second) => {
        if (first.style.display === "" && second.style.display === "") {
            return true;
        } else {
            return false;
        }
    }

    let close = () => {
        smallItems.forEach(element => {
            let premierFrère = element.nextElementSibling;
            let deuxiemeFrère = premierFrère.nextElementSibling;
            premierFrère.style.display = '';
            deuxiemeFrère.style.display = '';
        })
    }

    smallItems.forEach(element => {
        element.addEventListener('click', () => {
            console.log('clicked');
            console.log('getting siblings'); 
            let firstSibling = element.nextElementSibling;
            let secondSibling = firstSibling.nextElementSibling;
            console.log('siblings before closing all are:', firstSibling, secondSibling)
            let isClosed = closed(firstSibling, secondSibling); 
            console.log('status:', isClosed);
            close();

            if (isClosed == true) {
                console.log('status was', isClosed, ', so closing element');
                firstSibling.style.display = 'flex';
                secondSibling.style.display = 'flex';
            } else {
                console.log('status was', isClosed, ', so opening element');
                console.log('Parent was', element); 
                console.log('siblings after closing all are:', firstSibling, secondSibling)
                firstSibling.style.display = '';
                secondSibling.style.display = '';
            }
        })
    })

})()