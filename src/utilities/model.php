<?php 

class Model
{
    public $name;
    public $data;
    private $db;
    private $sql;
    private $stmt;
    private $bindings;

    function __construct($name, $data) {
        $this->name = $name;
        $this->data = $data;
        $this->sql  = $data['sql'];
        $this->bindings = $data['bindings'];
    }

    function execute($itemData) {
        $this->db = dbConnect();
        $this->stmt = $this->db->prepare($this->sql);

        foreach ($this->bindings as $bind) {
            $this->stmt->bindValue($bind["sqlVar"], $itemData['dataVar'], $bind['dataType']);
        }

        $this->stmt->execute();

        switch($this->data['returnValue']) {
            case 'rowCount':
                $dataResult = $this->stmt->rowCount();
            break;
            case 'data':
                $dataResult = $this->stmt->fetchAll(PDO::FETCH_NAMED);
            break;
            default:

            echo json_encode(response('failure', 'Undefined return value passed to model ' . $this->name));
            exit;
            break;
        }

        $this->stmt->closeCursor();
        return $dataResult;
    }
}

$create_new_article_data = [
    "sql" => 'INSERT INTO article (articleTitle, articleSummary, articleBody, articleStatus, articleLink, userId) VALUES (:articleTitle, :articleSummary, :articleBody, :articleStatus, :articleLink, :userId)',
    "bindings" => [
      ['sqlVar'=> , 'dataVar'=> , 'dataType' => PDO::PARAM_STR],
      ['sqlVar'=> , 'dataVar'=> , 'dataType' => PDO::PARAM_STR],
      ['sqlVar'=> , 'dataVar'=> , 'dataType' => PDO::PARAM_STR],
      ['sqlVar'=> , 'dataVar'=> , 'dataType' => PDO::PARAM_STR],
      ['sqlVar'=> , 'dataVar'=> , 'dataType' => PDO::PARAM_STR],
      ['sqlVar'=> , 'dataVar'=> , 'dataType' => PDO::PARAM_STR]
    ]
  ]
  
  $create_new_article = new Model ('create_new_article');


//   class Model {
//     private $data;
//     private $table;
//     private $binds = [];
//     private $bindNames;
//     public function __construct($data, $table, $method) {
//       $this->data = $data;
//       $this->table = $table;
//       $this->method = $method;
//       $this->bindNames = array_keys($data);
//       $this->bind($data);
//     }
//     protected function bind($data) {
//       foreach($data as $key=>$item) {
//         array_push($this->binds, [":$key", $item, $this->getConstant($item)]);
//       }
//     }
//     public function run(){
//       switch($method) {
//         case "insert":
//           $this->runInsert();
//           break;
//         case "update":
//           $this->runUpdate();
//           break;
//         case "delete":
//           $this->runDelete();
//           break;
//           //throw an error
//         default:
//           exit;
//           break;
//       }
//     }

//     protected function getConstant($item) {
//       $type = gettype($item);
//       switch ($type) {
//         case "string":
//           return PDO::PARAM_STR;
//           break;
//         case "integer": 
//           return PDO::PARAM_INT;
//           break;
//         default:
//           exit;
//           break;
//       }
//     }
//   }