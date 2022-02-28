<?php

    class Connection{
        public function connect(){
            $Server = "localhost";
            $User = "root";
            $Senha = "";
            $DB = "proespeciais";
            return mysqli_connect($Server, $User, $Senha, $DB);
        }

        // public function getFullRecords($table){
        //     $data =[];

        //     $sql = "select * from " . $table . " order by id";

        //     $conn = $this->connect();

        //     $query = mysqli_query($conn, $sql);

        //     while($rs=mysqli_fetch_assoc($query)){
        //         array_push($data, $rs);
        //     }

        //     $this->disconnect($conn);
        //     return $data;
        // }

        public function disconnect($conn){
            mysqli_close($conn);
        }
    }
    // $Server = "localhost";
    // $User = "root";
    // $Senha = "";
    // $DB = "proespeciais";

    // $conn =  mysqli_connect($Server, $User, $Senha, $DB);


    // if (!$conn) {
    //     die("Falha na conexão." . mysqli_connect_error());
    // }
?>