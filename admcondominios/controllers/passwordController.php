<?php
    include_once("../database/connection.php");
    

    class PasswordController{
        private function connect(){
            $conexao = new Connection();
            return $conexao->connect();
        }

        private function disconnect($conn){
            mysqli_close($conn);
        }

        public function resetPasswordInsertToken($data){
            $conn = $this->connect();

            $sql = "INSERT INTO tbl_resetpassword_tokens(token, validation, userIndex, userName, firstAccess) VALUES (" .
            "'" . $data['token'] . "'," .
            $data['validation'] . "," .
            $data['userIndex'] . ",'" .
            $data['userName']. "','" .
            $data['firstAccess']. "'" .
            ")";


            $resolve = mysqli_query($conn, $sql);

            $this->disconnect($conn);
            return $resolve;
        }

        public function seekPasswordToken($token){
            $conn = $this->connect();
            $sql =  "select * from tbl_resetpassword_tokens where token='" . $token . "'";
            $query = mysqli_query($conn, $sql);

            $resolve =[];
            while ($rs = mysqli_fetch_assoc($query)){
                array_push($resolve, $rs);
            }

            $this->disconnect($conn);

            return $resolve;
        }

        public function proceedChangePassoword($data){
            //Altera na tabela tbl_users os campos hash, salt e inicialPassword
            //Apaga o token da tabela tbl_resetpassword_tokens

            $conn = $this->connect();

            $sql = "UPDATE tbl_users SET hash='" . $data['newHash'] . "', salt='" . $data['newSalt'] . "', inicialPassword=0 WHERE tbl_users.index=" . $data['userIndex'];
            $query = mysqli_query($conn, $sql);

            $sql = "DELETE FROM tbl_resetpassword_tokens where token='" . $data['token'] . "'";
            $query = mysqli_query($conn, $sql);

            $this->disconnect($conn);

            return $query;
        }

        public function sanatizeTokenTable($userIndex){
            $conn = $this->connect();

            if ($userIndex==""){
                $sql = "delete from tbl_resetpassword_tokens where token=''";
            }else{
                $sql = "delete from tbl_resetpassword_tokens where token='' OR userIndex=" . $userIndex;
            }

            $query = mysqli_query($conn, $sql);

            $this->disconnect($conn);

            return $query;
        }
    }
?>