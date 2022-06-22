<?php
    require "connect.php";

    $query = "SELECT quangcao.Id, quangcao.HinhAnh, quangcao.NoiDung, quangcao.IdBaiHat, baihat.TenBaiHat, baihat.HinhBaiHat 
    FROM `baihat` INNER JOIN quangcao ON quangcao.IdBaiHat = baihat.IdBaiHat 
    WHERE quangcao.IdBaiHat = baihat.IdBaiHat";
    $data = mysqli_query($con, $query);

    class Quangcao{
        function Quangcao($idquangcao, $hinhanh, $noidung, $idbaihat, $tenbaihat, $hinhbaihat){
            $this->IdQuangCao = $idquangcao;
            $this->HinhAnh = $hinhanh;
            $this->NoiDung = $noidung;
            $this->TenBaiHat = $tenbaihat;
            $this->HinhBaiHat = $hinhbaihat;
        }
    }

    $mangQuangCao = array();
    while($row = mysqli_fecht_assoc($data)){
        array_push($mangQuangCao, new Quangcao($row['Id'],
                                                $row['HinhAnh'],
                                                $row['NoiDung'],
                                                $row['IdBaiHat'],
                                                $row['TenBaiHat'],
                                                $row['HinhBaiHat']));
    }

    echo json_encode($mangQuangCao);
?>