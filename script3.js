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
    popupBilling.style.display = 'flex';

    // Fungsi untuk tombol tutup popup
    closePopupButton.addEventListener('click', () => {
    popupBilling.style.display = 'none';
});

billingButton.addEventListener('click', () => {
    console.log('Tombol Pembayaran diklik!');  // Debugging
    productList.innerHTML = '';
    let totalPrice = 0;

    // Cek produk di keranjang
    if (listCards.every(product => product === null)) {
        let noProductMessage = document.createElement('li');
        noProductMessage.innerText = 'Tidak ada produk';
        noProductMessage.style.color = 'white';
        noProductMessage.style.backgroundColor = 'red';
        noProductMessage.style.padding = '5px';
        noProductMessage.style.borderRadius = '5px';
        productList.appendChild(noProductMessage);

        // Bagian untuk status pembayaran dan no resi
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

    
    popupBilling.style.display = 'flex';
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
const saveButton = document.getElementById("save-button");
const alamatPenerimaElem = document.getElementById("alamat-penerima");

// Fungsi untuk menyimpan pembelian
function savePurchase() {
    // Cek user sudah atau belom melakukan pilih alamat
    if (!alamatPenerimaElem.textContent.trim()) {
        alert("Silahkan Pilih alamat, agar bisa disimpan.");
        return; 
    }
    // Menyimpan data pembelian jika alamat telah dipilih
    const purchaseHistory = JSON.parse(localStorage.getItem('purchaseHistory')) || [];
    const newPurchase = {
        items: listCards.filter(product => product !== null),  
        totalPrice: totalPriceElement.textContent,
        date: new Date().toISOString(),
        alamatPenerima: alamatPenerimaElem.textContent.trim()
    };
    purchaseHistory.push(newPurchase);
    localStorage.setItem('purchaseHistory', JSON.stringify(purchaseHistory));

    alert('Pembelian telah disimpan di Riwayat');
}

// Event listener untuk tombol simpan
saveButton.addEventListener("click", savePurchase);


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



// Bagian Tambah Alamat

document.addEventListener("DOMContentLoaded", function () {
    const tambahAlamatBtn = document.querySelector(".alamat");
    const popupAlamat = document.getElementById("popup-alamat");
    const closePopupBtn = document.getElementById("close-popup-alamat");
    const alamatForm = document.getElementById("alamat-form");

    let alamatData = JSON.parse(localStorage.getItem("alamatData")) || []; // Ambil data dari Local Storage

    // Menampilkan popup Tambah Alamat
    tambahAlamatBtn.addEventListener("click", () => {
        popupAlamat.classList.remove("hidden");
    });

    closePopupBtn.addEventListener("click", () => {
        popupAlamat.classList.add("hidden");
    });

    // Menyimpan data alamat
    alamatForm.addEventListener("submit", function (e) {
        e.preventDefault();

        // Ambil nilai input
        const nama = document.getElementById("input-nama").value;
        const alamat = document.getElementById("input-alamat").value;
        const telp = document.getElementById("input-telp").value;
        const provinsi = document.getElementById("input-provinsi").value;
        const kota = document.getElementById("input-kota").value;
        const kecamatan = document.getElementById("input-kecamatan").value;
        const kodepos = document.getElementById("input-kodepos").value;

        // Buat objek alamat
        const alamatBaru = {
            nama,
            alamat,
            telp,
            provinsi,
            kota,
            kecamatan,
            kodepos
        };

        // Simpan data ke array
        alamatData.push(alamatBaru);

        // Simpan ke Local Storage
        localStorage.setItem("alamatData", JSON.stringify(alamatData));

        // Tampilkan data di tab
        tampilkanDataAlamat();

        // Reset form dan tutup popup
        alamatForm.reset();
        popupAlamat.classList.add("hidden");

        alert("Alamat berhasil disimpan!");
    });

    // Fungsi menampilkan data alamat di tab
    function tampilkanDataAlamat() {
        for (let i = 0; i < 3; i++) { // Maksimal 3 alamat, Lebih dari 3 tidak bisa tidak di ikut sertakan
            const tabContent = document.getElementById(`almt${i + 1}`);
            const alamat = alamatData[i];

            if (alamat) {
                tabContent.innerHTML = `
                    <h1><strong>Alamat Kamu : ${i + 1}</strong></h1>
                    <br/>
                    <p><strong>Nama:</strong><span1>${alamat.nama}</span1></p>
                    <p><strong>Alamat:</strong><span2>${alamat.alamat}</span2> </p>
                    <p><strong>Telepon:</strong> ${alamat.telp}</p>
                    <p><strong>Provinsi:</strong> ${alamat.provinsi}</p>
                    <p><strong>Kota:</strong> ${alamat.kota}</p>
                    <p><strong>Kecamatan:</strong> ${alamat.kecamatan}</p>
                    <p><strong>Kode Pos:</strong> ${alamat.kodepos}</p>
                    <button class="hapus-alamat" onclick="hapusAlamat(${i})">Hapus Alamat</button> <!-- Tombol hapus alamat -->
                    <button class="pilih-alamat" onclick="pilihAlamat(${i})">pilih Alamat</button>
                `;
            } else {
                tabContent.innerHTML = "<p>Input Alamat</p>";
            }
        }
    }
     // Fungsi Code yang dibawah buat menghapus alamat berdasarkan index
     window.hapusAlamat = function (index) {
        if (confirm("Apakah Anda yakin ingin menghapus alamat ini?")) {
            alamatData.splice(index, 1); 
            localStorage.setItem("alamatData", JSON.stringify(alamatData)); 
            tampilkanDataAlamat(); 
            alert("Alamat telah dihapus!");
        }
    }
    
    // Load data alamat saat halaman mau muncul
    tampilkanDataAlamat();
});



// Fungsi untuk membuka tab
function openAlamat(evt, alamatID) {
    const tabcontent = document.querySelectorAll(".tabcontent");
    const tablinks = document.querySelectorAll(".tablinks");

    // Sembunyikan semua tab content
    tabcontent.forEach((content) => {
        content.style.display = "none";
    });

    // Hapus class active dari semua tablinks
    tablinks.forEach((link) => {
        link.className = link.className.replace(" active", "");
    });

    // Tampilkan tab yang diklik
    document.getElementById(alamatID).style.display = "block";
    evt.currentTarget.className += " active";
}

// Bagian TABS alamat
function openAlamat(evt, cityName) {
    var i, tabcontent, tablinks;

    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    document.getElementById(cityName).style.display = "block";
    evt.currentTarget.className += " active";
}

// Fungsi untuk membuka dan Tutup tab menggunakan toggle display
function openAlamat(evt, alamatID) {
    const tabcontent = document.querySelectorAll(".tabcontent");
    const tablinks = document.querySelectorAll(".tablinks");

    const selectedTabContent = document.getElementById(alamatID);

    if (selectedTabContent.style.display === "block") {
        // Jika sudah tampil, sembunyikan tab content
        selectedTabContent.style.display = "none";
        evt.currentTarget.classList.remove("active");
    } else {
        tabcontent.forEach((content) => {
            content.style.display = "none";
        });

        tablinks.forEach((link) => {
            link.classList.remove("active");
        });

        selectedTabContent.style.display = "block";
        evt.currentTarget.classList.add("active");
    }
}


// DIbawah ini untuk , ketika user mengeklik tombol PILIH ALAMAT
document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll(".pilih-alamat").forEach((button) => {
        button.addEventListener("click", function () {
            const tabContent = button.closest(".tabcontent");
            const span1Element = tabContent.querySelector("span1");
            const span2Element = tabContent.querySelector("span2");
            const span1Text = span1Element ? span1Element.textContent.trim() : "";
            const span2Text = span2Element ? span2Element.textContent.trim() : "";
            const alamat = span1Text + ", " + span2Text;
            const alamatPenerimaElem = document.querySelector("#alamat-penerima"); 

            if (alamatPenerimaElem) {
                alamatPenerimaElem.textContent = alamat || "Alamat tidak ditemukan"; 
                alert(`Alamat "${alamat}" telah dipilih.`);
            } else {
                console.error("Elemen 'Alamat Penerima' tidak ditemukan.");
            }
        });
    });
})


// untuk validasi ketika menyimpan jika user belom melakukan pilih alamat , saya gabungkan di baris kode 223

// tambahan fitur hapus riwayat
const hapusButton = document.getElementById("hapus-button");

hapusButton.addEventListener("click", function() {
    const isConfirmed = confirm("Apakah Anda yakin ingin menghapus riwayat?");
    if (isConfirmed) {
        localStorage.removeItem("purchaseHistory");

        alert("Riwayat pembelian telah dihapus.");
    } else {
        alert("Riwayat masa lalu AMAN, tidak jadi di hapus.");
    }
});
