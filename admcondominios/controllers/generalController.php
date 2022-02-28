<?php
    include_once("../database/connection.php");
    

    class GeneralController{
        private function connect(){
            $conexao = new Connection();
            return $conexao->connect();
        }

        private function disconnect($conn){
            mysqli_close($conn);
        }

        public function getAllRecords($table){
            $data =[];

            $sql = "select * from " . $table . " order by id";

            $conn = $this->connect();

            $query = mysqli_query($conn, $sql);

            while($rs=mysqli_fetch_assoc($query)){
                array_push($data, $rs);
            }

            $this->disconnect($conn);
            return $data;
        }

        public function resetPasswordInsertToken($data){
            $conn = $this->connect();

            $sql = "INSERT INTO tbl_resetpassword_tokens(token, userId, userName, firstAccess) VALUES (" .
            "'" . $data['token'] . "'," .
            $data['userId'] . ",'" .
            $data['userName']. "','" .
            $data['firstAccess']. "'" .
            ")";


            $resolve = mysqli_query($conn, $sql);

            $this->disconnect($conn);
            return $resolve;
        }

        public function sanatizeTokenTable(){
            $conn = $this->connect();
            $sql = "delete from tbl_resetpassword_tokens where token=''";

            $query = mysqli_query($conn, $sql);

            $this->disconnect($conn);

            return $query;
        }
    }
?>