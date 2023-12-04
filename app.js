document.addEventListener('DOMContentLoaded', function () {
    fetchData();

    document.getElementById('mahasiswaForm').addEventListener('submit', function (e) {
        e.preventDefault();
        submitForm();
    });
});

function fetchData() {
    fetch('api.php')
        .then(response => response.json())
        .then(data => {
            const tableBody = document.querySelector('#mahasiswaTable tbody');
            tableBody.innerHTML = '';

            data.forEach(mahasiswa => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${mahasiswa.id}</td>
                    <td>${mahasiswa.nama}</td>
                    <td>${mahasiswa.jurusan}</td>
                    <td>
                        <button onclick="editData(${mahasiswa.id})">Edit</button>
                        <button onclick="deleteData(${mahasiswa.id})">Hapus</button>
                    </td>
                `;
                tableBody.appendChild(row);
            });
        });
}

function submitForm() {
    const formData = new FormData(document.getElementById('mahasiswaForm'));

    fetch('api.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(() => {
        fetchData();
        document.getElementById('mahasiswaForm').reset();
    });
}

function editData(id) {
    fetch(`api.php?id=${id}`)
        .then(response => response.json())
        .then(data => {
            document.getElementById('nama').value = data.nama;
            document.getElementById('jurusan').value = data.jurusan;
        });
}

function deleteData(id) {
    fetch(`api.php?id=${id}`, {
        method: 'DELETE'
    })
    .then(() => {
        fetchData();
    });
}
