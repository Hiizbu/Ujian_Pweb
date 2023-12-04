<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "mydatabase";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $id = $_GET['id'] ?? null;
    if ($id) {
        $result = $conn->query("SELECT * FROM mahasiswa WHERE id = $id");
        $data = $result->fetch_assoc();
        echo json_encode($data);
    } else {
        $result = $conn->query("SELECT * FROM mahasiswa");
        $data = $result->fetch_all(MYSQLI_ASSOC);
        echo json_encode($data);
    }
} elseif ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $nama = $_POST['nama'];
    $jurusan = $_POST['jurusan'];
    $conn->query("INSERT INTO mahasiswa (nama, jurusan) VALUES ('$nama', '$jurusan')");
    echo json_encode(['status' => 'success']);
} elseif ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    $id = $_GET['id'];
    $conn->query("DELETE FROM mahasiswa WHERE id = $id");
    echo json_encode(['status' => 'success']);
}

$conn->close();
?>
