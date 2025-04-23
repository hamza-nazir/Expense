const selectElement = document.getElementById('product');
const trs = document.querySelectorAll('tr');
const head = document.getElementById('head');
const parentt = document.getElementById('opt');

selectElement.addEventListener('change', function () {
    const selectedValue = selectElement.value;

 
for(let i=1; i<trs.length;i++){

        if (trs[i].children[1].innerText === selectedValue) {
            trs[i].style.display = '';
        } else {
            trs[i].style.display = 'none';
        }
    }
});
