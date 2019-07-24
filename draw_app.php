<?php

//header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
//Upload an image (Use a seperate file)
//REF https://makitweb.com/upload-and-store-an-image-in-the-database-with-php/
$host = "sketchppt.mysql.database.azure.com"; /* Host name */
$user = "YiyanDing@sketchppt"; /* User */
$password = "Dyywin678"; /* Password */
$dbname = "mysketch"; /* Database name */

/*$con=mysqli_init(); 
mysqli_ssl_set($con, NULL, NULL, $dbname, NULL, NULL); 
mysqli_real_connect($con, "sketchppt.mysql.database.azure.com", "YiyanDing@sketchppt",$password, $dbname, 3306);*/

$con = mysqli_connect($host, $user, $password,$dbname);

// Check connection
if (!$con) {
  die("Connection failed: " . mysqli_connect_error());
}

  // Convert to base64
  $image_base64 = $_POST['picture'];
  //debug_to_console($_POST);
  //echo '<script>alert("BASE64")</script>';

  $image = 'data:image/'.'png'.';base64,'.$image_base64;

  $clickX = $_POST['clickX'];
  $clickY = $_POST['clickY'];
  $clickDrag = $_POST['clickDrag'];
  $clickTimeStamp = $_POST['clickTimeStamp'];
  
  //debug_to_console($clickTimeStamp_str);
  $clickX_str = implode(",",$clickX);
  $clickY_str = implode(",",$clickY);
  $clickDrag_str = implode(",",$clickDrag);
  $clickTime_str = implode(",",$clickTimeStamp);
    
  //debug_to_console($image);
  // Insert record
 //$query = "INSERT INTO templates(thumbnail) VALUES('".$image."')";
  
 
$query = "INSERT INTO templates(clickX, clickY, clickDrag, clickTimeStamp,thumbnail) VALUES('".$clickX_str."','".$clickY_str."','".$clickDrag_str."','".$clickTime_str."', '".$image."')";
//$sql = "SELECT * from templates where id='template_id'";   
$sql = "SELECT * from templates order by template_id desc LIMIT 1";
mysqli_query($con,$query);
$result = mysqli_query($con,$sql);
  $row = mysqli_fetch_array($result);
  //debug_to_console($row);
  //echo $result;
  echo $row["template_id"];
    //echo $row["template_id"];
    //echo "<script>console.log( 'ID Objects: " . $row["template_id"] . "' );</script>";

    //echo $clickX;
   
    

  // Upload file
  //move_uploaded_file($_FILES['file']['templatePic'],$target_dir.$name); //Upload file if you have a file locally
  function debug_to_console( $data ) {
    echo "<script>console.log( '??????' );</script>";
    $output = $data;
    if ( is_array( $output ) )
        $output = implode( ‘,’, $output);

    echo "<script>console.log( 'Debug Objects: " . $data . "' );</script>";
   // echo "<script>console.log( 'ID Objects: " . $row["template_id"] . "' );</script>";

 }

?>

