<?php
//RETRIEVAL (Use a seperate file)
//REF https://makitweb.com/upload-and-store-an-image-in-the-database-with-php/
$id = 0;
//$sql = "SELECT thumbnail from templates where id='template_id'"; //<=Modify this to conform with your requirement
$sql = "SELECT thumbnail from templates where id='template_id'"; 
$result = mysqli_query($con,$sql);
$row = mysqli_fetch_array($result);

$image = $row['name'];
$image_src = "upload/".$image;
$real_image = $row['image'];

?>