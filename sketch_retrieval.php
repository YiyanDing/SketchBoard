<?php
//RETRIEVAL (Use a seperate file)
//REF https://makitweb.com/upload-and-store-an-image-in-the-database-with-php/
$id = $_POST['templateid'];

//$sql = "SELECT thumbnail from templates where id='template_id'"; //<=Modify this to conform with your requirement
$sql = "SELECT * from templates where template_id = '$id'"; 


$host = "sketchppt.mysql.database.azure.com"; /* Host name */
$user = "YiyanDing@sketchppt"; /* User */
$password = "Dyywin678"; /* Password */
$dbname = "mysketch"; /* Database name */

/*$con=mysqli_init(); 
mysqli_ssl_set($con, NULL, NULL, $dbname, NULL, NULL); 
mysqli_real_connect($con, "sketchppt.mysql.database.azure.com", "YiyanDing@sketchppt",$password, $dbname, 3306);*/

$con = mysqli_connect($host, $user, $password,$dbname);

$result = mysqli_query($con,$sql);

$row = mysqli_fetch_array($result);

echo $row["clickX"]." " . $row["clickY"]." " . $row["clickDrag"]." " . $row["clickTimeStamp"];



?>