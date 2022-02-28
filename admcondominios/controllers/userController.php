<?php
    include_once("../database/connection.php");

    class UserController{
        private function connect(){
            $conexao = new Connection();
            return $conexao->connect();
        }

        private function disconnect($conn){
            mysqli_close($conn);
        }

        public function insertUser($data){
            $conn = $this->connect();

            $sql = "INSERT INTO tbl_users(profile, role, id, ismaster, apartamento, apartamentoComp, hash, salt, inicialPassword, avatarUrl, nomecompleto, foneddi, foneddd, fonenumero, whatsddi, whatsddd, whatsnumero, email, pets, veiculo) VALUES (" .
            $data['profile'] . "," .
            $data['role'] . ",'" .
            $data['id'] . "'," .
            $data['ismaster']. "," .
            $data['apartamento']. "," .
            $data['apartamentoComp']. ",'" .
            $data['hash']. "','" .
            $data['salt']. "'," .
            $data['inicialPassword']. ",'" .
            $data['avatarUrl'] . "','" .
            $data['nomecompleto']. "'," .
            $data['foneddi']. "," .
            $data['foneddd']. "," .
            $data['fonenumero']. "," .
            $data['whatsddi']. "," .
            $data['whatsddd']. "," .
            $data['whatsnumero']. ",'" .
            $data['email']. "'," .
            $data['pets']. "," .
            $data['veiculo'] .
            ")";

            $resolve = mysqli_query($conn, $sql);

            $this->disconnect($conn);
            return $resolve;
        }

        public function editUser($data){
            $conn = $this->connect();

            $sql = "UPDATE tbl_users SET " .
                "profile=" . $data['profile'] . ", " .
                "apartamento=" . $data['apartamento'] . ", " .
                "apartamentoComp=" . $data['apartamentoComp'] . ", " .
                "avatarUrl='" . $data['avatarUrl'] . "', " .
                "nomecompleto='" . $data['nomecompleto'] . "', " .
                "foneddi=" . $data['foneddi'] . ", " .
                "foneddd=" . $data['foneddd'] . ", " .
                "fonenumero='" . $data['fonenumero'] . "', " .
                "whatsddi=" . $data['whatsddi'] . ", " .
                "whatsddd="  . $data['whatsddd'] . ", " .
                "whatsnumero='" . $data['whatsnumero'] . "', " .
                "email='" . $data['email'] . "', " .
                "pets=" . $data['pets'] . ", " .
                "veiculo=" . $data['veiculo'];

            if ($data['inicialPassword'] == 1){
                $sql = $sql .  ", " .
                "hash='" . $data['hash'] . "', " .
                "salt='" . $data['salt'] . "', " .
                "inicialPassword=" . $data['inicialPassword'];
            }

            $sql = $sql . " WHERE tbl_users.index=" . $data['index'];

            // $sql="teste";

            $resolve = mysqli_query($conn, $sql);

            $this->disconnect($conn);
            return $resolve;
            // return $sql;
        }

        public function seekUser($email){
            $conn = $this->connect();

            // $sql = "select * from tbl_users where email='" . $email . "';";
            $sql = "SELECT tbl_users.*, config_apartamentos.aptoDesc as aptoDesc, config_apartamentos_comp.aptocompdesc as aptoCompDesc, config_usersprofiles.descProfile as descProfile, config_usersroles.rolesDesc as roleDesc, config_usersroles.isManager as isManager FROM `tbl_users` INNER JOIN config_apartamentos INNER JOIN config_apartamentos_comp INNER JOIN config_usersprofiles INNER JOIN config_usersroles ON tbl_users.apartamento = config_apartamentos.id AND tbl_users.apartamentoComp = config_apartamentos_comp.id AND tbl_users.profile = config_usersprofiles.id AND tbl_users.role = config_usersroles.id where email='" . $email . "';";

            $query = mysqli_query($conn, $sql);

            $resolve = [];
            while ($rs = mysqli_fetch_assoc($query)){
                array_push($resolve, $rs);
            }

            $this->disconnect($conn);

            return $resolve;
        }

        public function listUsers($params){
            $conn = $this->connect();

            if ($params['isManager'] == 1){
                $managerFilter = " apartamento >= 0";
            }else{
                $managerFilter = " apartamento = '" . $params['apartamento'] . "'";
            }

            if ($params['currentUser'] != "" && $params['currentUser'] != 0){
                $managerFilter = $managerFilter . " AND tbl_users.index<>" . $params['currentUser'];
            }

            // $sql = "select * from tbl_users where " . $managerFilter . " ORDER BY apartamento, apartamentoComp ASC";
            $sql = "SELECT tbl_users.*, config_apartamentos.aptoDesc as aptoDesc, config_apartamentos_comp.aptocompdesc as aptoCompDesc, config_usersprofiles.descProfile as descProfile, config_usersroles.rolesDesc as roleDesc, config_usersroles.isManager as isManager FROM `tbl_users` INNER JOIN config_apartamentos INNER JOIN config_apartamentos_comp INNER JOIN config_usersprofiles INNER JOIN config_usersroles ON tbl_users.apartamento = config_apartamentos.id AND tbl_users.apartamentoComp = config_apartamentos_comp.id AND tbl_users.profile = config_usersprofiles.id AND tbl_users.role = config_usersroles.id where" . $managerFilter . " ORDER BY apartamentoComp, apartamento ASC";

            $query = mysqli_query($conn, $sql);

            $resolve = [];
            while ($rs = mysqli_fetch_assoc($query)){
                array_push($resolve, $rs);
            }

            $this->disconnect($conn);

            // return $sql;
            return $resolve;
        }

        public function deleteUser($userindex){
            $conn = $this->connect();

            $sql = "delete from tbl_users where tbl_users.index=" . $userindex;

            $query = mysqli_query($conn, $sql);

            $this->disconnect($conn);

            return $query;
            // return $sql;
        }

        public function insertLoginToken($dataAuth){
            $conn = $this->connect();

            $sql = "INSERT INTO tbl_authorizations (token, userIndex, expires) VALUES ('" . $dataAuth['token'] . "'," . $dataAuth['index'] . ",'" . $dataAuth['expires'] . "')";

            $query = mysqli_query($conn, $sql);

            $this->disconnect($conn);

            // return $sql;
            return $query;
        }

        public function getLoginToken($dataAuth){
            $conn = $this->connect();

            $sql = "SELECT * FROM tbl_authorizations WHERE token='" . $dataAuth['token'] . "' AND userIndex=" . $dataAuth['index'];

            $query = mysqli_query($conn, $sql);

            $resolve = [];
            while ($rs = mysqli_fetch_assoc($query)){
                array_push($resolve, $rs);
            }

            $this->disconnect($conn);

            return $resolve;
            // return $sql;
        }

        public function resetAuthToken($tokenData){
            $conn = $this->connect();

            $sql = "delete from tbl_authorizations where token='" . $tokenData['token'] . "' OR userIndex=" . $tokenData['index'];

            $query = mysqli_query($conn, $sql);

            $this->disconnect($conn);

            return $query;
        }
    }
?>