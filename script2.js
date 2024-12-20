document.getElementById('cekResiForm').addEventListener('submit', async function(e) {
    e.preventDefault();

    const resi = document.getElementById('resi').value;
    const courier = document.getElementById('courier').value;

    // Reset previous result
    document.getElementById('statusModal').classList.add('hidden');

    // API URL
    const apiUrl = `https://api.binderbyte.com/v1/track?api_key=3e7210df3408152da653b94accc6bff7775f6028b1bb9e513027eb27d08bfbb3&courier=${courier}&awb=${resi}`;

    try {
        // Fetch API response
        const response = await fetch(apiUrl);
        const data = await response.json();

        // Log the entire API response for debugging
        console.log('API Response:', data);

        if (data.status === 200) {
            // Periksa apakah ada data dalam `data.data.summary`
            if (data.data && data.data.summary) {
                const modal = document.getElementById('statusModal');
                const statusDiv = document.getElementById('resiStatus');
                const resiNumber = document.getElementById('resiNumber');
                const resiStatusText = document.getElementById('resiStatusText');
                const resiDate = document.getElementById('resiDate');
                const resiLocation = document.getElementById('resiLocation');

                modal.classList.remove('hidden');

                // Ambil informasi dari data.data.summary
                resiNumber.textContent = resi;
                resiStatusText.textContent = data.data.summary.status || 'Status tidak ditemukan';
                resiDate.textContent = data.data.summary.date || 'Tanggal tidak tersedia';
                resiLocation.textContent = data.data.detail.origin || 'Lokasi tidak tersedia';
            } else {
                console.log('Data summary tidak ditemukan:', data);
                alert('Nomor resi tidak ditemukan atau ada kesalahan.');
            }
        } else {
            console.log('API Error:', data.message);
            alert('Terjadi kesalahan dengan API: ' + data.message);
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Terjadi kesalahan, coba lagi nanti.');
    }
});

// Close the modal
document.getElementById('closeModal').addEventListener('click', function() {
    document.getElementById('statusModal').classList.add('hidden');
});

