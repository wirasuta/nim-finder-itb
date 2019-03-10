<?php
    require('db.php');

    if (isset($_GET['r'])){
        $r = str_replace(["%","_"], "", $_GET['r']);
        if (strlen($r) > 0){
            $query = "
            SELECT nim.name, nim.nim_tpb, nim.nim_jurusan, COALESCE(a.jurusan, b.jurusan) AS jurusan
            FROM nim 
            LEFT JOIN kode_jurusan AS a ON nim.nim_jurusan LIKE CONCAT(a.kode,'%') AND nim.nim_jurusan IS NOT NULL 
            LEFT JOIN kode_jurusan AS b ON nim.nim_tpb LIKE CONCAT(b.kode,'%') AND nim.nim_jurusan IS NULL
            HAVING name LIKE ? OR nim_tpb LIKE ? OR nim_jurusan LIKE ? OR jurusan LIKE ?
            ORDER BY nim_jurusan ASC,nim_tpb ASC, name ASC
            LIMIT 100";
            $stmt = $conn->prepare($query);
            $srch = '%'.$r.'%';
            $stmt->execute([$srch,$srch,$srch,$srch]);
            $arr = $stmt->fetchAll(PDO::FETCH_ASSOC);
            echo json_encode($arr);
        }else{
            echo json_encode([]);
        }
    }
?>