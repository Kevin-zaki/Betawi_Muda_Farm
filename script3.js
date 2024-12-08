let openShopping = document.querySelector('.shopping');
let closeShopping = document.querySelector('.closeShopping');
let list = document.querySelector('.list');
let listCard = document.querySelector('.listCard');
let body = document.querySelector('body');
let total = document.querySelector('.total');
let quantity = document.querySelector('.quantity');
// YANG DIBAWAH VARIABEL POPUP KETIKA KLIK RESI PADA PRODUCT
let popupBilling = document.getElementById('popup-billing');
let closePopupButton = document.getElementById('close-popup');
let billingButton = document.querySelector('.billing');
let productList = document.getElementById('product-list');
let totalPriceElement = document.getElementById('total-price');

openShopping.addEventListener('click', ()=>{
    body.classList.add('active');
})
closeShopping.addEventListener('click', ()=>{
    body.classList.remove('active');
})

// Product data
let products = [
    {
        id: 1,
        name: 'Drone Pertanian',
        image: 'DRONE.jpg',
        price: 100000000
    },
    {
        id: 2,
        name: 'Green House',
        image: 'GREEN_HOUSE.jpg',
        price: 200000000
    },
    {
        id: 3,
        name: 'Traktor',
        image: 'tractor.webp',
        price: 55000000
    },
    {
        id: 4,
        name: 'Transplanter',
        image: 'Transplanter.JPG',
        price: 45000000
    },
    {
        id: 5,
        name: 'Smart Agricultur',
        image: 'smartAgricultur.jpg',
        price: 75000000
    },
    {
        id: 6,
        name: 'Hidroponik',
        image: 'hydroponics.jpg',
        price: 10000000
    }
];

let listCards  = [];
function initApp(){
    products.forEach((value, key) =>{
        let newDiv = document.createElement('div');
        newDiv.classList.add('item');
        newDiv.innerHTML = `
            <img src="asset/${value.image}">
            <div class="title">${value.name}</div>
            <div class="price">${value.price.toLocaleString()}</div>
            <button onclick="addToCard(${key})">Tambah Keranjang</button>`;
        list.appendChild(newDiv);
    })
}
initApp();
function addToCard(key){
    if(listCards[key] == null){
        // copy product form list to list card
        listCards[key] = JSON.parse(JSON.stringify(products[key]));
        listCards[key].quantity = 1;
    }
    reloadCard();
}
function reloadCard(){
    listCard.innerHTML = '';
    let count = 0;
    let totalPrice = 0;
    listCards.forEach((value, key)=>{
        totalPrice = totalPrice + value.price;
        count = count + value.quantity;
        if(value != null){
            let newDiv = document.createElement('li');
            newDiv.innerHTML = `
                <div><img src="asset/${value.image}"/></div>
                <div>${value.name}</div>
                <div>${value.price.toLocaleString()}</div>
                <div>
                    <button onclick="changeQuantity(${key}, ${value.quantity - 1})">-</button>
                    <div class="count">${value.quantity}</div>
                    <button onclick="changeQuantity(${key}, ${value.quantity + 1})">+</button>
                </div>`;
                listCard.appendChild(newDiv);
        }
    })
    total.innerText = totalPrice.toLocaleString();
    quantity.innerText = count;
}
function changeQuantity(key, quantity){
    if(quantity == 0){
        delete listCards[key];
    }else{
        listCards[key].quantity = quantity;
        listCards[key].price = quantity * products[key].price;
    }
    reloadCard();
}


billingButton.addEventListener('click', () => {
    // Kosongkan sebelumnya
    productList.innerHTML = '';
    let totalPrice = 0;

    // Cek udah ada produk di keranjang nya belum
    if (listCards.every(product => product === null)) {
        // kalau kagak ada produk
        let noProductMessage = document.createElement('li');
        noProductMessage.innerText = 'Tidak ada produk';
        noProductMessage.style.color = 'white'; 
        noProductMessage.style.backgroundColor = 'red'; 
        noProductMessage.style.padding = '5px';
        noProductMessage.style.borderRadius = '5px';
        productList.appendChild(noProductMessage);

        // Bagian ini unuk status pembayaran dan no resi
        document.getElementById('payment-status').innerText = '-';
        document.getElementById('courier-status').innerText = '-';
        document.getElementById('resi-number').innerText = '';
    } else {
        // Menampilkan produk yang dibeli dalam popup
        listCards.forEach((product) => {
            if (product != null) {
                let newItem = document.createElement('li');
                newItem.innerHTML = `${product.name} - ${product.quantity} x Rp ${product.price.toLocaleString()}`;
                productList.appendChild(newItem);
                totalPrice += product.price;
            }
        });

        // Set status pembayaran dan no resi
        document.getElementById('payment-status').innerText = 'Lunas';
        document.getElementById('courier-status').innerText = 'JNT CARGO';
        document.getElementById('resi-number').innerText = 'JP2255749628';
    }
    totalPriceElement.innerText = `Rp ${totalPrice.toLocaleString()}`;

    // Tampilkan popup
    popupBilling.style.display = 'flex';

    // Fungsi untuk tombl tutup popup
    closePopupButton.addEventListener('click', () => {
    popupBilling.style.display = 'none';
});
    
    // Fungsi buat cetak popup (tanpa tombol)
    document.getElementById('print-popup').addEventListener('click', () => {
        // Ambil konten popup tanpa tombol
        let content = document.querySelector('.popup-content').innerHTML;
        let printContent = content.replace(/<button[^>]*>/g, '').replace(/<\/button>/g, '');  

        // Membuka jendela baru untuk pencetakan
        let printWindow = window.open('', '', 'width=600,height=400');
        printWindow.document.write('<html><head><title>Cetak Detail Pembelian</title></head><body>');
        printWindow.document.write(printContent);  
        printWindow.document.write('</body></html>');
        printWindow.document.close(); 
        printWindow.print();  
    });
});

// Menyimpan riwayat pembelian ke localStorage
function savePurchase() {
    const purchaseHistory = JSON.parse(localStorage.getItem('purchaseHistory')) || [];
    const newPurchase = {
        items: listCards.filter(product => product !== null),  // bagian ini untuk menyimpan produk yang ada
        totalPrice: totalPriceElement.textContent,
        date: new Date().toISOString()
    };
    purchaseHistory.push(newPurchase);
    localStorage.setItem('purchaseHistory', JSON.stringify(purchaseHistory));
    alert('Pembelian telah disimpan di Riwayat');
}

// ini untuk Menampilkan riwayat pembelian dari localStorage
function showPurchaseHistory() {
    const purchaseHistory = JSON.parse(localStorage.getItem('purchaseHistory')) || [];
    if (purchaseHistory.length === 0) {
        alert('Tidak ada riwayat pembelian.');
        return;
    }

    let historyText = 'Riwayat Pembelian:\n';
    purchaseHistory.forEach((purchase, index) => {
        historyText += `Pembelian #${index + 1}:\nTanggal: ${new Date(purchase.date).toLocaleString()}\nTotal Harga: ${purchase.totalPrice}\nItems:\n`;
        purchase.items.forEach(item => {
            historyText += `  - ${item.name} x${item.quantity}\n`;
        });
        historyText += '\n';
    });

    alert(historyText); 
}

// untuk bagiann tombol "Simpan" dan "Riwayat"
document.getElementById('save-button').addEventListener('click', savePurchase);
document.getElementById('history-button').addEventListener('click', showPurchaseHistory);




