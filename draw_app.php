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
  debug_to_console($_POST);
  echo '<script>alert("BASE64")</script>';

  $image = 'data:image/'.'png'.';base64,'.$image_base64;
  debug_to_console($image);
  $clickX = $_POST['clickX'];
  $clickY = $_POST['clickY'];
  $clickDrag = $_POST['clickDrag'];
  $clickTimeStamp = $_POST['clickTimeStamp'];

  // Insert record
 // $query = "INSERT INTO images(image) VALUES('".$image."')";
  $query = "INSERT INTO templates(clickX, clickY, clickDrag, clickTimeStamp,thumbnail) VALUES(' ".$clickX.",".$clickY.",".$clickDrag.",".$clickTimeStamp.", ".$image."')";
  mysqli_query($con,$query);

  // Upload file
  //move_uploaded_file($_FILES['file']['templatePic'],$target_dir.$name); //Upload file if you have a file locally
  function debug_to_console( $data ) {
    $output = $data;
    if ( is_array( $output ) )
        $output = implode( ‘,’, $output);

    echo "<script>console.log( 'Debug Objects: " . $output . "' );</script>";
 }

?>
<script type="text/javascript">alert('Img upload successfully!');</script>

