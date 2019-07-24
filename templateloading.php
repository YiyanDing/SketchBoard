<?php
//RETRIEVAL (Use a seperate file)
//REF https://makitweb.com/upload-and-store-an-image-in-the-database-with-php/

//$sql = "SELECT thumbnail from templates where id='template_id'"; //<=Modify this to conform with your requirement


$host = "sketchppt.mysql.database.azure.com"; /* Host name */
$user = "YiyanDing@sketchppt"; /* User */
$password = "Dyywin678"; /* Password */
$dbname = "mysketch"; /* Database name */

$id = $_POST['alltemplateid'];
/*$con=mysqli_init(); 
mysqli_ssl_set($con, NULL, NULL, $dbname, NULL, NULL); 
mysqli_real_connect($con, "sketchppt.mysql.database.azure.com", "YiyanDing@sketchppt",$password, $dbname, 3306);*/

$con = mysqli_connect($host, $user, $password,$dbname);
$sql = "SELECT * from templates "; 
$sql2 = "SELECT * from templates order by template_id desc LIMIT 1";

//$sql = "SELECT * from templates "; 
$result = mysqli_query($con,$sql);
$datarow = mysqli_num_rows($result);

for($i=0;$i<$datarow;$i++){
    $sql_arr = mysqli_fetch_assoc($result);
    echo $sql_arr["template_id"]." ".$sql_arr["clickX"]." ". $sql_arr["clickY"]." ". $sql_arr["clickDrag"]." ". $sql_arr["clickTimeStamp"]." ".$sql_arr["thumbnail"]." " ;
   
   
 }

 $result2 = mysqli_query($con,$sql2);
$row = mysqli_fetch_array($result2);
echo $row["template_id"];
//echo $row["clickX"]." " . $row["clickY"]." " . $row["clickDrag"]." " . $row["clickTimeStamp"]." " . $row["thumbnail"];




?>