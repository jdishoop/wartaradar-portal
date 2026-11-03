<?php
/**
 * WartaRadar REST API Endpoint Bridge
 * Mengizinkan sinkronisasi berita, gambar, dan kategori secara langsung
 * dengan dukungan Cross-Origin Resource Sharing (CORS).
 */
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
header("Content-Type: application/json; charset=UTF-8");

// Tangani preflight request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

$jsonFile = __DIR__ . '/posts.json';

if (file_exists($jsonFile)) {
    echo file_get_contents($jsonFile);
    exit();
}

// Fallback jika posts.json belum tersedia
echo json_encode([
    [
        "id" => 101,
        "title" => "WartaRadar Indonesia Berhasil Terhubung ke Server Hostinger",
        "slug" => "wartaradar-terhubung-ke-hostinger",
        "category" => "Nasional",
        "excerpt" => "Portal berita resmi WartaRadar siap menyinkronkan data kategori dan berita secara real-time.",
        "content" => "<p>Sistem integrasi REST API WartaRadar telah aktif di server Hostinger wartaradar.com.</p>",
        "thumbnail" => "https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&q=80&w=1200",
        "author" => [
            "name" => "Redaksi WartaRadar",
            "role" => "Admin Sistem"
        ],
        "date" => date("Y-m-d"),
        "views" => 500
    ]
], JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
